export const mockForecastData = {
  city: { name: 'Moscow' },
  list: [
    {
      dt: Math.floor(Date.now() / 1000),
      main: { temp: 22, humidity: 65 },
      weather: [{ main: 'Clear', description: 'ясно', icon: '01d' }],
      wind: { speed: 3 }
    },
    {
      dt: Math.floor(Date.now() / 1000) + 86400,
      main: { temp: 20, humidity: 70 },
      weather: [{ main: 'Clouds', description: 'облачно', icon: '03d' }],
      wind: { speed: 4 }
    },
    {
      dt: Math.floor(Date.now() / 1000) + 172800,
      main: { temp: 18, humidity: 85 },
      weather: [{ main: 'Rain', description: 'дождь', icon: '10d' }],
      wind: { speed: 5 }
    },
    {
      dt: Math.floor(Date.now() / 1000) + 259200,
      main: { temp: 16, humidity: 80 },
      weather: [{ main: 'Rain', description: 'небольшой дождь', icon: '09d' }],
      wind: { speed: 6 }
    },
    {
      dt: Math.floor(Date.now() / 1000) + 345600,
      main: { temp: 19, humidity: 72 },
      weather: [{ main: 'Clouds', description: 'пасмурно', icon: '04d' }],
      wind: { speed: 4 }
    }
  ]
};