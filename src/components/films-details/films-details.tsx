import { Component, Prop, h } from '@stencil/core';
import { IFilm } from 'swapi-ts';
import store from '@store/store';
import Router from '@app/router';

@Component({
  tag: 'films-details',
  styleUrl: 'films-details.css',
  shadow: true,
})
export class FilmsDetails {
  @Prop() id: string;
  film: IFilm;

  componentWillLoad() {
    console.log(`load..., id: ${this.id}, store: ${store}`);
    if (store.state.films) {
      const filmWithRightId = store.state.films.filter(f => f.episode_id == this.id);
      this.film = filmWithRightId.length > 0 ? (this.film = filmWithRightId[0]) : (this.film = null);
      console.log(this.film);
    }
  }

  render() {
    return (
      <div class="films-details">
        {console.log(this.film)}
        <button onClick={() => Router.push('/films')}>back</button>
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
