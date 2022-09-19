import { newE2EPage } from '@stencil/core/testing';

describe('films-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<films-list></films-list>');

    const element = await page.find('films-list');
    expect(element).toHaveClass('hydrated');
  });

  it('contains a "Profile Page" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<films-list></films-list>');

    const element = await page.find('films-list >>> button');
    expect(element.textContent).toEqual('Profile page');
  });
});
