import { describe, it, expectTypeOf } from 'vitest';
import { DeepReadonly, PickedByType, EventHandler } from '../src/types.js';

describe('DeepReadonly<T>', () => {
  it('делает все свойства readonly', () => {
    type User = {
      id: number;
      name: string;
      address: { city: string };
    };
    
    type ReadonlyUser = DeepReadonly<User>;
    
    expectTypeOf<ReadonlyUser>().toMatchTypeOf<{
      readonly id: number;
      readonly name: string;
      readonly address: { readonly city: string };
    }>();
  });

  it('работает с вложенными объектами', () => {
    type Nested = {
      level1: {
        level2: {
          value: string;
        };
      };
    };
    
    type ReadonlyNested = DeepReadonly<Nested>;
    
    expectTypeOf<ReadonlyNested>().toMatchTypeOf<{
      readonly level1: {
        readonly level2: {
          readonly value: string;
        };
      };
    }>();
  });
});

describe('PickedByType<T, U>', () => {
  it('выбирает свойства строкового типа', () => {
    type Mixed = {
      id: number;
      name: string;
      email: string;
      age: number;
    };
    
    type StringProps = PickedByType<Mixed, string>;
    
    expectTypeOf<StringProps>().toMatchTypeOf<{
      name: string;
      email: string;
    }>();
  });

  it('выбирает свойства числового типа', () => {
    type Mixed = {
      id: number;
      name: string;
      age: number;
      score: number;
    };
    
    type NumberProps = PickedByType<Mixed, number>;
    
    expectTypeOf<NumberProps>().toMatchTypeOf<{
      id: number;
      age: number;
      score: number;
    }>();
  });
});

describe('EventHandler<T>', () => {
  it('генерирует обработчики с префиксом on', () => {
    type Events = {
      click: { x: number; y: number };
      submit: { data: string };
    };
    
    type Handlers = EventHandler<Events>;
    
    expectTypeOf<Handlers>().toMatchTypeOf<{
      onClick: (event: { x: number; y: number }) => void;
      onSubmit: (event: { data: string }) => void;
    }>();
  });

  it('работает с событиями содержащими дефисы', () => {
    type Events = {
      'drag-start': { x: number };
      'drop-end': { y: number };
    };
    
    type Handlers = EventHandler<Events>;
    
    expectTypeOf<Handlers>().toMatchTypeOf<{
      onDragStart: (event: { x: number }) => void;
      onDropEnd: (event: { y: number }) => void;
    }>();
  });
});