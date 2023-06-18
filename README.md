# TinyWeather

![TinyWeather Banner](./static-files/banner.png)

TinyWeather is a simulation of a weather monitoring and prediction platform uitilizing Machine Learning on microcontrollers with very limited hardware resources (tinyML), as well as a database management platofrm designed to assist farmers and growers in optimizing their crop yields. The platform collects weather data from a network of sensors located on farms and vineyards, with the aim of providing accurate weather reporting and opredictions to help farmers make data-driven decisions regarding watering, fertilizing, and harvesting their crops.

## Key Features

- **Full-stack Application**: TinyWeather provides an end-to-end solution, seamlessly integrating sensor networks/microcontrollers, backend server, and frontend application for a holistic weather monitoring and analytics platform.
- **Machine Learning on Microcontrollers**: Training and optimizing Machibne Learning models, converting them with TensorFlow Lite for deploying on microcontrollers, TinyWeather accurately predicts weather conditions based on sensor data.
- **Serial Connection**: Real-time weather data in JSON format is parsed to read incoming data.
- **Time-series Database**: InfluxDB is used to store and access weather data, enabling real-time updates and timely monitoring and analysis.
- **NoSQL Database**: MongoDB to store entities and define relations between them.
- **A REST-API** on a Node.js/Express serverto manage growers, farms, sensors and weather datasets facilitating efficient CRUD operations
- **One-page React App**: TinyWeather offers a single-page React application for intuitive weather data visualization and predictions.

## Technologies
- Arduino hardware
- TensorFlow & TensorFlow Light
- Node.js / Express.js
- InbfluxDB time-series database
- MongoDB No-SQL database
- React client
  
## Programming Languages
- Javascript
- Python
- C++
- HTML/CSS
  
## Usage

To use the TinyWeather platform:

1. Navigate to '`machine-learning` and follow instruction to train and optimize weather prediction model for microcontroller inference.
2. Navigate to `microcontroller` to upload converted ML model on microcontroller.
3. Navigate to the `backend` and follow the instructions in the `README.md` file to open serial port to collect data and manage databases.
4. Navigate to the `frontend` directory and follow the instructions in the `README.md` file to start the React server for data visulazation and database interaction.

Please note that the backend and frontend servers of TinyWeather are separate and must be started independently in different terminal windows.

May TinyWeather proves valuable in optimizing your crop yields! For any issues or suggestions, please feel free to submit an issue or contribute to the project. Happy farming!

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


