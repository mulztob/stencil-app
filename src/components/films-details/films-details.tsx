// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Prop, h, State } from '@stencil/core';
import { IFilm, IPeople, Films } from '@app/lib/swapi-ts';
import { state } from '@store/store';
import Router from '@app/lib/router';

@Component({
  tag: 'films-details',
  styleUrl: 'films-details.css',
  shadow: true,
})
export class FilmsDetails {
  @Prop() episodeId: string;
  @State() @Prop() film: IFilm;

  componentWillRender() {
    if (state.films.length > 0 && this.episodeId) {
      const filmWithRightId = state.films.filter(f => f.episode_id == this.episodeId);
      this.film = filmWithRightId.length > 0 ? filmWithRightId[0] : null;
    }
  }

  render() {
    return this.film ? (
      <div class="films-details">
        <button onClick={() => Router.push('/films')}>back</button>
        <h1>{this.film?.title}</h1>
        <p>{this.film.opening_crawl}</p>
        <h3>Created by {this.film.created}</h3>
        <h3>Episode {this.film.episode_id}</h3>
        <h3>Directed by {this.film.director}</h3>
        <hr />
        {typeof this.film.characters[0] === 'string' ? "film's characters are not resolved" : <CardContainer people={this.film.characters as IPeople[]}></CardContainer>}
      </div>
    ) : (
      <div>no content</div>
    );
  }

  async resolveCharacters(film: IFilm) {
    const resources = await Films.find(q => q.url === film.url);
    await resources.populateAll('characters');
  }
}

const CardContainer = (props: { people: IPeople[] }) => {
  return (
    <div class="card-container">
      {props.people.map(person => (
        <people-card person={person}></people-card>
      ))}
    </div>
  );
};
