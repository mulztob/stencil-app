import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  // tsconfig: './tsconfig.json',
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
    browserSlowMo: 20000,
    browserDevtools: true,
    // transform: {
    // '\\.[jt]sx?$': 'babel-jest',
    // '\\.ts$': 'babel-jest',
    // },
  },
  // maxConcurrentWorkers: 1,
};
