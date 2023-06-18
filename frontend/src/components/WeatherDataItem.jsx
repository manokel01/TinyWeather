import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * A component that displays a single piece of weather data (temperature, humidity, or pressure) for a given sensor
 *
 * @param {Object} props - The props object
 * @param {string} props.sensorId - The ID of the sensor to retrieve data for
 * @param {string} props.dataType - The type of data to retrieve (temperature, humidity, or pressure)
 * @returns {JSX.Element} - The weather data item component
 */
export default function WeatherDataItem(props) {
  const [data, setData] = useState(null);

  /**
   * A hook that fetches the latest weather data for a given sensor and data type
   */
  useEffect(() => {
    async function fetchData() {
      if (props.sensorId === null) {
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/weather/${props.sensorId}/latest`);
        setData(response.data.data[props.dataType]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [props.sensorId, props.dataType]);

  // If the sensor ID is null or data is not yet loaded, show a loading message
  if (props.sensorId === null || data === null) {
    return <div style={{ color: '#008CBA' }}>Loading data...</div>;
  }

  let unit;
  let colorClass;

  // Set unit and color class based on data type
  switch (props.dataType) {
    case 'temperature':
      unit = '°C';
      colorClass = 'temperature';
      break;
    case 'humidity':
      unit = '%';
      colorClass = 'humidity';
      break;
    case 'pressure':
      unit = 'kPa';
      colorClass = 'pressure';
      break;
    default:
      unit = '';
      colorClass = 'weatherDesc';
  }

  // Render the weather data item
  return (
    <div className={`data-item ${colorClass}`}>
      <h6>{typeof data === 'number' ? props.dataType : 'weather forecast'}</h6>
      <div className="data-value">{typeof data === 'number' ? `${data.toFixed(2)}` : data}</div>
      <p>{`${unit}`}</p>
    </div>
  );
}
