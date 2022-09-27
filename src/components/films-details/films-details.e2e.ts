import { newE2EPage } from '@stencil/core/testing';
import { resetStore } from '../../store/store.testwrapper';
// import store from '../../store/store';
// import { jest } from '@jest/globals';

beforeEach(() => {
  // resetStore();
  // console.log('beforeEach, store.state.films: ', store.state.films);
});

async function setupComponent() {
  const page = await newE2EPage();

  // console.log('setupComponent, store.state.films: ', store.state.films);

  await page.setContent(`<films-details episodeId="'1'"></films-details>`);
  await page.$eval('films-details', elm => {
    // within the browser's context
    // let's set new property values on the component
    elm.episodeId = '1';
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
    const filmTitle = await page.find('films-details');
    console.log('film#1', filmTitle.textContent);

    // const element = filmTitle.shadowRoot.querySelector('div');
    // const element = filmTitle.querySelector('div');
    expect(filmTitle.innerHTML).toContain('The Phantom Menace');
  });

  // it('includes a div with the class "films-details"', async () => {
  //   const page = await newE2EPage({ url: '/profile/joseph' });

  // I would like to use a selector like this above, but it does not seem to work
  //   const element = await page.find('app-root >>> films-details >>> div');
  //   expect(element).toHaveClass('films-details');
  // });
});
