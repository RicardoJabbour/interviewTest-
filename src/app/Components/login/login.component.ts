import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  backgroundImageUrl = '../../../assets/images/spotifi20-1024x512.jpg';

  constructor(
    private spotifyService:SpotifyService,
  ) {}

  ngOnInit(): void {

  }

  loginWithSpotify(){
    this.spotifyService.login();
  }



}
