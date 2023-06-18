import React, { useState, useEffect } from 'react';
import { getFarmsByGrower, getSensorsByFarm } from '../services/api';

/**
 * Component to display information about a Grower and their Farms
 * @param {Object} props - The props object
 * @param {Object} props.grower - The Grower object to display information for
 * @param {Function} props.displayWeatherData - Callback function to display weather data
 * @returns {JSX.Element} - The Grower component
 */
export default function Grower({ grower, displayWeatherData }) {
  // State to keep track of whether accordion is active
  const [isActive, setIsActive] = useState(false);
  // State to store farms data
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    /**
     * Function to fetch farms data for a Grower and map sensors data to each farm
     * @returns {Promise<void>}
     */
    const getFarms = async () => {
      // Fetch farms data for a Grower
      const farmsData = await getFarmsByGrower(grower.username);
      // Map sensors data to each farm
      const farmsWithSensors = await Promise.all(
        farmsData.data.map(async (farm) => {
          const sensorsData = await getSensorsByFarm(farm.farm_code);
          return { ...farm, sensors: sensorsData.data };
        })
      );
      // Update farms state
      setFarms(farmsWithSensors);
    };

    // Fetch farms data if accordion is active and grower or isActive state changes
    if (isActive) {
      getFarms();
    }
  }, [grower.username, isActive]);

  /**
   * Function to toggle accordion state
   */
  const handleAccordionClick = () => {
    setIsActive(!isActive);
  };

  /**
   * Function to display weather data for a Grower and a specific sensor
   * @param {string} sensorId - The ID of the sensor to display weather data for
   */
  const displayWeatherDataForGrower = (sensorId) => {
    displayWeatherData(grower._id, sensorId);
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className={`accordion-button${isActive ? ' active' : ''}`} type="button" onClick={handleAccordionClick}>
          {`${grower.firstname} ${grower.lastname}`}
        </button>
      </h2>
      <div className={`accordion-collapse collapse${isActive ? ' show' : ''}`}>
        <div className="accordion-body">
          <ul className="list-group text-start">
            <li className="list-group-item">
              <div>
                {/* Map farms to display */}
                {farms.map((farm) => (
                  <div key={farm._id} className="list-item-farm">
                    <p key={farm._id}>
                      <strong>Farm code:</strong><span style={{ color: '#008CBA' }}>{farm.farm_code}</span>
                    </p>
                    <p>
                      <strong>Crops:</strong> <span style={{ color: '#008CBA' }}>{farm.crops.join(', ')}</span>
                    </p>
                    <p>
                      <strong>Location:</strong> <span style={{ color: '#008CBA' }}>{'x:' + farm.location[0] + ', y:' + farm.location[1]}</span>
                    </p>
                    {/* Render sensors if they exist */}
                    {farm.sensors && farm.sensors.length > 0 && (
                      <>
                        <p>
                          <strong>Sensor:</strong>
                        </p >
                        {farm.sensors.map((sensor) => (
                          <button className="list-item-sensor" key={sensor._id} onClick={() => displayWeatherDataForGrower(sensor.uuid)}>
                            {sensor.uuid}
                          </button>
                        ))}
                      </>
                    )}
                    <hr color="##008CBA" size="5" width="100%" />
                  </div>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}  
