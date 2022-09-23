import { Component, h } from '@stencil/core';
import store from '@store/store';

@Component({
  tag: 'films-list',
  styleUrl: 'films-list.css',
  shadow: true,
})
export class FilmsList {
  render() {
    return <div class="films-list">{store.state.films?.length > 0 ? this.renderList() : 'no content'}</div>;
  }

  renderList() {
    return (
      <div>
        {store.state.films?.map(film => (
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
