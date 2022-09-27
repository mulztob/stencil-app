import { IFilm } from 'swapi-ts';
import { dispose, state } from './store';

export const resetStore = () => {
  // store.reset();
  dispose();
  state.films = [film1];
  // store.state.species = {};
  // console.log('store state (films): ', store.state.films);
  // console.log('store state (species): ', store.state.species);
};

export const film1: IFilm = {
  title: 'The Phantom Menace',
  episode_id: '1',
  opening_crawl:
    'Turmoil has engulfed the\r\nGalactic Republic. The taxation\r\nof trade routes to outlying star\r\nsystems is in dispute.\r\n\r\nHoping to resolve the matter\r\nwith a blockade of deadly\r\nbattleships, the greedy Trade\r\nFederation has stopped all\r\nshipping to the small planet\r\nof Naboo.\r\n\r\nWhile the Congress of the\r\nRepublic endlessly debates\r\nthis alarming chain of events,\r\nthe Supreme Chancellor has\r\nsecretly dispatched two Jedi\r\nKnights, the guardians of\r\npeace and justice in the\r\ngalaxy, to settle the conflict....',
  director: 'George Lucas',
  producer: 'Rick McCallum',
  release_date: new Date(Date.parse('1999-05-19')),
  characters: [
    'https://swapi.dev/api/people/2/',
    'https://swapi.dev/api/people/3/',
    'https://swapi.dev/api/people/10/',
    'https://swapi.dev/api/people/11/',
    'https://swapi.dev/api/people/16/',
    'https://swapi.dev/api/people/20/',
    'https://swapi.dev/api/people/21/',
    'https://swapi.dev/api/people/32/',
    'https://swapi.dev/api/people/33/',
    'https://swapi.dev/api/people/34/',
    'https://swapi.dev/api/people/35/',
    'https://swapi.dev/api/people/36/',
    'https://swapi.dev/api/people/37/',
    'https://swapi.dev/api/people/38/',
    'https://swapi.dev/api/people/39/',
    'https://swapi.dev/api/people/40/',
    'https://swapi.dev/api/people/41/',
    'https://swapi.dev/api/people/42/',
    'https://swapi.dev/api/people/43/',
    'https://swapi.dev/api/people/44/',
    'https://swapi.dev/api/people/46/',
    'https://swapi.dev/api/people/47/',
    'https://swapi.dev/api/people/48/',
    'https://swapi.dev/api/people/49/',
    'https://swapi.dev/api/people/50/',
    'https://swapi.dev/api/people/51/',
    'https://swapi.dev/api/people/52/',
    'https://swapi.dev/api/people/53/',
    'https://swapi.dev/api/people/54/',
    'https://swapi.dev/api/people/55/',
    'https://swapi.dev/api/people/56/',
    'https://swapi.dev/api/people/57/',
    'https://swapi.dev/api/people/58/',
    'https://swapi.dev/api/people/59/',
  ],
  planets: ['https://swapi.dev/api/planets/1/', 'https://swapi.dev/api/planets/8/', 'https://swapi.dev/api/planets/9/'],
  starships: [
    'https://swapi.dev/api/starships/31/',
    'https://swapi.dev/api/starships/32/',
    'https://swapi.dev/api/starships/39/',
    'https://swapi.dev/api/starships/40/',
    'https://swapi.dev/api/starships/41/',
  ],
  vehicles: [
    'https://swapi.dev/api/vehicles/33/',
    'https://swapi.dev/api/vehicles/34/',
    'https://swapi.dev/api/vehicles/35/',
    'https://swapi.dev/api/vehicles/36/',
    'https://swapi.dev/api/vehicles/37/',
    'https://swapi.dev/api/vehicles/38/',
    'https://swapi.dev/api/vehicles/42/',
  ],
  species: [
    'https://swapi.dev/api/species/1/',
    'https://swapi.dev/api/species/2/',
    'https://swapi.dev/api/species/6/',
    'https://swapi.dev/api/species/11/',
    'https://swapi.dev/api/species/12/',
    'https://swapi.dev/api/species/13/',
    'https://swapi.dev/api/species/14/',
    'https://swapi.dev/api/species/15/',
    'https://swapi.dev/api/species/16/',
    'https://swapi.dev/api/species/17/',
    'https://swapi.dev/api/species/18/',
    'https://swapi.dev/api/species/19/',
    'https://swapi.dev/api/species/20/',
    'https://swapi.dev/api/species/21/',
    'https://swapi.dev/api/species/22/',
    'https://swapi.dev/api/species/23/',
    'https://swapi.dev/api/species/24/',
    'https://swapi.dev/api/species/25/',
    'https://swapi.dev/api/species/26/',
    'https://swapi.dev/api/species/27/',
  ],
  created: new Date(Date.parse('2014-12-19T16:52:55.740000Z')),
  edited: new Date(Date.parse('2014-12-20T10:54:07.216000Z')),
  url: 'https://swapi.dev/api/films/4/',
};
