import { newE2EPage } from '@stencil/core/testing';
import store from '../../store';
import { film4 } from '../../store.test';

beforeEach(() => {
  store.dispose();
  store.state.films = [].concat(film4);
});

describe('films-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    // await page.setContent('<films-list></films-list>');

    const element = await page.find('films-list');
    expect(element).toHaveClass('hydrated');
  });

  it('contains a "Profile Page" button', async () => {
    const page = await newE2EPage();
    // await page.setContent('<films-list></films-list>');
    // console.log('page: ', page);
    const element = await page.find('films-list >>> div');
    console.log('element: ', element);
    expect(element.textContent).toEqual('Profile page');
  });
});
