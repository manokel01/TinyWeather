# TinyWeather backend: Farm Management and Monitoring System

The Farm Management and Monitoring System is a web-based application built with Node.js that allows users to manage growers, farms, sensors, and database users. It connects to MongoDB for managing growers, farms, sensors, and database users, and uses InfluxDB as a real-time database for storing weather data including temperature, humidity, and pressure.

## Features

- User Management: Create, update, and delete user accounts with different roles and permissions.
- Grower Management: Manage information about growers including their personal details and contact information.
- Farm Management: Add, update, and delete farms associated with growers, including their location and other relevant details.
- Sensor Integration: Connect sensors to farms and monitor real-time weather data such as temperature, humidity, and pressure.
- Data Storage: Utilize MongoDB for storing and managing growers, farms, sensors, and database users.
- Real-time Monitoring: Store weather data in InfluxDB for real-time monitoring and analysis.

## Prerequisites

Before running the Farm Management and Monitoring System, ensure you have the following prerequisites:

- Node.js: Install the latest version of Node.js from the official website.
- MongoDB: Set up and configure a MongoDB server on your machine or use a cloud-based MongoDB service.
- InfluxDB: Set up and configure an InfluxDB server on your machine or use a cloud-based InfluxDB service.

## Getting Started

To get started with the Farm Management and Monitoring System, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies by running the following command:
```
npm install
```
3. Set up the required environment variables. Make sure to provide the necessary credentials for MongoDB and InfluxDB.
4. Start the application by running the following command:
```
npm start
```
5. Once the application is running, you can access it in your web browser at `http://localhost:3000`.

## API Documentation

The REST API of the Farm Management and Monitoring System is documented using Swagger. To explore the API endpoints, request parameters, and response schemas, you can access the Swagger API documentation at:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

The Swagger documentation provides detailed information on how to interact with the API programmatically. It is a helpful resource for developers who want to integrate the Farm Management and Monitoring System with other applications or build custom client applications.

## Technologies Used

- Node.js: JavaScript runtime environment
- Express.js: Web application framework
- MongoDB: Document database for data storage
- InfluxDB: Time-series database for real-time weather data monitoring
- Swagger: API documentation framework

## License

This project is licensed under the [MIT License](LICENSE).

