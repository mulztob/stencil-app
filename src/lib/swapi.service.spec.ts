jest.mock('../store/store');
import { state } from '../store/store';
import { service } from './swapi.service';

describe('', () => {
  it('state', () => {
    console.log('state', state);
  });

  it('singletonService could be initialized', async () => {
    expect(service).toBeDefined();
    expect(state).toMatchObject({});
  });

  it('load', async () => {
    const state = await service.Load();
    expect(state).toMatchObject({});
  }, 30000);
});
