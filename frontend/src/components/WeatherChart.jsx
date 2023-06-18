import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Register the required Chart.js plugins
ChartJS.register(
  LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip
);

/**
 * A chart component that displays weather data for a given sensor and data type.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.sensorId - The ID of the sensor to display data for.
 * @param {string} props.dataType - The type of data to display (temperature, humidity, or pressure).
 * @param {number} props.minValue - The minimum value to display on the y-axis.
 * @param {number} props.maxValue - The maximum value to display on the y-axis.
 * @returns {JSX.Element} - The component's rendered output.
 */
export default function WeatherChart({ sensorId, dataType, minValue, maxValue }) {
  const [data, setData] = useState(null);
  let color = '';

  // Determine the line color based on the data type
  if (dataType === 'temperature') {
    color = 'rgb(39, 188, 49)';
  } else if (dataType === 'humidity') {
    color = 'rgb(31, 179, 224)';
  } else if (dataType === 'pressure') {
    color = 'rgb(255, 0, 149)';
  }

  useEffect(() => {
    // Fetch data from the API
    axios.get(`http://localhost:3000/api/weather/${sensorId}/all`)
      .then(response => {
        // Extract data for the selected data type from the API response
        const dataTypeData = response.data.data[dataType].map((datum, index) => ({
          x: index,
          y: datum[dataType]
        }));

        // Set the component's data state with the extracted data
        setData({
          labels: dataTypeData.map(datum => datum.x),
          datasets: [
            {
              label: dataType,
              data: dataTypeData,
              fill: true,
              borderColor: color,
              backgroundColor: `rgba(${color}, 0.5)`,
              pointColor: color,
              tension: 0.2
            }
          ]
        });
      })
      .catch(error => {
        console.error(error);
      });
  }, [sensorId, dataType]);

  const options = {
    elements: {
      point: {
        radius: 0
      }
    },
    title: {
      display: false,
      text: 'Sensor Data',
      fontSize: 14,
      justifyContent: 'center'
    },
    scales: {
      x: {
        type: 'linear',
        min: 0,
        max: data ? data.labels.length - 1 : null,
        ticks: {
          stepSize: 1
        }
      },
      y: {
        min: minValue,
        max: maxValue
      }
    },
    legend: {
      display: true,
      position: 'top',
      labels: {
        fontColor: '#000'
      }
    },
    layout: {
      padding: {
        left: 20,
        right: 0,
        bottom: 0,
        top: 20
      }
    },
    toolips: {
      enabled: true
    },
    responsive: true,
  }

  return (
    <div className="line-chart">
      {/* <h5>{dataType}</h5> */}
      {data && <Line
        data={data}
        options={options}
      />}
    </div>
  );
}
