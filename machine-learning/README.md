# tinyMeteo: A Weather Prediction Project using TinyML and Python

## Project Overview

TinyMeteo is a machine learning project that uses Tiny Machine Learning (TinyML) and Python to predict weather conditions based on temperature, humidity, and pressure data. The project utilizes an Arduino Nano 33 Sense board to collect environmental data, which is then processed and fed into a machine learning model to predict the weather conditions.

## Data Details
The dataset for this project is obtained from [World Weather Online](https://www.worldweatheronline.com) in JSON-formt and contains environmental data such as temperature, humidity, pressure and weather description.
- API Endpoint: https://api.worldweatheronline.com/premium/v1/past-weather.ashx
- API Documentation: https://www.worldweatheronline.com/weather-api/api/docs/historical-weather-api.aspx#qparameter 

## Machine Learning Model
A Decision Tree Classifier as well as Dense Neural Netowrk (DNN) are evaluated as best suited for classification Machibne Learning. Although, on first impression, both produce similar results, the latter is selected, as the former is not supported for conversion by TFLite for the microcontroller.

## Deployment
The trained model is then deployed onto the Arduino Nano 33 Sense board using the TensorFlow Lite for Microcontrollers (TFLite Micro) library. This enables the board to make real-time weather predictions based on the current temperature, humidity, and pressure readings.
