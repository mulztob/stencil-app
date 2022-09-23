import { Component, Prop, h } from '@stencil/core';
import { MatchResults } from '@stencil-community/router';
import { IFilm } from 'swapi-ts';
import store from '../../store';

@Component({
  tag: 'films-details',
  styleUrl: 'films-details.css',
  shadow: true,
})
export class FilmsDetails {
  @Prop() match: MatchResults;
  film: IFilm;

  componentWillLoad() {
    if (this.match && this.match.params.id && store.state.films) {
      const filmWithRightId = store.state.films.filter(f => f.episode_id == this.match.params.id);
      this.film = filmWithRightId.length > 0 ? (this.film = filmWithRightId[0]) : (this.film = null);
      console.log(this.film);
    }
  }

  render() {
    return (
      <div class="films-details">
        <stencil-route-link url="/films">
          <button>back</button>
        </stencil-route-link>
        <h1>{this.film?.title}</h1>
        <p>{this.film.opening_crawl}</p>
        <h3>Created by {this.film.created}</h3>
        <h3>Episode {this.film.episode_id}</h3>
        <h3>Directed by {this.film.director}</h3>
        <hr />
        <CardContainer people={this.film.characters}></CardContainer>
      </div>
    );
  }
}
const CardContainer = props => {
  return (
    <div class="card-container">
      {props.people.map(person => (
        <people-card person={person}></people-card>
      ))}
    </div>
  );
};
