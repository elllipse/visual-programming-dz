
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { csvToJSON, formatCSVFileToJSONFile } from '../src/csvConverter';
import { readFile, writeFile } from 'node:fs/promises';

vi.mock('node:fs/promises', () => ({
  readFile: vi.fn(),
  writeFile: vi.fn(),
}));

describe('csvToJSON', () => {
  it('работает с правильными данными', () => {
    const input = ['p1;p2', '1;A', '2;B'];
    const result = csvToJSON(input, ';');
    
    expect(result).toEqual([
      { p1: 1, p2: 'A' },
      { p1: 2, p2: 'B' }
    ]);
  });

  it('выбрасывает ошибку при пустом массиве', () => {
    expect(() => csvToJSON([], ';')).toThrow();
  });
});

describe('formatCSVFileToJSONFile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('читает файл, преобразует и записывает результат', async () => {
    vi.mocked(readFile).mockResolvedValue('a;b\n1;2');
    
    await formatCSVFileToJSONFile('in.csv', 'out.json', ';');
    
    expect(readFile).toHaveBeenCalledWith('in.csv', 'utf-8');
    expect(writeFile).toHaveBeenCalled();
  });
});