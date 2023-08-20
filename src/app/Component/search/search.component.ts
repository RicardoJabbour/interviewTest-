import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SpotifyService } from 'src/app/service/spotify.service';

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
  // artists: any[] = [];

  constructor(
    private spotifyService:SpotifyService,
  ) {
    // this.searchControl.valueChanges.pipe(
    //   debounceTime(300), // Delay before making the API call
    //   distinctUntilChanged(), // Only trigger if the value changes
    //   switchMap((query: string) => this.spotifyService.searchArtists(query))
    // ).subscribe((results: any) => {
    //   this.artists = results.artists.items;
    // });
  }

  ngOnInit(): void {
    this.spotifyService.getToken().subscribe((data: any) =>{
      if(data.access_token)
        localStorage.setItem("access_token", data.access_token);
    })
  }

  // searchArtists() {
    // this.spotifyService.searchArtists(this.searchQuery).subscribe(data =>{
    //   debugger
    //   this.artists.push(...data.artists.items);
    //   console.log(this.artists);
    // })


  // }
}
