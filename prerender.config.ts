import { PrerenderConfig } from '@stencil/core';
export const config: PrerenderConfig = {
  crawlUrls: true,
  entryUrls: ['/'],
  hydrateOptions: _url => {
    return { runtimeLogging: false };
  },
};
