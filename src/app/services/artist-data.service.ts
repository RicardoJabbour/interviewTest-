import { Injectable } from '@angular/core';
import { Artist } from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistDataService {

  artistData = new Artist;

  setArtistData(artist: Artist) {
    this.artistData.followers = artist.followers;
    this.artistData.img = artist.img;
    this.artistData.name = artist.name
  }

  getArtistData(): Artist | null {
    return this.artistData;
  }

  private searchTerm: string = '';

  getSearchTerm(): string {
    return this.searchTerm;
  }

  setSearchTerm(term: string) {
    this.searchTerm = term;
  }

}
