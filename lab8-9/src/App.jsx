import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherList from './components/WeatherList';
import { fetchWeatherForecast } from './services/weatherApi';
import { mockForecastData } from './mocks/mockWeatherData';

function App() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useMock, setUseMock] = useState(true);

  const loadWeather = async (city) => {
    setLoading(true);
    setError('');
    
    try {
      let data;
if (!useMock) { 
  data = mockForecastData;
} else {
  data = await fetchWeatherForecast(city);
}
      setForecast(data);
    } catch (err) {
      setError('Loading error..:(');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather('Moscow');
  }, []);

  const getBackgroundColor = () => {
    if (!forecast || !forecast.list) return '#87CEEB';
    const weather = forecast.list[0]?.weather[0]?.main;
    
    if (weather === 'Clear') 
      return '#FFD700';
    if (weather === 'Clouds') 
      return '#A9A9A9';
    if (weather === 'Rain') 
      return '#4682B4';
    if (weather === 'Storm') 
      return '#0b1c2aff';

    return '#87CEEB';
  };

  return (
    <div className="app" style={{ backgroundColor: getBackgroundColor() }}>
      <div className="container">
        <h1>Прогноз погоды</h1>
        <SearchBar onSearch={loadWeather} />
        
        <div className="mock-control">
          <label>
            <input 
              type="checkbox" 
              checked={useMock} 
              onChange={(e) => setUseMock(e.target.checked)}
            />
            Использовать тестовые данные
          </label>
        </div>

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        
        {forecast && !loading && <WeatherList forecast={forecast} />}
      </div>
    </div>
  );
}

export default App;