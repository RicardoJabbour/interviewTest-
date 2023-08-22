import { Artist } from './../../models/artist.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistDataService } from 'src/app/services/artist-data.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums: any[] = [];
  artist = new Artist;

  constructor(
    private spotifyService:SpotifyService,
    private route: ActivatedRoute,
    public artistDataService: ArtistDataService,
  ){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id)
        this.spotifyService.getAlbum(id).subscribe(data =>{
          this.albums.push(...data.items);
        });
    });

    let dataArtist = this.artistDataService.getArtistData();
    if(dataArtist){
      this.artist.followers = dataArtist.followers;
      this.artist.img = dataArtist.img;
      this.artist.name = dataArtist.name;
    }

  }

  openArtistAlbum(albumLink:any){
    window.open(albumLink, '_blank');
  }

  getYear(date: any){
    return new Date(date).getFullYear()
  }

}
