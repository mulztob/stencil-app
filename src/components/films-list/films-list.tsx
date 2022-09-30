import Router from '@app/lib/router';
import { Component, h, Prop } from '@stencil/core';
import { state } from '@store/store';
import { IFilm } from '@app/lib/swapi-ts';

@Component({
  tag: 'films-list',
  styleUrl: 'films-list.css',
  shadow: true,
})
export class FilmsList {
  @Prop() films?: IFilm[] = [];

  // connectedCallback() {
  //   window.setInterval(() => {
  //     console.log('interval', state.films);
  //   }, 2000);
  // }

  render() {
    console.log('render#state', state.films);
    return <div class="films-list">{state.films?.length > 0 ? this.renderList(state.films) : this.renderList(this.films)}</div>;
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
