import { createStore } from '@stencil/store';
import { IFilm } from 'swapi-ts';

interface State {
  films: IFilm[];
}

const { state, onChange } = createStore<State>({
  films: [],
});

onChange('films', value => {
  state.films = value;
});

export default state;
