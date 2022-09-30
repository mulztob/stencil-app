import { createStore } from '@stencil/store';
import { IFilm, ISpecie } from '@app/lib/swapi-ts';

interface State {
  films: IFilm[];
  species: Record<string, ISpecie>;
}

export const { dispose, reset, state, onChange, use, forceUpdate } = createStore<State>({
  films: [],
  species: {},
});

onChange('films', value => {
  console.log('onchange', value);
  state.films = value;
});

onChange('species', value => {
  state.species = value;
});
