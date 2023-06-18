# TinyWeather : Backend

Welcome to the TinyWeather backend! This is the server-side component of the TinyWeather platform, which allows growers to monitor weather conditions on their farms.

## Overview

The TinyWeather backend is built using Python, InfluxDB, Grafana, and Swagger. It provides a RESTful API for collecting and analyzing weather data from a network of sensors located on farms and vineyards. The backend stores the weather data in a time-series database (InfluxDB) and provides a visualization of the data using Grafana.

## Technologies Used

TinyWeather is built using the following technologies:

- InfluxDB: a high-performance distributed time-series database
- Grafana: a popular open-source platform for analytics and visualization
- Swagger: a tool for designing, building, and documenting RESTful APIs
- Python: a popular programming language used for data analysis and web development

## Data Models

The TinyWeather backend uses the following data models:

- Grower: contains information about the grower, including name, contact details, and address.
- Farm: contains information about the farm, including location, crops grown, and a reference to the grower who owns the farm.
- Sensor: contains information about the sensor, including a unique identifier, type, and a reference to the farm where it's located.
- Weather: contains weather data collected by sensors, including temperature, humidity, pressure, weather description, location, battery level, and timestamp.

These data models are related to each other as follows:

- A grower can have multiple farms.
- A farm can have multiple sensors.
- A sensor can report weather data to multiple farms.

For more detailed information, refer to the data models in `database.md`.


## Dependencies

TinyWeather backend has the following dependencies:

## Dependencies

TinyWeather backend has the following dependencies:

- @influxdata/influxdb-client: ^1.33.2
- @influxdata/influxdb-client-apis: ^1.33.2
- bcryptjs: ^2.4.3
- body-parser: ^1.20.2
- cors: ^2.8.5
- dotenv: ^16.0.3
- ejs: ^3.1.9
- express: ^4.18.2
- influx: ^5.9.3
- influxdb-client: ^0.0.1
- jsonwebtoken: ^9.0.0
- lodash: ^4.17.21
- mongoose: ^7.2.1
- mongoose-unique-validator: ^4.0.0
- serialport: ^11.0.0
- swagger: ^0.0.1
- swagger-jsdoc: ^6.2.8
- swagger-ui-express: ^4.6.3
- uuid: ^9.0.0

## Documentation

TinyWeather's API is documented using Swagger. The documentation is available online at [https//localhost:3000/api-docs](https//localhost:3000/api-docs). The documentation provides detailed information about each API endpoint, including request and response formats, authentication requirements, and sample requests and responses.

## Getting Started

To get started with TinyWeather, you'll need to set up a few things:

### Software

TinyWeather uses InfluxDB and Grafana to collect, store, and analyze weather data. You'll need to set up a new InfluxDB instance and Grafana instance to use with TinyWeather.

You'll also need to install the TinyWeather client libraries on your sensor units. The client libraries are available for a variety of programming languages, including Python, JavaScript, and Go.

### Configuration

Once you have your hardware and software set up, you'll need to configure your sensors to connect to your InfluxDB instance. This can be done using the TinyWeather client libraries.

### Download

To download TinyWeather from GitHub, follow these steps:

1. Go to the TinyWeather repository on GitHub: [https://github.com/username/TinyWeather](https://github.com/username/TinyWeather)
2. Click on the "Code" button and select "Download ZIP"
3. Extract the ZIP file to a directory on your computer

### Install Dependencies

To install the dependencies required to run TinyWeather:

```
npm install
```

### Run

To run TinyWeather, follow these steps:

1. Open a terminal or command prompt and navigate to the directory where you extracted the TinyWeather ZIP file
2. Start the TinyWeather server: `python app.py`
3. Open a web browser and navigate to [http://localhost:5000](http://localhost:5000) to access the TinyWeather web interface

## Usage

With TinyWeather set up and configured, you can start collecting weather data and analyzing it using the Grafana dashboard. The dashboard provides a variety of widgets and tools for visualizing weather trends and patterns, including temperature, humidity, pressure, and more.


