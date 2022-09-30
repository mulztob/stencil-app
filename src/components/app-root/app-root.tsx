import { Component, h } from '@stencil/core';
import Router from '@app/lib/router';
import { Route, match } from 'stencil-router-v2';
import { service } from '@app/lib/swapi.service';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  async componentWillLoad() {
    return await service.isLoaded;
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
