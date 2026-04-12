
import { readFile, writeFile } from 'node:fs/promises';

export function csvToJSON(input: string[], delimiter: string): object[] {
  if (!input || input.length === 0) {
    throw new Error('Empty input array');
  }

  if (!delimiter || delimiter === '') {
    throw new Error('Delimiter cannot be empty');
  }

  const headers = input[0].split(delimiter);
  
  if (headers.length === 0) {
    throw new Error('No headers found');
  }

  const result: object[] = [];

  for (let i = 1; i < input.length; i++) {
    const values = input[i].split(delimiter);
    
    if (values.length !== headers.length) {
      throw new Error(`Line ${i + 1}: Expected ${headers.length} fields, got ${values.length}`);
    }

    const obj: Record<string, string | number> = {};
    for (let j = 0; j < headers.length; j++) {
      let value: string | number = values[j];
      
      if (!isNaN(Number(value)) && value !== '') {
        value = Number(value);
      }
      obj[headers[j]] = value;
    }
    
    result.push(obj);
  }

  return result;
}

export async function formatCSVFileToJSONFile(
  input: string, 
  output: string, 
  delimiter: string
): Promise<void> {
  const fileContent = await readFile(input, 'utf-8');
  const lines = fileContent.split('\n').filter(line => line.trim() !== '');
  const jsonData = csvToJSON(lines, delimiter);
  await writeFile(output, JSON.stringify(jsonData, null, 2), 'utf-8');
}