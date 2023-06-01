/* 
 * tinyML on an Arduino Nano 33 Sense measuring weather data 
 * with its sensors and making live weather predictions
 * using a Dense Neural Netowrk (DNN) model trained with
 * TensorFlow.
 * The data is send over serial port in JSON format.
 * Sensors:
 * - temperature (±0.1°C)/ HS3003 sensor
 * - humidity (%RH)/ HS3003 sensor
 * - barometric pressure (260-1260 kPa) / LPS22HB sensor
 * Dependencies:
 * - ELoquentTinyML.h and eloquent_tinyml/tensorflow.h
 * - Array.h (modified version included in this repo)
 * - ArduinoJson.h
 * Make sure to include your trained and converted with TFLite model file
 * in the same folder as your Arduino sketch.
 *
 * Version: 1.0
 * Author: Manolis Kelaidis
 * Date: May 2023
 */
 
#include <Arduino_LPS22HB.h>
#include <Arduino_HS300x.h>
#include <EloquentTinyML.h>
#include "eloquent_tinyml/tensorflow.h"
#include <Array.h>
#include "model.h"
#include <ArduinoJson.h>
#include <TimeLib.h>

#define NUMBER_OF_INPUTS 3
#define NUMBER_OF_OUTPUTS 5
#define TENSOR_ARENA_SIZE 4*1024
#define UUID "8c21f098-87a9-4dca-bf38-93a14d7fa5bf" // the generated UUID for this device
#define LOCATION_X 35.377192 // dummy decimal coordinate
#define LOCATION_Y 24.211324 // dummy decimal coordinate
#define BATTERY 72 // dummy battery indication
#define TIME_HEADER "T"     // Header tag for serial time sync message
#define TIME_REQUEST 7      // ASCII bell character requests a time sync message

char timestampString[25];   // timestamp - big enough for your longest string, including a null terminator

StaticJsonDocument<256> doc;

Eloquent::TinyML::TensorFlow::TensorFlow<NUMBER_OF_INPUTS, NUMBER_OF_OUTPUTS, TENSOR_ARENA_SIZE> ml;

void setup() {
  Serial.begin(115200);

  // Sync device manually with current ISO time - enter Current Epoch Unix Timestamp in terminal.
  setSyncProvider(requestSync);  //set function to call when sync required
  Serial.println("To sync device send 'T + Current Epoch Unix Timestamp'");

  Serial.println("Communication started");
  if (!HS300x.begin()) {
    Serial.println("Failed to initialize humidity temperature sensor!");
    while (1);
  }
  if (!BARO.begin()) {
    Serial.println("Failed to initialize pressure sensor!");
    while (1);
  }
  ml.begin(model);
}

void loop() {

  // ,easure sensor data
  float temperature = HS300x.readTemperature();
  float humidity = HS300x.readHumidity();
  float pressure = BARO.readPressure() * 10;

  float input[NUMBER_OF_INPUTS] = {temperature, humidity, pressure};
  float output[NUMBER_OF_OUTPUTS] = {0, 0, 0, 0, 0};
  ml.predict(input, output);

  if (Serial.available()) {
    processSyncMessage();
  }
  if (timeStatus() != timeNotSet) {
    // timestamp as ISO 8601 string date format
    snprintf(timestampString, sizeof(timestampString), "%4d-%02d-%02dT%02d:%02d:%02d+0200", year(), month(), day(), hour(), minute(), second());
  }

  // Serial.print("Temperature : ");
  // Serial.print(temperature);
  // Serial.print(" °C - Humidity : ");
  // Serial.print(humidity);
  // Serial.print(" % - Pressure : ");
  // Serial.println(pressure);
  // Serial.print("The weather is : ");
  // Serial.println(value(output));

  // serialize stream to JSON
  JsonObject root = doc.to<JsonObject>();
  root["temperature"] = temperature;
  root["humidity"] = humidity;
  root["pressure"] = pressure;
  root["weatherDesc"] = value(output);
  root["sensorId"] = UUID;
  JsonArray location = doc.createNestedArray("location");
  location.add(LOCATION_X);
  location.add(LOCATION_Y);
  root["battery"] = BATTERY;
  root["timestamp"] =timestampString;
  serializeJson(root, Serial);
  Serial.println();

  delay(1000);
}

String value(float out[5]) {
  Array<float> my_classes = Array<float>(out, NUMBER_OF_OUTPUTS);
  if (my_classes.getMax() == 0) {
    return "Clear";
  } else if (my_classes.getMax() == 1) {
    return "Cloudy";
  } else if (my_classes.getMax() == 2) {
    return "Moderate rain at times";
  } else if (my_classes.getMax() == 3) {
    return "Heavy rain at times";
  } else {
    return "Freezing rain / snow";
  }
}

// set the time utility function
void processSyncMessage() {
  unsigned long pctime;
  const unsigned long DEFAULT_TIME = 1357041600;  // Jan 1 2013
  if (Serial.find(TIME_HEADER)) {
    pctime = Serial.parseInt();
    if (pctime >= DEFAULT_TIME) {  // check the integer is a valid time (greater than Jan 1 2013)
      setTime(pctime);             // Sync Arduino clock to the time received on the serial port
    }
  }
}

time_t requestSync() {
  Serial.write(TIME_REQUEST);
  return 0;  // the time will be sent later in response to serial mesg
}