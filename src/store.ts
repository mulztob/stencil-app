import { createStore } from '@stencil/store';
import { IFilm, ISpecie } from 'swapi-ts';

interface State {
  films: IFilm[];
  species: Record<string, ISpecie>;
}

const store = createStore<State>({
  films: [],
  species: {},
});

store.onChange('films', value => {
  store.state.films = value;
});

store.onChange('species', value => {
  store.state.species = value;
});

export default store;
