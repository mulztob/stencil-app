import { createStore } from '@stencil/store';
import { IFilm, ISpecie } from 'swapi-ts';

interface State {
  films: IFilm[];
  species: Record<string, ISpecie>;
}

export const { dispose, reset, state, onChange } = createStore<State>({
  films: [],
  species: {},
});

onChange('films', value => {
  state.films = value;
});

onChange('species', value => {
  state.species = value;
});
