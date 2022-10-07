import { createStore } from '@stencil/store';
import { IPeople, ISpecie } from '../../lib/swapi-ts';
import { State } from '../store';
import { film1FullDetails } from './films';
import { species as allSpecies } from './species';
import { people as allPeople } from './people';

export const species = createSpeciesMap();
function createSpeciesMap() {
  const speciesMap: Record<string, ISpecie> = {};
  allSpecies.forEach(sp => (speciesMap[sp.url] = sp));
  return speciesMap;
}

export const people = createPeopleMap();
function createPeopleMap() {
  const map: Record<string, IPeople> = {};
  allPeople.forEach(sp => (map[sp.url] = sp));
  return map;
}
const defaultStoreMock: State = { films: [film1FullDetails, film1FullDetails], species: species, people: people, initialLoad: true };

export const { dispose, reset, state, onChange } = createStore<State>(defaultStoreMock);
