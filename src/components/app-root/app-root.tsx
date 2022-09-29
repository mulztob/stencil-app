import { Component, h } from '@stencil/core';
import * as Swapi from 'swapi-ts';
import { state } from '@store/store';
import Router from '@app/router';
import { Route, match } from 'stencil-router-v2';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  async componentWillLoad() {
    //could be expanded with .then(films => films.populateAll('xxx'))
    // FIXME: fails on tests, somehow the network is mocked in test context
    return await Swapi.Films.find()
      .then(f => f.populateAll('characters'))
      .then(f => f.populateAll('vehicles'))
      .then(f => f.populateAll('species'))
      .then(f => f.populateAll('planets'))
      .then(f => f.populateAll('starships'))
      .then(films => {
        state.films = films.resources.map(f => f.value);
        console.log('app-root#load', state.films);
      })
      .catch(err => console.error(err));
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
      <Router.Switch>
        <Route path={match('/films/:id')} render={({ id }) => <films-details episodeId={id}></films-details>}></Route>

        <Route path="/films">
          <films-list></films-list>
        </Route>

        <Route path="/">
          <films-list></films-list>
        </Route>
      </Router.Switch>
    );
  }
}
