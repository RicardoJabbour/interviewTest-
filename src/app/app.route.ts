import { Routes } from "@angular/router";
import { LoginComponent } from "./Components/login/login.component";
import { SearchComponent } from "./Components/search/search.component";
import { AlbumsComponent } from "./Components/albums/albums.component";
import { AuthGuard } from "./guard/auth.guard";

export const UserRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  { path: 'album/:id', component: AlbumsComponent, canActivate: [AuthGuard]},
];
