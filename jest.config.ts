import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './tsconfig.json';

export default {
  bail: true,
  clearMocks: true,
  //coletando informações de cobertura de testes
  collectCoverage: true,
  //informando os diretorios para obter as informações de cobertura
  collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],
  coverageDirectory: 'coverage',
  // adicionanmdo opção para gerar summario
  coverageReporters: ['lcov', 'text-summary'],
  coverageProvider: 'v8',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
};
