import { newE2EPage } from '@stencil/core/testing';

describe('films-details', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<films-details></films-details>');

    const element = await page.find('films-details');
    expect(element).toHaveClass('hydrated');
  });

  it('displays the specified name', async () => {
    const page = await newE2EPage({ url: '/profile/joseph' });

    const profileElement = await page.find('app-root >>> films-details');
    const element = profileElement.shadowRoot.querySelector('div');
    expect(element.textContent).toContain('Hello! My name is Joseph.');
  });

  // it('includes a div with the class "films-details"', async () => {
  //   const page = await newE2EPage({ url: '/profile/joseph' });

  // I would like to use a selector like this above, but it does not seem to work
  //   const element = await page.find('app-root >>> films-details >>> div');
  //   expect(element).toHaveClass('films-details');
  // });
});
