import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { ArtistDataService } from './artist-data.service';

@Injectable({
  providedIn: 'root',
})

export class SpotifyService {
  private clientId = '27bb4754053440f5a691aca4a7f4906a';
  private clientSecret = '2caad77cfa0045ffb581fea727c30a00';
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private playlistUrl = 'https://api.spotify.com/v1/me/playlists';
  private scopes = 'user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private'; // Add required scopes
  private redirectUri = 'http://localhost:4200/search';
  private AUTHORIZE = "https://accounts.spotify.com/authorize"
  private redirect_uri = "http://localhost:4200/search/"; // change this your value
  private apiUrl = 'https://api.spotify.com/v1';

  constructor(
    private http: HttpClient,
    private artistDataService: ArtistDataService
    ) {
  }

  getToken() {
    const url = 'https://accounts.spotify.com/api/token';

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(url, body.toString(), { headers });
  }

  login(){
      let url = this.AUTHORIZE;
      url += "?client_id=" + this.clientId;
      url += "&response_type=code";
      url += "&redirect_uri=" + encodeURI(this.redirect_uri);
      url += "&show_dialog=true";
      url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
      window.location.href = url; // Show Spotify's authorization screen
    }

    searchArtists(query: string): Observable<any> {
      this.artistDataService.setSearchTerm(query);

      const url = `${this.apiUrl}/search`;
      // const headers = this.getAuthHeaders();

      const params = new HttpParams()
        .set('q', query)
        .set('type', 'artist')
        .set('limit',50)
        .set('setToken','')
        .set('offset', 0);

      return this.http.get(url, { params });
      // return this.http.get(url, { headers, params });
    }

    private getAuthHeaders(): HttpHeaders {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.getAccessToken(),
      });
      return headers;
    }

    public getAccessToken(): string {
      let token = localStorage.getItem("access_token");
      if(token)
        return token;
      else
        return '';
    }

    getAlbum(albumId: string): Observable<any> {

      // const headers = this.getAuthHeaders();
      const params = new HttpParams()
        .set('setToken','')
        .set('limit',50)
        .set('offset', 0);

      return this.http.get(`${this.apiUrl}/artists/${albumId}/albums`, { params });
      // return this.http.get(`${this.apiUrl}/artists/${albumId}/albums`, { headers, params });
    }

}
