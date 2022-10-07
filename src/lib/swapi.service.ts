import * as store from '../store/store';
import { Films, IFilm, IPeople, ISpecie, People, Species } from './swapi-ts';

interface hasUrl {
  url: string;
}
let singletonService: SwapiService;

//FIXME: make SwapiService a full facade for the store and hide store inside the service
class SwapiService {
  async Load() {
    if (store.state && store.state?.initialLoad) return store.state;

    store.reset();
    try {
      const [films, species, people] = await Promise.all([Films.asArray(), Species.asArray(), People.asArray()]);

      store.state.films = this.populateFilms(films, people, species);
      store.state.people = this.populatePeople(people, species);
      store.state.species = this.transformArrayToRecord(species);

      store.state.initialLoad = true;
      return store.state;
    } catch (error) {
      store.state.initialLoad = false;
      console.error(error);
      return;
    }
  }

  private populatePeople(people: IPeople[], species: ISpecie[]): Record<string, IPeople> {
    const populated = people.map(p => {
      return {
        ...p,
        species: this.resolveByUrl(p.species as string[], species),
      };
    });
    return this.transformArrayToRecord(populated);
  }

  private resolveByUrl<T extends hasUrl>(toResolve: string[], items: T[]) {
    return items.filter(q => toResolve.includes(q.url));
  }

  private transformArrayToRecord<T extends hasUrl>(items: T[]): Record<string, T> {
    const resultRecord: Record<string, T> = {};
    items.forEach(i => (resultRecord[i.url] = i));
    return resultRecord;
  }

  private populateFilms(films: IFilm[], people: IPeople[], species: ISpecie[]): IFilm[] {
    return films.map(f => {
      return {
        ...f,
        characters: this.resolveByUrl(f.characters as string[], people),
        species: this.resolveByUrl(f.species as string[], species),
      };
    });
  }

  static {
    singletonService = new SwapiService();
    singletonService.Load();
  }
}

export const service = singletonService;
