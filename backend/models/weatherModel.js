/**
 * Represents weather data.
 * Used to create a weather object for the InfluxDB database.
 */
class Weather {
  /**
   * @param {number} temperature - The current temperature.
   * @param {number} humidity - The current humidity.
   * @param {number} pressure - The current pressure.
   * @param {string} weatherDesc - The current weather description.
   * @param {string} sensorId - The sensor's ID.
   * @param {[number]} location - The an array with the decimal coordinates
   * @param {number} battery - The current battery level.
   * @param {Date} timestamp - The timestamp of the weather data.
   */
  constructor(temperature, humidity, pressure, weatherDesc, sensorId, location, battery, timestamp) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.weatherDesc = weatherDesc;
    this.sensorId = sensorId;
    this.location = location;
    this.battery = battery;
    this.timestamp = timestamp;
  }
}

export { Weather }
