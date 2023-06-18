import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getGrowers } from './services/api';
import GrowerList from './components/GrowerList';
import Header from './components/Header.jsx';
import WeatherData from './components/WeatherData.jsx';
import WeatherChart from './components/WeatherChart.jsx';
import DataDetails from './components/DataDetails.jsx';
import './App.css';

/**
 * The main component that renders all other components and manages the state.
 */
function App() {
  // Manage application state using React hooks
  const [growers, setGrowers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSensorId, setSelectedSensorId] = useState(null);
  const [selectedGrowerId, setSelectedGrowerId] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState(null);

  /**
   * Fetches the list of growers from the API and sets the state.
   */
  useEffect(() => {
    const fetchGrowers = async () => {
      const growersData = await getGrowers();
      setGrowers(growersData.data);
    };
    fetchGrowers();
  }, []);

  /**
   * Filters the list of growers based on the search term entered by the user.
   * @returns {Array} The filtered list of growers.
   */
  const filteredGrowers = growers.filter((grower) => {
    const fullName = grower.firstname + ' ' + grower.lastname;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  /**
   * Displays weather data for a selected grower and sensor.
   * @param {number} growerId The ID of the selected grower.
   * @param {number} sensorId The ID of the selected sensor.
   */
  const displayWeatherData = (growerId, sensorId) => {
    const selectedGrower = growers.find((grower) => grower.id === growerId);
    setSelectedGrowerId(growerId);
    setSelectedSensorId(sensorId);
    setSelectedUsername(selectedGrower?.username);
  };

  // Render the app components
  return (
    <div className="App">
      <BrowserRouter>
        <div className="header-container">
          {/* Render the Header component */}
          <Header />
        </div>
        <div className="main">
          <Routes>
            {/* Render the GrowerList component with the filteredGrowers and displayWeatherData props */}
            <Route path="/" element={<GrowerList filteredGrowers={filteredGrowers} displayWeatherData={displayWeatherData} />} />
          </Routes>
          <div className="content">
            <div className="data">
              <h5 className="section-title">Dataset Details</h5>
              {/* Render the DataDetails component with the selectedSensorId and selectedGrowerId props */}
              <DataDetails sensorId={selectedSensorId} username={selectedGrowerId} />
              <hr className="line" ></hr>
              <h5 className="section-title">Latest Weather Data</h5>
              {/* Render the WeatherData component with the selectedSensorId prop */}
              <WeatherData sensorId={selectedSensorId} />
            </div>
            <hr className="line" ></hr>
            <div className="charts">
              <h5 className="section-title">Historical Data Charts</h5>
              {/* Render the WeatherChart components with the selectedSensorId and dataType props */}
              {selectedSensorId && <WeatherChart sensorId={selectedSensorId} dataType="temperature" />} 
              {selectedSensorId && <WeatherChart sensorId={selectedSensorId} dataType="humidity" />} 
              {selectedSensorId && <WeatherChart sensorId={selectedSensorId} dataType="pressure" />}

                </div>
              </div>
            </div>
          </BrowserRouter>
    </div>
    
  );
}

export default App;
