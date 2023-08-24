export interface Album {
  id?:number;
  name: string;
  picture: any;
  date: Date;
  songs: Song[];
  errMsg: string;
}

export interface Song {
  id?:number;
  name: string;
  duration: string;
}

export interface ArtistFormData {
  id:number;
  albums: Album[];
  backstory: string;
  dob: Date;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePicture: string;
  stageName: string;
  startingDate: Date;
}

export enum Type {
  Artist = 'Artist',
  Album = 'Album',
}
