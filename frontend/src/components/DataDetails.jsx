/**
 * Renders details about user data
 * 
 * @param {string} username - the username of the user whose data is being rendered
 * @param {string} sensorId - the sensor ID of the user's data
 * @returns {JSX.Element} - the rendered component
 */
export default function DataDetails({ username, sensorId }) {
  // Set the display username to "Loading.." if username is falsy
  const displayUsername = username || 'Loading..';
  return (
    <ul className="data-details">
      {/* Render the grower ID with the displayUsername */}
      <li><strong>Grower ID </strong><span className="data-detail-text">{displayUsername}</span> </li>
      {/* Render the sensor ID or a message if no sensor ID is provided */}
      <li><strong>Sensor ID: </strong><span className="data-detail-text">{sensorId ? sensorId : ' choose a sensor to display weather data'}</span></li>
    </ul>
  );
}
