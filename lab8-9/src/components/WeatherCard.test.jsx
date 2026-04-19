import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';

describe('WeatherCard', () => {
  const mockData = {
    dt: Date.now() / 1000,
    main: { temp: 22.5, humidity: 65 },
    weather: [{ description: 'ясно', icon: '01d' }],
    wind: { speed: 3.2 }
  };

it('отображает температуру округлённой', () => {
  render(<WeatherCard data={mockData} isFirst={true} />);
  expect(screen.getByText('23°C')).toBeDefined(); // 22.5 округляется до 23
});

  it('отображает "Сегодня" для первого дня', () => {
    render(<WeatherCard data={mockData} isFirst={true} />);
    expect(screen.getByText('Сегодня')).toBeDefined();
  });

  it('отображает день недели для не первого дня', () => {
    render(<WeatherCard data={mockData} isFirst={false} />);
    const date = new Date(mockData.dt * 1000);
    const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' });
    expect(screen.getByText(dayName)).toBeDefined();
  });

  it('отображает влажность и ветер', () => {
    render(<WeatherCard data={mockData} isFirst={true} />);
    expect(screen.getByText(/Влажность: 65%/)).toBeDefined();
    expect(screen.getByText(/Ветер: 3 м\/с/)).toBeDefined();
  });
});