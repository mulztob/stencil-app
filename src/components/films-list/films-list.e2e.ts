import { newE2EPage } from '@stencil/core/testing';
import { film1 } from '../../store/__mocks__/store';

jest.setTimeout(60000);

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

    await page.$eval(
      'films-list',
      (el, film) => {
        el['films'] = [film];
      },
      film1,
    );

    await page.waitForChanges();
    const element = await page.find('films-list >>> button');
    // console.log('element: ', element[0].innerText, element.length);
    expect(element.innerText).toEqual('The Phantom Menace (Episode 1)');
  });
});
