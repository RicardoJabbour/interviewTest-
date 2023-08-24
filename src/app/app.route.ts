import { Routes } from "@angular/router";
import { LoginComponent } from "./Components/login/login.component";
import { SearchComponent } from "./Components/search/search.component";
import { AlbumsComponent } from "./Components/albums/albums.component";
import { AuthGuard } from "./guard/auth.guard";
import { ArtistRegistrationComponent } from "./Components/artist-registration/artist-registration.component";

export const UserRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  { path: 'artistregistration', component: ArtistRegistrationComponent, canActivate: [AuthGuard]},
  { path: 'album/:id', component: AlbumsComponent, canActivate: [AuthGuard]},
];
