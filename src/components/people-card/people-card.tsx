import { Component, h, Prop } from '@stencil/core';
// import state from '../../films-store';
import { IPeople } from 'swapi-ts';

@Component({
  tag: 'people-card',
  styleUrl: 'people-card.css',
  shadow: true,
})
export class PeopleCard {
  @Prop() person: IPeople;

  render() {
    return (
      <div class="people-card">
        {/* <img src="img_avatar.png" width="100%" /> */}
        <div class="container">
          <h4>Name: {this.person.name}</h4>
          <p>Gender: {this.person.gender}</p>
          <p>Species: {this.person.species}</p>
        </div>
      </div>
    );
  }
}
