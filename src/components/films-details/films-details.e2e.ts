import { newE2EPage } from '@stencil/core/testing';

import { resetStore } from '@store/store.testwrapper';

beforeEach(() => {
  resetStore();
});

describe('films-details', () => {
  it('renders', async () => {
    const page = await newE2EPage({ url: '/films/4' });
    await page.setContent('<films-details></films-details>');
    await page.waitForChanges();
    const element = await page.find('films-details');
    expect(element).toHaveClass('hydrated');
  });

  it('displays the specified name', async () => {
    const page = await newE2EPage({ url: '/films/4' });

    const filmTitle = await page.find('films-details >>> div');
    // console.log(filmTitle);
    const element = filmTitle.shadowRoot.querySelector('div');
    expect(element.textContent).toContain('A New Hope (Episode 4)');
  });

  // it('includes a div with the class "films-details"', async () => {
  //   const page = await newE2EPage({ url: '/profile/joseph' });

  // I would like to use a selector like this above, but it does not seem to work
  //   const element = await page.find('app-root >>> films-details >>> div');
  //   expect(element).toHaveClass('films-details');
  // });
});
