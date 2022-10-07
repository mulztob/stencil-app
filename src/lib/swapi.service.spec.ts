jest.mock('../store/store');
import { state, dispose } from '../store/store';

import { people } from '../store/__mocks__/people';
import { species } from '../store/__mocks__/species';
import { film1FullDetails, film1NoDetails } from '../store/__mocks__/films';
import { people as peopleRecord, species as speciesRecord } from '../store/__mocks__/store';

import { service } from './swapi.service';
import { IFilm } from './swapi-ts';

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

    expect(rec['1']).toMatchObject({ url: '1', value: 'one' });
    expect(rec['2']).toMatchObject({ url: '2', value: 'two' });
  });

  it('transformArrayToRecord empty array', async () => {
    const s = service as any;
    const rec = s.transformArrayToRecord([]) as Record<string, object>;

    expect(Object.keys(rec).length).toBe(0);
  });
});

describe('populate', () => {
  it.only('populatePeople', () => {
    const s = service as any;
    expect(s.populatePeople(people, species)).toMatchObject(peopleRecord);
  });

  it('populateFilms', async () => {
    const s = service as any;
    const populatedFilm: IFilm = {
      ...film1NoDetails,
      characters: people,
      species: species,
    };
    expect(s.populateFilms([film1NoDetails], people, species)).toMatchObject([populatedFilm]);
  });
});
