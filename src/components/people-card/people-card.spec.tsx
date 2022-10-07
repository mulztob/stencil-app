import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { PeopleCard } from './people-card';
import { IPeople, ISpecie, Species } from '../../lib/swapi-ts';
import { species } from '../../store/__mocks__/species';

jest.mock('../../store/store');
import { dispose } from '../../store/store';

const dummyPerson: IPeople = {
  birth_year: '',
  eye_color: '',
  films: [],
  gender: '',
  hair_color: '',
  height: '',
  homeworld: '',
  mass: '',
  name: 'dummy',
  skin_color: '',
  created: undefined,
  edited: undefined,
  species: [],
  starships: [],
  url: '',
  vehicles: [],
};

const speciesSpy = jest.spyOn(Species, 'find');

const human = species.find(p => p.name == 'Human');

beforeEach(() => {
  speciesSpy.mockClear();
  dispose();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('people-card functionality', () => {
  it('needsSwapiResolve returns true for string', async () => {
    const rootInstance = await newPeopleCard();
    expect(rootInstance.needsSwapiResolve('aaa')).toBeTruthy();
  });

  it('needsSwapiResolve returns true for string', async () => {
    const rootInstance = await newPeopleCard();
    expect(rootInstance.needsSwapiResolve(dummyPerson)).toBeFalsy();
  });

  it('loadfromstate', async () => {
    const r = await newPeopleCard();
    expect(r.loadFromState('')).toBe(dummyPerson.url);
  });

  it('updateState should return Human', async () => {
    const r = await newPeopleCard();
    const resolved = (await r.updateState('https://swapi.dev/api/species/1/')) as ISpecie;
    expect(speciesSpy.mock.calls.length).toBe(1);
    expect(resolved).toMatchObject(human);
  }, 30000);

  it('updateState should not return Human', async () => {
    const r = await newPeopleCard();
    const resolved = (await r.updateState('https://swapi.dev/api/species/10/')) as ISpecie;
    expect(resolved).not.toMatchObject(human);
    expect(resolved).not.toBe(undefined);
    expect(speciesSpy.mock.calls.length).toBe(1);
  }, 30000);

  it('updateState should not fetch on object', async () => {
    const r = await newPeopleCard();
    const resolved = (await r.updateState(human)) as ISpecie;
    expect(speciesSpy.mock.calls.length).toBe(0);
    expect(resolved).toMatchObject(human);
  });
});
async function newPeopleCard(person: IPeople = dummyPerson) {
  const { rootInstance } = await newSpecPage({ components: [PeopleCard], template: () => <people-card person={person}></people-card> });
  return rootInstance;
}
