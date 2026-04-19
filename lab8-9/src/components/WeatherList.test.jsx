import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WeatherList from './WeatherList';

describe('WeatherList', () => {
  const now = Math.floor(Date.now() / 1000);
  

  const createMockList = () => {
    const list = [];
    for (let i = 0; i < 40; i++) {
      const dayIndex = Math.floor(i / 8);
      list.push({
        dt: now + (i * 3 * 3600), 
        main: { temp: 20 + dayIndex, humidity: 65 + dayIndex },
        weather: [{ description: 'ясно', icon: '01d' }],
        wind: { speed: 3 }
      });
    }
    return list;
  };

  const mockForecast = {
    list: createMockList()
  };

  it('отображает 5 дней', () => {
    render(<WeatherList forecast={mockForecast} />);
    const cards = document.querySelectorAll('.weather-card');
    expect(cards.length).toBe(5);
  });

  it('отображает "Сегодня" для первого дня', () => {
    render(<WeatherList forecast={mockForecast} />);
    expect(screen.getByText('Сегодня')).toBeDefined();
  });
});