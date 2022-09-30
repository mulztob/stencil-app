import { newE2EPage } from '@stencil/core/testing';
// jest.setTimeout(600000);
describe('app-root', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-root></app-root>');
    await page.waitForChanges();

    const element = await page.find('app-root');
    expect(element).toHaveClass('hydrated');
  });

  it('renders the title', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-root></app-root>');
    await page.waitForChanges();

    const element = await page.find('app-root >>> h1');

    expect(element.innerText).toEqual('Star Wars API Test App using Stencil.JS');
  });
});
