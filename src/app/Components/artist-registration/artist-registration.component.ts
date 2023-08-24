import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Album, ArtistFormData, Song, Type } from 'src/app/models/artist-album-song/artist-album-song.module';
import { ArtistFormDataRepository } from 'src/app/services/artists.repository';

@Component({
  selector: 'app-artist-registration',
  templateUrl: './artist-registration.component.html',
  styleUrls: ['./artist-registration.component.css']
})
export class ArtistRegistrationComponent {

  artistForm: FormGroup;
  books: any[]=[];
  arrayOfArtists: ArtistFormData[] = [];
  albumUrl: any;
  albumMsg: any;
  artistUrl: any;
  artistMsg: any;
  ArtistType: Type = Type.Artist;
  AlbumType: Type = Type.Album;
  backgroundImageUrl = '../../../assets/images/addArtist.avif';
  albums: Album[] = [];
  artistId: number = -1;
  albumId: number = -1;
  songId : number = -1;

  constructor(
    private fb: FormBuilder,
    private artistFormDataRepository: ArtistFormDataRepository,
    ) {

      this.artistId += 1;
    this.artistForm = this.fb.group({
      id: this.artistId,
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      dob: ['', [Validators.required,this.minAgeValidator(25)]],
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

  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const dob = new Date(control.value);
        const today = new Date();
        const minDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

        if (dob >= minDate) {
          return { minAge: true }; // Validation failed
        }
      }
      return null; // Validation passed
    };
  }

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

  selectFile(event: any,type: string,id: number,album:Album) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			type === Type.Album ? album.errMsg = 'You must select an image' : this.artistMsg = 'You must select an image';
			return;
		}

		var mimeType = event.target.files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			type === Type.Album ? album.errMsg = 'Only images are supported' : this.artistMsg = 'Only images are supported';
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			type === Type.Album ? album.errMsg = '' : this.artistMsg = '';
    }
	}

  onFileSelected(event: any, type: string,id: number): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const albums = this.artistForm.get('albums')?.value as Album[];
      let album = albums.find(data => data.id === id);
    album ? this.selectFile(event,type,id,album) : "";

			type === Type.Album && (reader.result !== null && reader.result !== undefined) && album ?
      album.picture = e.target.result : this.artistUrl = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  getAlbumImg(id: number){
    const albums = this.artistForm.get('albums')?.value as Album[];
      let album = albums.find(data => data.id === id);
      return album?.picture;
  }

  getErrMsg(id: number){
    const albums = this.artistForm.get('albums')?.value as Album[];
    let album = albums.find(data => data.id === id);
    return album?.errMsg;
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

  addAlbum(artistId: number) {

    const artist = this.artistForm.value;
    if(artist.id === artistId){
      const albs = this.artistForm.get('albums') as FormArray;
      albs.push(this.createAlbum());

      const albums = this.artistForm.get('albums')?.value as Album[];
      albums.forEach(al =>{
        if(!this.albums.some(obj => obj.id === al.id))
          this.albums.push(al)
      })
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
      // this.artistForm.reset({ });

// Call this when you want to reset the form
this.resetForm();

    }
  }

  resetForm() {
    this.artistForm.patchValue({
      id: this.artistId,
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      phoneNumber: '',
      profilePicture: '',
      stageName: '',
      backstory: '',
      startingDate: '',
      albums: [this.createAlbum()]
    });

  this.artistForm.markAsPristine();
  }


  saveForm(){
    this.artistFormDataRepository.setBooks(this.arrayOfArtists);
    console.log(this.artistFormDataRepository.books$)
  }
}
