import { Component, Prop, h } from '@stencil/core';
import { MatchResults } from '@stencil-community/router';
import { IFilm } from 'swapi-ts';
import state from '../../store';

@Component({
  tag: 'films-details',
  styleUrl: 'films-details.css',
  shadow: true,
})
export class FilmsDetails {
  @Prop() match: MatchResults;
  film: IFilm;

  componentWillLoad() {
    if (this.match && this.match.params.id && state.films) {
      const r = state.films.filter(f => f.episode_id == this.match.params.id);
      this.film = r.length > 0 ? (this.film = r[0]) : (this.film = null);
      console.log(this.film);
    }
  }

  render() {
    return (
      <div class="films-details">
        <h1>{this.film?.title}</h1>
        <p>{this.film.opening_crawl}</p>
        <h3>Created by {this.film.created}</h3>
        <h3>Episode {this.film.episode_id}</h3>
        <h3>Directored by {this.film.director}</h3>
        <hr />
        <div class="card-container">
          {this.film.characters.map(c => (
            <people-card person={c}></people-card>
          ))}
        </div>
        <stencil-route-link url="/films">
          <button>back</button>
        </stencil-route-link>
      </div>
    );
  }
}
