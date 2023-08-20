import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/service/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private spotifyService:SpotifyService,
  ) {}

  ngOnInit(): void {

  }

  loginWithSpotify(){
    this.spotifyService.login();
  }



}
