import { Injectable } from '@angular/core';
import { propsArrayFactory, createStore } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities, selectEntities,} from '@ngneat/elf-entities';
import { map, withLatestFrom } from 'rxjs/operators';
import { ArtistFormData } from '../models/artist-album-song/artist-album-song.module';

const {
  withCollectionIds,
  selectCollectionIds,
  addCollectionIds,
  removeCollectionIds,
  inCollectionIds,
} = propsArrayFactory('collectionIds', { initialValue: [] as string[] });

const store = createStore(
  { name: 'artists' },
  withEntities<ArtistFormData>(),
  withCollectionIds()
);

@Injectable({ providedIn: 'root' })
export class ArtistFormDataRepository {
  books$ = store.pipe(selectAllEntities());

  setBooks(books: ArtistFormData[]) {
    store.update(setEntities(books));
  }

  removeFromCollection(artistId: string) {
    store.update(removeCollectionIds(artistId));
  }

  addToCollection(artistId: string) {
    if (!store.query(inCollectionIds(artistId))) {
      store.update(addCollectionIds(artistId));
    }
  }
}
