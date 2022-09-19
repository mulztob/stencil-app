import { Component, h, State } from '@stencil/core';
import * as Swapi from 'swapi-ts';
import { IFilm } from 'swapi-ts';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() films: IFilm[];
  componentWillLoad() {
    //could be expanded with .then(films => films.populateAll('xxx'))
    Swapi.Films.find().then(films => {
      this.films = films.resources.map(f => f.value);
      console.log(this.films);
    });
  }
  render() {
    return (
      <div>
        <header>
          <h1>SW API Test App using Stencil.JS</h1>
        </header>

        <main>{this.routerOutlet()}</main>
      </div>
    );
  }

  routerOutlet() {
    return (
      <stencil-router>
        <stencil-route-switch scrollTopOffset={0}>
          <stencil-route url="/" component="films-list" exact={true} componentProps={{ films: this.films }} />
          <stencil-route url="/films" component="films-list" exact={true} componentProps={{ films: this.films }} />
          <stencil-route url="/films/:id" component="films-details" componentProps={{ films: this.films }} />
        </stencil-route-switch>
      </stencil-router>
    );
  }
}
