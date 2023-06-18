import React, { useState } from 'react';
import WeatherDataItem from './WeatherDataItem';

/**
 * A component that displays weather data for a given sensor ID.
 * @param {object} props - The component's props.
 * @param {string} props.sensorId - The ID of the sensor to display data for.
 * @returns {JSX.Element} - The rendered component.
 */
export default function WeatherData({ sensorId }) {
  return (
    <div className="data-container">
      {/* Display the temperature data */}
      <WeatherDataItem sensorId={sensorId} key="temperature" dataType="temperature" />

      {/* Display the humidity data */}
      <WeatherDataItem sensorId={sensorId} key="humidity" dataType="humidity" />

      {/* Display the pressure data */}
      <WeatherDataItem sensorId={sensorId} key="pressure" dataType="pressure" />

      {/* Display the weather description data */}
      <WeatherDataItem sensorId={sensorId} key="weatherDesc" dataType="weatherDesc" />
    </div>
  );
}
