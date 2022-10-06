import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { PeopleCard } from './people-card';
import { IPeople, ISpecie } from '../../lib/swapi-ts';

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

const obiWan: IPeople = {
  name: 'Obi-Wan Kenobi',
  height: '182',
  mass: '77',
  hair_color: 'auburn, white',
  skin_color: 'fair',
  eye_color: 'blue-gray',
  birth_year: '57BBY',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/20/',
  films: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/2/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/4/',
    'https://swapi.dev/api/films/5/',
    'https://swapi.dev/api/films/6/',
  ],
  species: [],
  vehicles: ['https://swapi.dev/api/vehicles/38/'],
  starships: [
    'https://swapi.dev/api/starships/48/',
    'https://swapi.dev/api/starships/59/',
    'https://swapi.dev/api/starships/64/',
    'https://swapi.dev/api/starships/65/',
    'https://swapi.dev/api/starships/74/',
  ],
  created: new Date(Date.parse('2014-12-10T16:16:29.192000Z')),
  edited: new Date(Date.parse('2014-12-20T21:17:50.325000Z')),
  url: 'https://swapi.dev/api/people/10/',
};

const human = {
  name: 'Human',
  classification: 'mammal',
  designation: 'sentient',
  average_height: '180',
  skin_colors: 'caucasian, black, asian, hispanic',
  hair_colors: 'blonde, brown, black, red',
  eye_colors: 'brown, blue, green, hazel, grey, amber',
  average_lifespan: '120',
  homeworld: 'https://swapi.dev/api/planets/9/',
  language: 'Galactic Basic',
  people: ['https://swapi.dev/api/people/66/', 'https://swapi.dev/api/people/67/', 'https://swapi.dev/api/people/68/', 'https://swapi.dev/api/people/74/'],
  films: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/2/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/4/',
    'https://swapi.dev/api/films/5/',
    'https://swapi.dev/api/films/6/',
  ],
  created: '2014-12-10T13:52:11.567000Z',
  edited: '2014-12-20T21:36:42.136000Z',
  url: 'https://swapi.dev/api/species/1/',
};

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

  it('updateState should return human', async () => {
    const r = await newPeopleCard();
    const resolved = (await r.updateState('https://swapi.dev/api/species/1/')) as ISpecie;
    expect(resolved).toMatchObject(human);
  }, 30000);

  it('updateState should not return human', async () => {
    const r = await newPeopleCard();
    const resolved = (await r.updateState('https://swapi.dev/api/species/10/')) as ISpecie;
    expect(resolved).not.toMatchObject(human);
    expect(resolved).not.toBe(undefined);
  }, 30000);
});
async function newPeopleCard(person: IPeople = dummyPerson) {
  const { rootInstance } = await newSpecPage({ components: [PeopleCard], template: () => <people-card person={person}></people-card> });
  return rootInstance;
}
