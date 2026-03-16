
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',        
      '**/*.js'           
    ],
    coverage: {
      provider: 'v8',
      include: ['**/*.ts'], 
      exclude: ['**/*.test.ts', '**/*.spec.ts', '**/dist/**']
    }
  }
});