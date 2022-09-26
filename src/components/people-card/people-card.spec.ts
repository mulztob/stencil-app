import { newSpecPage } from '@stencil/core/testing';
import { PeopleCard } from './people-card';
import { IPeople } from 'swapi-ts';

const dummyPerson: IPeople = {
  birth_year: '',
  eye_color: '',
  films: [],
  gender: '',
  hair_color: '',
  height: '',
  homeworld: '',
  mass: '',
  name: '',
  skin_color: '',
  created: undefined,
  edited: undefined,
  species: [],
  starships: [],
  url: '',
  vehicles: [],
};

describe('people-card functionality', () => {
  it('needsSwapiResolve returns true for string', async () => {
    const { rootInstance } = await newSpecPage({ components: [PeopleCard], html: '<people-card></people-card>' });
    expect(rootInstance.needsSwapiResolve('aaa')).toBeTruthy();
  });

  it('needsSwapiResolve returns true for string', async () => {
    const { rootInstance } = await newSpecPage({ components: [PeopleCard], html: '<people-card></people-card>' });

    expect(rootInstance.needsSwapiResolve(dummyPerson)).toBeFalsy();
  });
});
