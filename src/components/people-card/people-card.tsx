// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, h, Prop } from '@stencil/core';
import { IPeople, ISpecie, Species } from 'swapi-ts';
import { state } from '@store/store';

@Component({
  tag: 'people-card',
  styleUrl: 'people-card.css',
  shadow: true,
})
export class PeopleCard {
  @Prop() person: IPeople;
  resolvedSpecies: ISpecie[] = [];

  async componentWillRender() {
    this.resolvedSpecies = [];

    if (this.person?.species?.length > 0) {
      const species = this.person.species;

      if (typeof species.at(0) === 'string') {
        for await (const maybeResolved of species) {
          const fromState = this.loadFromState(maybeResolved as string);

          this.needsSwapiResolve(fromState)
            ? (this.resolvedSpecies = this.resolvedSpecies.concat(await this.updateState(maybeResolved)))
            : (this.resolvedSpecies = this.resolvedSpecies.concat(fromState as ISpecie));
        }
      }
    }
  }

  private async updateState(maybeResolved: string | ISpecie) {
    if (typeof maybeResolved === 'string') return (state.species[maybeResolved as string] = (await Species.find(q => maybeResolved === q.url)).resources.at(0).value);
    return maybeResolved as ISpecie;
  }

  private loadFromState(url: string): string | ISpecie {
    if (url == null) return;
    return state.species[url] ?? url;
  }

  private needsSwapiResolve(species: string | ISpecie) {
    return typeof species === 'string';
  }

  render() {
    return (
      <div class="people-card">
        {/* <img src="img_avatar.png" width="100%" /> */}
        <div class="container">
          <h4>Name: {this.person.name}</h4>
          {/* <p>Id: {this.person.url}</p> */}
          <p>Gender: {this.person.gender}</p>
          <p>Species: {this.resolvedSpecies.map(sp => sp.name).join(', ')}</p>
        </div>
      </div>
    );
  }
}
