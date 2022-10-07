jest.mock('../store/store');
import { state, dispose } from '../store/store';

import { people } from '../store/__mocks__/people';
import { species } from '../store/__mocks__/species';
import { film1NoDetails } from '../store/__mocks__/films';
import { people as peopleRecord, species as speciesRecord } from '../store/__mocks__/store';

import { service } from './swapi.service';
import { IFilm, IPeople } from './swapi-ts';

beforeEach(() => dispose());

describe('', () => {
  //   it('state mutates', () => {
  //     const oldState = state;

  //     state.films = [];
  //     const newState = state;
  //     expect(newState.films).not.toMatchObject(oldState);
  //   });

  it('service and state should be initialized', async () => {
    expect(service).toBeDefined();
    expect(state.initialLoad).toBeTruthy();
  });
});

describe('transformArrayToRecord', () => {
  it('transformArrayToRecord w/ two elements', async () => {
    const s = service as any;
    const rec = s.transformArrayToRecord([
      { url: '1', value: 'one' },
      { url: '2', value: 'two' },
    ]) as Record<string, object>;

    expect(Object.keys(rec)).toHaveLength(2);
    expect(rec['1']).toMatchObject({ url: '1', value: 'one' });
    expect(rec['2']).toMatchObject({ url: '2', value: 'two' });
  });

  it('transformArrayToRecord empty array', async () => {
    const s = service as any;
    const rec = s.transformArrayToRecord([]) as Record<string, object>;

    expect(Object.keys(rec)).toHaveLength(0);
  });

  it('transformArrayToRecord empty array', async () => {
    const s = service as any;
    const items = [
      { url: 'duplicate', value: 'item1' },
      { url: 'duplicate', value: 'item2' },
    ];
    const rec = s.transformArrayToRecord(items) as Record<string, object>;

    expect(Object.keys(rec)).toHaveLength(1);
    expect(rec['duplicate']['value']).toBe('item2');
  });
});

describe('resolveByUrl w/ people', () => {
  it('resolveByUrl w/ dummy data', async () => {
    const s = service as any;
    expect(
      s.resolveByUrl(
        ['1'],
        [
          { url: '1', value: 'one' },
          { url: '2', value: 'two' },
        ],
      ),
    ).toMatchObject([{ url: '1', value: 'one' }]);
  });

  it('resolveByUrl nothing to nothing', async () => {
    const s = service as any;
    const result = s.resolveByUrl([], people);
    expect(result).toHaveLength(0);
  });

  it('resolveByUrl unknown to nothing', async () => {
    const s = service as any;
    const result = s.resolveByUrl(['https://swapi.dev/api/people/3573829479237/'], people);
    expect(result).toHaveLength(0);
  });

  it('resolveByUrl to padme', async () => {
    const s = service as any;
    const result = s.resolveByUrl(['https://swapi.dev/api/people/35/'], people) as IPeople[];
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Padmé Amidala');
    expect(result[0]).toMatchObject(people.find(p => p.name == 'Padmé Amidala'));
  });

  it('resolveByUrl to padme and obiwan', async () => {
    const s = service as any;
    const result = s.resolveByUrl(['https://swapi.dev/api/people/10/', 'https://swapi.dev/api/people/35/'], people) as IPeople[];
    expect(result).toHaveLength(2);

    expect(result[0].name).toBe('Obi-Wan Kenobi');
    expect(result[0]).toMatchObject(people.find(p => p.name == 'Obi-Wan Kenobi'));

    expect(result[1].name).toBe('Padmé Amidala');
    expect(result[1]).toMatchObject(people.find(p => p.name == 'Padmé Amidala'));
  });
});

describe.skip('skip populate* since they are simply using resolveByUrl', () => {});
