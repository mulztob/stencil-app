import { createStore } from '@stencil/store';
import { IFilm, IPeople, ISpecie } from '../lib/swapi-ts';

export interface State {
  films: IFilm[];
  species: Record<string, ISpecie>;
  people: Record<string, IPeople>;
  initialLoad: boolean;
}

export const { dispose, reset, state, onChange, use, forceUpdate } = createStore<State>({
  films: [],
  species: {},
  people: {},
  initialLoad: false,
});

onChange('films', value => {
  state.films = value;
});

onChange('species', value => {
  state.species = value;
});
