import WeatherCard from "./WeatherCard";

function WeatherList({ forecast}){
  const dailyForecast = forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5);

  return (
    <div className="weather-list">
      {dailyForecast.map((day, index) => (
        <WeatherCard key = {day.dt} data={day} isFirst={index === 0} />
      ))}
    </div>
  );
}

export default WeatherList;