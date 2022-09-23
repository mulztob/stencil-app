import { newE2EPage } from '@stencil/core/testing';

describe('app-root', () => {
  it('renders', async () => {
    const page = await newE2EPage({ url: '/' });
    // await page.setContent('<app-root></app-root>');
    // await page.waitForChanges();
    const element = await page.find('app-root');
    expect(element).toHaveClass('hydrated');
  });

  it('renders the title', async () => {
    const page = await newE2EPage({ url: '/' });

    const element = await page.find('app-root >>> h1');
    expect(element.textContent).toEqual('Star Wars API Test App using Stencil.JS');
  });
});
