# tinyMeteo Tutorial

### Project Overview

TinyMeteo is a machine learning project that uses Tiny Machine Learning (TinyML) and Python to predict weather conditions based on temperature, humidity, and pressure data. The project utilizes an Arduino Nano 33 Sense board to collect environmental data, which is then processed and fed into a machine learning model to predict the weather conditions.

## A. Predicting weather on the microcontroller

### A.1 



## Data Details
The dataset for this project is obtained from [World Weather Online](https://www.worldweatheronline.com) in JSON-formt and contains environmental data such as temperature, humidity, pressure and weather description.
- API Endpoint: https://api.worldweatheronline.com/premium/v1/past-weather.ashx
- API Documentation: https://www.worldweatheronline.com/weather-api/api/docs/historical-weather-api.aspx#qparameter 

## Machine Learning Model
A Decision Tree Classifier as well as Dense Neural Netowrk (DNN) are evaluated as best suited for classification Machibne Learning. Although, on first impression, both produce similar results, the latter is selected, as the former is not supported for conversion by TFLite for the microcontroller.

## Deployment
The trained model is then deployed onto the Arduino Nano 33 Sense board using the TensorFlow Lite for Microcontrollers (TFLite Micro) library. This enables the board to make real-time weather predictions based on the current temperature, humidity, and pressure readings.

## Read Serial Port by Node.js
To create a Node.js server that receives weather JSON data from a serial port, stores it in an InfluxDB database, and displays it with Grafana, follow these steps:

1. Install required tools and libraries:

- Install Node.js: Download and install the latest version of Node.js from https://nodejs.org/.
- Install InfluxDB: Follow the installation instructions for your platform at https://docs.influxdata.com/influxdb/v2.0/install/.
- Install Grafana: Follow the installation instructions for your platform at https://grafana.com/docs/grafana/latest/installation/.

2. Set up the Node.js project:

- Create a new directory for your project and navigate to it in your terminal.
- Run `npm init` to create a package.json file and follow the prompts.
- Install the required libraries: `npm install express serialport influx`

3. Create a new file named `app.js` and add the following code:

```javascript
const express = require('express');
const SerialPort = require('serialport');
const Influx = require('influx');

const app = express();
const port = process.env.PORT || 3000;

// Configure InfluxDB
const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'weather_data',
  schema: [
    {
      measurement: 'weather',
      fields: {
        temperature: Influx.FieldType.FLOAT,
        humidity: Influx.FieldType.FLOAT,
      },
      tags: ['location'],
    },
  ],
});

// Connect to the serial port
const serialPort = new SerialPort('/dev/ttyUSB0', {
  baudRate: 9600,
});

// Read data from the serial port
serialPort.on('data', (data) => {
  try {
    const weatherData = JSON.parse(data.toString());
    console.log(weatherData);

    // Write data to InfluxDB
    influx.writePoints([
      {
        measurement: 'weather',
        tags: { location: 'your_location' },
        fields: {
          temperature: weatherData.temperature,
          humidity: weatherData.humidity,
        },
      },
    ]);
  } catch (error) {
    console.error('Error parsing JSON data:', error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

Replace `/dev/ttyUSB0` with the correct serial port for your device and update the `location` tag as needed.

4. Create and configure the InfluxDB database:

  Install the InfluxDB client library: Depending on the programming language you're using, you'll need to install the appropriate InfluxDB client library. InfluxDB provides client libraries for various languages such as Node.js, Python, Java, Go, etc. Choose the library that matches your programming language and follow the installation instructions.
  Import the client library: In your code, import or require the necessary modules or packages to use the InfluxDB client library.
  Create a connection to the InfluxDB database: Establish a connection to your InfluxDB database by specifying the connection details such as host, port, username, password, and database name. This information may vary depending on the client library you're using.
  Define the data to be written: Prepare the data you want to write to the InfluxDB database. This typically involves creating measurement points with associated tags, fields, and timestamps. The structure and format of data vary depending on the specific requirements of your application and database schema.
  Write data to the database: Use the client library functions or methods to write the prepared data to the InfluxDB database. The client library usually provides methods to handle data insertion, batch writes, and other operations.


- Start the InfluxDB server if it's not already running.
- Run `influx` in your terminal to open the InfluxDB CLI.
- Create a new database: `CREATE DATABASE weather_data`
- Exit the InfluxDB CLI by typing `exit`.

1. Start the Node.js server:

- Run `node app.js` in your terminal.

6. Set up Grafana:

- Start the Grafana server if it's not already running.
- Open Grafana in your browser (usually at http://localhost:3000) and log in.
- Add a new InfluxDB data source with the following settings:
  - URL: http://localhost:8086
  - Database: weather_data
- Create a new dashboard and add panels to visualize the temperature and humidity data.

Now, your Node.js server should be receiving weather data from the serial port, storing it in InfluxDB, and displaying it in Grafana.

-------------------

1. Set Up Your Development Environment:

Install Node.js and NPM (Node Package Manager) if you haven't already.
Install Angular CLI (Command Line Interface) globally on your machine.
Set up a local development server for your Angular frontend using the Angular CLI.
2. Design Your Backend:

Define the API endpoints you'll need for your frontend to interact with the server.
Set up a Node.js server using Express.js to handle incoming requests and serve data from the InfluxDB.
Connect to the InfluxDB from your Node.js server using a suitable package (e.g., influxdb-nodejs).
3. Implement Data Retrieval:

Write the necessary logic in your Node.js server to fetch data from the InfluxDB.
Design a suitable data retrieval strategy (e.g., fetching the latest weather data or implementing pagination for historical data).
Create API endpoints on your Node.js server to serve the requested data to the frontend.
4. Create Angular Components:

Design and create Angular components to display the weather data on the frontend.
Use Angular's data binding to connect your components with the data received from the backend.
Implement any necessary filtering, sorting, or formatting of the weather data on the frontend.
5. Display Real-Time Data:

Set up a WebSocket connection between your Node.js server and the Angular frontend using a package like Socket.IO.
Emit weather data from the server to the frontend whenever new data is available.
Update the frontend in real-time whenever new data is received.
6. Enhance User Experience:

Implement additional features to improve the user experience, such as search functionality, data visualization (charts, graphs, etc.), or user preferences/settings.
Handle error scenarios gracefully by displaying meaningful error messages or implementing error handling mechanisms.
7. Test and Deploy:

Write unit tests for your backend and frontend components to ensure they function as expected.
Deploy your application to a suitable hosting platform, such as Heroku, AWS, or Azure.
Perform thorough testing on the deployed application to verify its functionality and stability.
8. Maintain and Update:

Regularly monitor and maintain your application, ensuring it stays up-to-date with the latest software versions and security patches.
Consider adding additional features or optimizing the performance based on user feedback and requirements.