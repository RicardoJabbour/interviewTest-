import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  artistInfo: any; // Store retrieved artist information here
  starRating: number = 5;
  artists : any[] = [];
  searchControl = new FormControl();
  rating: number = 3;
  ratingArr : number[] = [];
  starsCount : any;

  constructor(
    private spotifyService:SpotifyService,
  ) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // Delay before making the API call
      distinctUntilChanged(), // Only trigger if the value changes
      switchMap((query: string) => this.spotifyService.searchArtists(query))
    ).subscribe((results: any) => {
      this.artists = results.artists.items;
    });
  }

  ngOnInit(): void {
    this.spotifyService.getToken().subscribe((data: any) =>{
      if(data.access_token)
        localStorage.setItem("access_token", data.access_token);
    })
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  ratingOn5Scale = (ratingOn100Scale: number) => Math.round((ratingOn100Scale / 100) * 5);

  getArtistAlbum(artistId: string){
    this.spotifyService.getAlbum(artistId).subscribe(data =>{
      console.log(data);
    });
  }

}
