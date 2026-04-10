import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '/test/.*\\.test\\.ts',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          rootDir: '.',
          types: ['jest'],
        },
      },
    ],
  },
};

export default config;
