import { Component, h } from '@stencil/core';
import state from '../../store';

@Component({
  tag: 'films-list',
  styleUrl: 'films-list.css',
  shadow: true,
})
export class FilmsList {
  render() {
    return <div class="films-list">{state.films?.length > 0 ? this.renderList() : ''}</div>;
  }

  renderList() {
    return (
      <div>
        {state.films?.map(film => (
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
