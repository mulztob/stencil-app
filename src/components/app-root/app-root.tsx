import { Component, h } from '@stencil/core';
import * as Swapi from 'swapi-ts';
import store from '../../store';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  componentWillLoad() {
    //could be expanded with .then(films => films.populateAll('xxx'))
    return Swapi.Films.find()
      .then(f => f.populateAll('characters'))
      .then(f => f.populateAll('vehicles'))
      .then(f => f.populateAll('species'))
      .then(f => f.populateAll('planets'))
      .then(f => f.populateAll('starships'))
      .then(films => {
        store.state.films = films.resources.map(f => f.value);
        // console.log('state.films:', store.state.films);
      });
  }
  render() {
    return (
      <div>
        <header>
          <h1>Star Wars API Test App using Stencil.JS</h1>
        </header>

        <main>{this.routerOutlet()}</main>
      </div>
    );
  }

  routerOutlet() {
    return (
      <stencil-router>
        <stencil-route-switch scrollTopOffset={0}>
          <stencil-route url="/" component="films-list" exact={true} />
          <stencil-route url="/films" component="films-list" exact={true} />
          <stencil-route url="/films/:id" component="films-details" />
        </stencil-route-switch>
      </stencil-router>
    );
  }
}
