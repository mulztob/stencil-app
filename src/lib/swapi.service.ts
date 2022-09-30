import * as swapi from './swapi-ts';
import * as store from '@store/store';

interface hasUrl {
  url: string;
}

export class SwapiService {
  private static isLoaded = false;

  static async InitialLoad() {
    if (this.isLoaded) return;

    store.reset();
    this.isLoaded = true;
    try {
      const [films, species, people] = await Promise.all([swapi.Films.asArray(), swapi.Species.asArray(), swapi.People.asArray()]);

      store.state.films = this.populateFilms(films, people, species);
      store.state.people = this.populatePeople(people, species);
      store.state.species = this.transformArrayToRecord(species);

      return store.state;
    } catch (error) {
      console.error(error);
      return;
    }
  }

  private static populatePeople(people: swapi.IPeople[], species: swapi.ISpecie[]): Record<string, swapi.IPeople> {
    const populated = people.map(p => {
      return {
        ...p,
        species: species.filter(resolved => (p.species as string[]).includes(resolved.url)),
      };
    });
    return this.transformArrayToRecord(populated);
  }

  private static transformArrayToRecord<T extends hasUrl>(items: T[]): Record<string, T> {
    const resultRecord: Record<string, T> = {};
    items.forEach(i => (resultRecord[i.url] = i));
    return resultRecord;
  }

  private static populateFilms(films: swapi.IFilm[], people: swapi.IPeople[], species: swapi.ISpecie[]) {
    return films.map(f => {
      return {
        ...f,
        characters: people.filter(resolved => (f.characters as string[]).includes(resolved.url)),
        species: species.filter(resolved => (f.species as string[]).includes(resolved.url)),
      };
    });
  }
}
