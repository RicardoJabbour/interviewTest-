import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/service/spotify.service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  playlists: any[] = [];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    debugger
    // this.spotifyService.getPlaylists().subscribe((response: any) => {
    //   this.playlists = response.items;
    // });
  }
}
