import axios from 'axios';

const API_KEY = 'd70410ce1b721a3188d527fccb33bc67';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherForecast = async (city) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang: 'ru'
    }
  });
  return response.data;
};