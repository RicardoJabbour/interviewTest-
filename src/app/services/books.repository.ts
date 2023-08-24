import { Injectable } from '@angular/core';
import { propsArrayFactory, createStore } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities, selectEntities,} from '@ngneat/elf-entities';
import { map, withLatestFrom } from 'rxjs/operators';

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: Array<string>;
  };
}

const {
  withCollectionIds,
  selectCollectionIds,
  addCollectionIds,
  removeCollectionIds,
  inCollectionIds,
} = propsArrayFactory('collectionIds', { initialValue: [] as string[] });

const store = createStore(
  { name: 'books' },
  withEntities<Book>(),
  withCollectionIds()
);

@Injectable({ providedIn: 'root' })
export class BooksRepository {
  books$ = store.pipe(selectAllEntities());

  ownBooks$ = store.pipe(selectCollectionIds()).pipe(
    withLatestFrom(store.pipe(selectEntities())),
    map(([ids, books]) => ids.map((id) => books[id]))
  );

  setBooks(books: Book[]) {
    store.update(setEntities(books));
  }

  removeFromCollection(bookId: string) {
    store.update(removeCollectionIds(bookId));
  }

  addToCollection(bookId: string) {
    if (!store.query(inCollectionIds(bookId))) {
      store.update(addCollectionIds(bookId));
    }
  }
}
