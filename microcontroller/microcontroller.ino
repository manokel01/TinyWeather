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

#define NUMBER_OF_INPUTS 3
#define NUMBER_OF_OUTPUTS 5
#define TENSOR_ARENA_SIZE 4*1024
#define LOCATION_ID 14320000
#define VENDOR_ID 2341
#define PRODUCT_ID "805a"

StaticJsonDocument<256> doc;

Eloquent::TinyML::TensorFlow::TensorFlow<NUMBER_OF_INPUTS, NUMBER_OF_OUTPUTS, TENSOR_ARENA_SIZE> ml;

void setup() {
  Serial.begin(115200);

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
  float temperature = HS300x.readTemperature();
  float humidity = HS300x.readHumidity();
  float pressure = BARO.readPressure() * 10;

  float input[NUMBER_OF_INPUTS] = {temperature, humidity, pressure};
  float output[NUMBER_OF_OUTPUTS] = {0, 0, 0, 0, 0};
  ml.predict(input, output);

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
  root["locationID"] = LOCATION_ID;
  root["vendorID"] = VENDOR_ID;
  root["productID"] = PRODUCT_ID;
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