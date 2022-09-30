import { createStore } from '@stencil/store';
import { IFilm, IPeople, ISpecie } from '@app/lib/swapi-ts';

interface State {
  films: IFilm[];
  species: Record<string, ISpecie>;
  people: Record<string, IPeople>;
}

export const { dispose, reset, state, onChange, use, forceUpdate } = createStore<State>({
  films: [],
  species: {},
  people: {},
});

onChange('films', value => {
  state.films = value;
});

onChange('species', value => {
  state.species = value;
});
