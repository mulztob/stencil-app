import { newE2EPage } from '@stencil/core/testing';
import { film1FullDetails } from '../../store/store.testwrapper';

async function setupComponent() {
  const page = await newE2EPage();

  await page.setContent(`<films-details></films-details>`);

  await page.$eval(
    'films-details',
    (detailsNode, film) => {
      detailsNode.episodeId = '1';
      detailsNode.film = film;
    },
    film1FullDetails,
  );

  await page.waitForChanges();
  return page;
}

describe('films-details, component details', () => {
  it('renders', async () => {
    const page = await setupComponent();

    const element = await page.find('films-details');
    expect(element).toHaveClass('hydrated');
  });

  it('displays the specified name "The Phantom Menace" as H1', async () => {
    const page = await setupComponent();
    const filmTitle = await page.find('films-details >>> h1');
    // console.log('film#1', filmTitle.textContent);

    // const element = filmTitle.shadowRoot.querySelector('div');
    // const element = filmTitle.querySelector('div');
    expect(filmTitle.innerText).toContain('The Phantom Menace');
  });

  // it('includes a div with the class "films-details"', async () => {
  //   const page = await newE2EPage({ url: '/profile/joseph' });

  // I would like to use a selector like this above, but it does not seem to work
  //   const element = await page.find('app-root >>> films-details >>> div');
  //   expect(element).toHaveClass('films-details');
  // });
});

describe('films-details, navigation', () => {
  it('displays a back button', async () => {
    const page = await setupComponent();
    const back = await page.find('films-details >>> button');
    expect(back.innerText).toEqual('back');
  });

  it('back button should route', async () => {
    const page = await setupComponent();
    const back = await page.find('films-details >>> button');

    const oldUrl = page.url();
    await back.click();
    await page.waitForChanges();
    expect(page.url()).not.toEqual(oldUrl);
  });
});
