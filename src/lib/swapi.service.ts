import * as swapi from './swapi-ts';
import * as store from '@store/store';

interface hasUrl {
  url: string;
}

let singletonService: SwapiService;

//FIXME: make SwapiService a full facade for the store and hide store inside the service
class SwapiService {
  private loadFinished = false;

  async Load() {
    if (this.loadFinished) return store.state;

    store.reset();
    try {
      const [films, species, people] = await Promise.all([swapi.Films.asArray(), swapi.Species.asArray(), swapi.People.asArray()]);

      store.state.films = this.populateFilms(films, people, species);
      store.state.people = this.populatePeople(people, species);
      store.state.species = this.transformArrayToRecord(species);

      this.loadFinished = true;
      return store.state;
    } catch (error) {
      this.loadFinished = false;
      console.error(error);
      return;
    }
  }

  private populatePeople(people: swapi.IPeople[], species: swapi.ISpecie[]): Record<string, swapi.IPeople> {
    const populated = people.map(p => {
      return {
        ...p,
        species: species.filter(resolved => (p.species as string[]).includes(resolved.url)),
      };
    });
    return this.transformArrayToRecord(populated);
  }

  private transformArrayToRecord<T extends hasUrl>(items: T[]): Record<string, T> {
    const resultRecord: Record<string, T> = {};
    items.forEach(i => (resultRecord[i.url] = i));
    return resultRecord;
  }

  private populateFilms(films: swapi.IFilm[], people: swapi.IPeople[], species: swapi.ISpecie[]) {
    return films.map(f => {
      return {
        ...f,
        characters: people.filter(resolved => (f.characters as string[]).includes(resolved.url)),
        species: species.filter(resolved => (f.species as string[]).includes(resolved.url)),
      };
    });
  }

  static {
    singletonService = new SwapiService();
    singletonService.Load();
  }
}

export const service = singletonService;
