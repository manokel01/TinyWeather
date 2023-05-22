class WeatherData {
    constructor(temperature,
                humidity,
                pressure,
                weatherDesc,
                locationID,
                vendorID,
                productID) {

        this.temperature = temperature;
        this.humididty = humidity;
        this.pressure = pressure;
        this.weatherDesc = weatherDesc;
        this.locationID = locationID;
        this.vendorID = vendorID;
        this.productID = productID
    }
}

export { WeatherData }