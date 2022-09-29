import Router from '@app/router';
import { Component, h, Prop } from '@stencil/core';
import { state } from '@store/store';
import { IFilm } from 'swapi-ts';

@Component({
  tag: 'films-list',
  styleUrl: 'films-list.css',
  shadow: true,
})
export class FilmsList {
  @Prop() films?: IFilm[] = [];

  render() {
    return (
      <div class="films-list">
        {/* {console.log('films-list#render, state', state.films)} */}
        {state.films?.length > 0 ? this.renderList(state.films) : this.renderList(this.films)}
      </div>
    );
  }

  renderList(films: IFilm[]) {
    return (
      <div>
        {films.length > 0
          ? films.map(film => (
              <div>
                <button onClick={() => Router.push(`/films/${film.episode_id}`)}>
                  {film.title} (Episode {film.episode_id})
                </button>
              </div>
            ))
          : 'no content'}
      </div>
    );
  }
}
