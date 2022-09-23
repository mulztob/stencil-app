import { newE2EPage } from '@stencil/core/testing';
import { resetStore } from '../../store/store.testwrapper';

beforeEach(() => {
  resetStore();
});

describe('films-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<films-list></films-list>');
    await page.waitForChanges();

    const element = await page.find('films-list');
    expect(element).toHaveClass('hydrated');
  });

  it('contains a "The Phantom Menace (Episode 1)" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<films-list></films-list>');
    await page.waitForChanges();

    // console.log('page: ', page);
    const element = await page.findAll('films-list >>> * >>> button');
    console.log('element: ', element[0].innerText, element.length);
    expect(element).toEqualText('The Phantom Menace (Episode 1)');
  });
});
