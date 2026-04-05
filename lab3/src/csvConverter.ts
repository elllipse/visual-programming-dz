import { readFile, writeFile } from 'node:fs/promises';


export function csvToJSON(input: string[], delimiter: string): object[] {
  if (!input || input.length === 0) {
    throw new Error('empty');
  }

  if (!delimiter) {
    throw new Error('Delimiter error');
  }

  const headers = input[0].split(delimiter);
  
  if (headers.length === 0) {
    throw new Error('error');
  }

  const result: object[] = [];

  for (let i = 1; i < input.length; i++) {
    const values = input[i].split(delimiter);
    
    if (values.length !== headers.length) {
      throw new Error(`Line ${i + 1}: Expected ${headers.length} fields, got ${values.length}`);
    }

    const obj: Record<string, any> = {};
    for (let j = 0; j < headers.length; j++) {
      let value = values[j];
    
      if (!isNaN(Number(value)) && value !== '') {
        value = Number(value);
      }
      obj[headers[j]] = value;
    }
    
    result.push(obj);
  }

  return result;
}

//continue