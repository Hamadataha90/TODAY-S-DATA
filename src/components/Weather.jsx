import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Card, Spinner, Alert, Table, Row, Col } from 'react-bootstrap';

const Weather = () => {
  const [city, setCity] = useState('Cairo'); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY_WEATHER;

  // List of cities for the dropdown
  const cities = [
    'Abu Dhabi', 'Accra', 'Algiers', 'Almaty', 'Amman', 'Amsterdam', 'Ankara', 'Ashgabat', 
    'Asunción', 'Athens', 'Auckland', 'Baghdad', 'Baku', 'Bangkok', 'Bangui', 'Beijing', 'Beirut', 
    'Belgrade', 'Berlin', 'Bishkek', 'Bogotá', 'Boston', 'Brasília', 'Bratislava', 'Brussels', 
    'Bucharest', 'Budapest', 'Buenos Aires', 'Cairo', 'Calgary', 'Canberra', 'Cape Town', 
    'Caracas', 'Casablanca', 'Chicago', 'Copenhagen', 'Damascus', 'Dallas', 'Dar es Salaam', 
    'Delhi', 'Denver', 'Detroit', 'Doha', 'Dubai', 'Dublin', 'Edinburgh', 'Ekaterinburg', 
    'Fortaleza', 'Glasgow', 'Guadalajara', 'Hanoi', 'Harare', 'Havana', 'Helsinki', 'Hong Kong', 
    'Honolulu', 'Houston', 'Istanbul', 'Jakarta', 'Jeddah', 'Jerusalem', 'Johannesburg', 
    'Kabul', 'Kampala', 'Kathmandu', 'Khartoum', 'Kigali', 'Kuala Lumpur', 'Kuwait City', 
    'La Paz', 'Lagos', 'Lima', 'Lisbon', 'London', 'Los Angeles', 'Madrid', 'Manama', 'Manila', 
    'Maputo', 'Mexico City', 'Miami', 'Minsk', 'Monrovia', 'Montevideo', 'Montreal', 'Moscow', 
    'Mumbai', 'Muscat', 'Nairobi', 'New York', 'Novosibirsk', 'Orlando', 'Oslo', 'Ottawa', 
    'Paris', 'Phnom Penh', 'Phoenix', 'Port Moresby', 'Porto Alegre', 'Prague', 'Quito', 
    'Riyadh', 'Rome', 'San Francisco', 'Santiago', 'São Paulo', 'Seattle', 'Seoul', 'Singapore', 
    'Stockholm', 'Suva', 'Sydney', 'Taipei', 'Tashkent', 'Tehran', 'Tokyo', 'Toronto', 'Tripoli', 
    'Tunis', 'Ulaanbaatar', 'Vienna', 'Vladivostok', 'Warsaw', 'Washington D.C.', 'Wellington', 
    'Windhoek', 'Yangon', 'Yekaterinburg', 'Zurich'
  ];

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
      setWeatherData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching weather data.');
      setLoading(false);
    }
  };

  // Fetch weather data on component mount and set up interval
  useEffect(() => {
    fetchWeatherData(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchWeatherData(); // Fetch data every minute
    }, 60000); // 60000 milliseconds = 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [city]); // Run effect when the city changes

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5 p-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 pt-5">
        <Alert variant="danger" style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-4" style={{ backgroundColor: '#f0f8ff' }}>
        <Card.Body>
          <h2 className="mb-4 text-center pt-5 mt-3" style={{ color: '#4CAF50' }}>Weather Forecast</h2>
          <Form>
            <Row className="justify-content-center mb-3">
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label>Select a City:</Form.Label>
                  <Form.Control
                    as="select"
                    value={city}
                    onChange={handleCityChange}
                    className="text-center"
                    style={{ backgroundColor: '#f0f8ff', cursor: 'pointer', color: '#007bff',  }}
                  >
                    {cities.map((cityOption, index) => (
                      <option key={index} value={cityOption} style={{ color: '#007bff' }}>
                        {cityOption}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>

          {weatherData && (
            <Table striped bordered hover className="mt-4 text-center" style={{ backgroundColor: '#e0f7fa' }}>
              <thead style={{ backgroundColor: '#3e8e41', color: '#fff' }}>
                <tr>
                  <th>City</th>
                  <th>Country</th>
                  <th>Temperature (°C)</th>
                  <th>Condition</th>
                  <th>Condition Icon</th>
                  <th>Humidity (%)</th>
                  <th>Wind Speed (km/h)</th>
                  <th>Feels Like (°C)</th>
                  <th>UV Index</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{weatherData.location.name}</td>
                  <td>{weatherData.location.country}</td>
                  <td>{weatherData.current.temp_c}</td>
                  <td>{weatherData.current.condition.text}</td>
                  <td>
                    <img 
                      src={`https:${weatherData.current.condition.icon}`} 
                      alt={weatherData.current.condition.text} 
                      style={{ width: '30px', height: '30px' }}
                    />
                  </td>
                  <td>{weatherData.current.humidity}</td>
                  <td>{weatherData.current.wind_kph}</td>
                  <td>{weatherData.current.feelslike_c}</td>
                  <td>{weatherData.current.uv}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Weather;
