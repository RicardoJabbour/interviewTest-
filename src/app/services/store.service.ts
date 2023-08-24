import { Store } from '@ngneat/elf';
import { Injectable } from '@angular/core';

export interface Artist {
  firstName: string;
  lastName: string;
}

export interface ArtistState {
  registeredArtists: Artist[];
}

@Injectable({ providedIn: 'root' })
export class ArtistStore extends Store<any> {
  constructor() {
    super({ registeredArtists: [] });
  }
}
