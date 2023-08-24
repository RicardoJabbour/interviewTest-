export class Artist{
  img: string = '';
  name: string = '';
  followers: number = 0;
}

export interface Artist_ {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  stageName: string;
  backstory: string;
  startingDate: string;
  albums: Album[];
  songs: Song[];
}

export interface Album {
  name: string;
  picture: string;
  date: string;
}

export interface Song {
  name: string;
  duration: string;
}
