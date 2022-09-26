import { newE2EPage } from '@stencil/core/testing';
import { MatchResults } from '@stencil-community/router';

import { resetStore } from '../../store/store.testwrapper';

beforeEach(() => {
  resetStore();
});

async function setupComponent() {
  const page = await newE2EPage();

  await page.setContent('<films-details></films-details>');

  await page.$eval('films-details', (elm: any) => {
    const dummyMatch: MatchResults = {
      path: '',
      url: '',
      isExact: false,
      params: {
        id: '1',
      },
    };

    // within the browser's context
    // let's set new property values on the component
    elm.match = dummyMatch;
  });

  await page.waitForChanges();
  // console.log('page#1', page);
  return page;
}

describe('films-details', () => {
  it('renders', async () => {
    const page = await setupComponent();

    const element = await page.find('films-details');
    expect(element).toHaveClass('hydrated');
  });

  it('displays the specified name "The Phantom Menace"', async () => {
    const page = await setupComponent();
    // console.log('page#2:', page);
    const filmTitle = await page.find('films-details >>> h1');
    console.log('film#1', filmTitle);

    // const element = filmTitle.shadowRoot.querySelector('div');
    // const element = filmTitle.querySelector('div');
    expect(filmTitle.textContent).toContain('The Phantom Menace');
  });

  // it('includes a div with the class "films-details"', async () => {
  //   const page = await newE2EPage({ url: '/profile/joseph' });

  // I would like to use a selector like this above, but it does not seem to work
  //   const element = await page.find('app-root >>> films-details >>> div');
  //   expect(element).toHaveClass('films-details');
  // });
});
