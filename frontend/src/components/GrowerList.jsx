import React, { useState, useEffect } from 'react';
import { getGrowers } from '../services/api';
import Grower from './Grower';

/**
 * A component that displays a list of growers and their information
 * @param {function} displayWeatherData - A function to display the weather data for a grower
 */
export default function GrowerList({ displayWeatherData }) {
  // Declare a state variable called 'growers' and initialize it to an empty array
  const [growers, setGrowers] = useState([]);

  // Declare a side effect that fetches the growers data and updates the 'growers' state variable
  useEffect(() => {
    // Declare an asynchronous function called 'fetchGrowers' that fetches the growers data using the 'getGrowers' function from '../services/api'
    const fetchGrowers = async () => {
      const response = await getGrowers();
      const growersData = response.data;
      setGrowers(growersData);
    };

    // Call the 'fetchGrowers' function
    fetchGrowers();
  }, []);

  // Render the list of growers
  return (
    <div className="sidebar">
      <div className="grower-list-title">
        <p>Grower's list</p>
      </div> 
      <div className="grower-list">
        <div className="accordion" id="grower-accordion">
          {/* Map over the 'growers' array and render a 'Grower' component for each grower */}
          {growers.map((grower) => (
            <Grower key={grower._id} grower={grower} displayWeatherData={displayWeatherData} />
          ))}
        </div>
      </div>
    </div>
  );
}
