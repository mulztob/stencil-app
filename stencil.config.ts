import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  sourceMap: true,
  tsconfig: './tsconfig.json',

  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://myapp.local/',
    },
  ],
  testing: {
    browserHeadless: false,
    // browserSlowMo: 2000,
    // browserDevtools: true,
    // those two options are part of the Stencil Pull Request "feat: Jest ESM support #3256"
    // useESModules: true,
    // extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],

    // transform: {
    //   '^.+\\.jsx$': 'ts-jest',
    //   '^.+\\.tsx$': 'ts-jest',
    // '^.+\\.ts$': 'ts-jest',
    //   '^.+\\.js$': 'ts-jest',
    // },
    // transformIgnorePatterns: ['node_modules/(?!(swapi-ts|lodash|@stencil/core/testing))', '(?!lodash)', '(?!@stencil/core/testing)'],

    // moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'mjs', 'd.ts', 'json'],
  },
};
