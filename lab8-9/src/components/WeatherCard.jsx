function WeatherCard({ data, isFirst }) {
  const date = new Date(data.dt * 1000);
  const dayName = isFirst ? 'Сегодня' : date.toLocaleDateString('ru-RU', { weekday: 'short' });
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="weather-card">
      <div className="card-day">{dayName}</div>
      <div className="card-date">{date.toLocaleDateString('ru-RU')}</div>
      <img src={iconUrl} alt={description} className="weather-icon" />
      <div className="card-temp">{temp}°C</div>
      <div className="card-desc">{description}</div>
      <div className="card-details">
        <span>Влажность: {data.main.humidity}%</span>
        <span>Ветер: {Math.round(data.wind.speed)} м/с</span>
      </div>
    </div>
  );
}

export default WeatherCard;