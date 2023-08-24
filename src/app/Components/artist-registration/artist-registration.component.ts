import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Album, ArtistFormData, Song, Type } from 'src/app/models/artist-album-song/artist-album-song.module';
import { ArtistFormDataRepository } from 'src/app/services/artists.repository';

@Component({
  selector: 'app-artist-registration',
  templateUrl: './artist-registration.component.html',
  styleUrls: ['./artist-registration.component.css']
})
export class ArtistRegistrationComponent {

  artistForm: FormGroup;
  minDOB: string;
  books: any[]=[];
  arrayOfArtists: ArtistFormData[] = [];
  albumUrl: any;
  albumMsg: any;
  artistUrl: any;
  artistMsg: any;
  ArtistType: Type = Type.Artist;
  AlbumType: Type = Type.Album;
  isImg: boolean = true;
  backgroundImageUrl = '../../../assets/images/addArtist.avif';
  albums: Album[] = [];
artistId: number = -1;
albumId: number = -1;
songId : number = -1;

  constructor(
    private fb: FormBuilder,
    private artistFormDataRepository: ArtistFormDataRepository,
    ) {
    this.minDOB = new Date(new Date().getFullYear() - 25, 0, 1).toISOString().split('T')[0];

    // this.artistForm = this.fb.group({
    //   firstName: ['', [Validators.required, Validators.minLength(3)]],
    //   lastName: ['', [Validators.required, Validators.minLength(3)]],
    //   dob: ['', [Validators.required]],
    //   email: ['', [Validators.required, Validators.email]],
    //   phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{8,8}')]],
    //   profilePicture: ['', [Validators.required]],
    //   stageName: [''],
    //   backstory: [''],
    //   startingDate: [''],
    //   albums: this.fb.array([this.createAlbum()]),
    //   songs: this.fb.array([this.createSong()]),
    // });
      this.artistId += 1;
    this.artistForm = this.fb.group({
      id: this.artistId,
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      dob: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{8,8}')]],
      profilePicture: ['', [Validators.required]],
      stageName: [''],
      backstory: [''],
      startingDate: [''],
      albums: this.fb.array([this.createAlbum()]),
    });

    this.albums.push(...this.artistForm.get('albums')?.value);

  }

  ngOnInit(): void {}

  isImgType(){
    return this.isImg;
  }

  // convertToArtistFormData(): ArtistFormData {
  //   const formData = this.artistForm.value;

  //   const artistData: ArtistFormData = {
  //     id:this.arrayOfArtists.length + "1",
  //     firstName: formData.firstName,
  //     lastName: formData.lastName,
  //     dob: formData.dob,
  //     email: formData.email,
  //     phoneNumber: formData.phoneNumber,
  //     profilePicture: formData.profilePicture,
  //     stageName: formData.stageName,
  //     backstory: formData.backstory,
  //     startingDate: formData.startingDate,
  //     albums: formData.albums,
  //     songs: formData.songs,
  //   };

  //   return artistData;
  // }

  convertToArtistFormData(): ArtistFormData {
    const formData = this.artistForm.value;

    const artistData: ArtistFormData = {
      id:this.artistId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      profilePicture: formData.profilePicture,
      stageName: formData.stageName,
      backstory: formData.backstory,
      startingDate: formData.startingDate,
      albums: formData.albums.map((album: Album) => {
        return {
          name: album.name,
          picture: album.picture,
          date: album.date,
          songs: album.songs.map((song: Song) => {
            return {
              name: song.name,
              duration: song.duration
            };
          })
        };
      })
    };

    return artistData;
  }

  selectFile(event: any,type: string) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			type === Type.Album ? this.albumMsg = 'You must select an image' : this.artistMsg = 'You must select an image';
      this.isImg = true;
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			type === Type.Album ? this.albumMsg = 'Only images are supported' : this.artistMsg = 'Only images are supported';
      this.isImg = false;
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
      this.isImg = true;
			type === Type.Album ? this.albumMsg = '' : this.artistMsg = '';
			type === Type.Album ? this.albumUrl = reader.result : this.artistUrl = reader.result;
		}
	}

  createAlbum(): FormGroup {
    this.albumId += 1;

    return this.fb.group({
      id: this.albumId,
      name: [''],
      picture: [''],
      date: [''],
      songs: this.fb.array([this.createSong()])
    });
  }

  createSong(): FormGroup {
    this.songId += 1;

    return this.fb.group({
      id: this.songId,
      name: [''],
      duration: ['']
    });
  }

  get songs(): FormArray {
    return this.artistForm.get('albums')?.value.map((album: Album) => album.songs) as FormArray;
  }

  addAlbum(artistId: number) {

    const artist = this.artistForm.value;
    if(artist.id === artistId){
      const albs = this.artistForm.get('albums') as FormArray;
      albs.push(this.createAlbum());

      const albums = this.artistForm.get('albums')?.value as Album[];
      // this.albums = [];
      albums.forEach(al =>{
        if(!this.albums.some(obj => obj.id === al.id))
          this.albums.push(al)
      })
      // this.albums.push(...albums)
    }
  }

  addSong(albumIndex: number) {
    const album = this.albums.find(item => item.id === albumIndex) as Album;

    const songs = (this.artistForm.get('albums') as FormArray).at(albumIndex).get('songs') as FormArray;
    songs.push(this.createSong());

    album.songs = [];
    let albums =this.artistForm.get('albums')?.value as Album[];
    albums.forEach(al => {
      album.songs.push(...al.songs);
    });
  }

  submitForm() {
    if (this.artistForm.valid) {
      const artistData = this.convertToArtistFormData();
      this.arrayOfArtists.push(artistData);
      console.log('Array of Artists:', this.arrayOfArtists);
      this.artistForm.reset({});
    }
  }

  saveForm(){
    this.artistFormDataRepository.setBooks(this.arrayOfArtists);
    console.log(this.artistFormDataRepository.books$)
  }
}
