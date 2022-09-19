import { Component, h, Prop } from '@stencil/core';
import { IFilm } from 'swapi-ts';

@Component({
  tag: 'films-list',
  styleUrl: 'films-list.css',
  shadow: true,
})
export class FilmsList {
  @Prop() films: IFilm[];

  render() {
    return <div class="films-list">{this.films?.length > 0 ? this.renderList() : ''}</div>;
  }

  renderList() {
    return (
      <div>
        {this.films?.map(film => (
          <p>
            <stencil-route-link url={`/films/${film.episode_id}`}>
              <button>
                {film.title} (Episode {film.episode_id})
              </button>
            </stencil-route-link>
          </p>
        ))}
      </div>
    );
  }
}
