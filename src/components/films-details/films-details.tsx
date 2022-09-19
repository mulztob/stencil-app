import { Component, Prop, h } from '@stencil/core';
import { MatchResults } from '@stencil-community/router';
import { IFilm } from 'swapi-ts';

@Component({
  tag: 'films-details',
  styleUrl: 'films-details.css',
  shadow: true,
})
export class FilmsDetails {
  @Prop() films: IFilm[];
  @Prop() match: MatchResults;
  film: IFilm;

  componentWillLoad() {
    if (this.match && this.match.params.id && this.films) {
      // console.log(this.films);
      const r = this.films.filter(f => f.episode_id == this.match.params.id);
      this.film = r.length > 0 ? (this.film = r[0]) : (this.film = null);
      console.log(this.film);
    }
  }

  render() {
    return (
      <div class="films-details">
        <h1>{this.film?.title}</h1>
        <p>{this.film.opening_crawl}</p>
        <table>
          <tr>
            <td>Created</td>
            <td>{this.film.created}</td>
          </tr>
          <tr>
            <td>Episode</td>
            <td>{this.film.episode_id}</td>
          </tr>
          <tr>
            <td>Director</td>
            <td>{this.film.director}</td>
          </tr>
        </table>
        <stencil-route-link url="/films">
          <button>back</button>
        </stencil-route-link>
      </div>
    );
  }
}
