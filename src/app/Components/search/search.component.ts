import { Artist } from './../../models/artist.model';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ArtistDataService } from 'src/app/services/artist-data.service';
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
  backgroundImageUrl = '../../../assets/images/spotifi14.jpg';
  nextUrl: string = '';

  constructor(
    private spotifyService:SpotifyService,
    private router: Router,
    private artistDataService: ArtistDataService,
  ) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // Delay before making the API call
      distinctUntilChanged(), // Only trigger if the value changes
      switchMap((query: string) => this.spotifyService.searchArtists(query))
    ).subscribe(
      (results: any) => {
        this.nextUrl = results?.artists?.next;
        this.artists = results.artists.items;
    },
    err =>{
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.spotifyService.getToken().subscribe((data: any) =>{
      if(data.access_token)
        localStorage.setItem("access_token", data.access_token);
    });

    if(this.artistDataService.getSearchTerm() !== ''){
      this.searchControl.setValue(this.artistDataService.getSearchTerm());
      this.spotifyService.searchArtists(this.artistDataService.getSearchTerm()).subscribe(
        (results: any) => {
        this.nextUrl = results.artists.next;

        this.artists = results.artists.items;
      },
      err =>{
        console.log(err);
      });
    }
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  ratingOn5Scale = (ratingOn100Scale: number) => Math.round((ratingOn100Scale / 100) * 5);

  getArtistAlbum(artistId: string, artist:any){
    let artistToSet = new Artist;
    artistToSet.followers = artist.followers.total;
    artistToSet.img = artist?.images[1]?.url;
    artistToSet.name = artist.name;

    this.artistDataService.setArtistData(artistToSet)
    this.router.navigate(['/album', artistId]);
  }

  clearSearch(){
    this.searchControl.setValue('');
    this.artists = [];
  }

  loadMore(){
    this.spotifyService.loadMore(this.nextUrl).subscribe((data: any) =>{
      this.artists.push(...data.artists.items);
      this.nextUrl = data.artists.next;
    });
  }

}
