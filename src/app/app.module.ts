import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpotifyComponent } from './Components/spotify/spotify.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import { RouterModule } from '@angular/router';
import { UserRoutes } from './app.route';
import { SearchComponent } from './Components/search/search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarRatingModule } from 'angular-star-rating';
import { MatIconModule } from '@angular/material/icon';
import { AlbumsComponent } from './Components/albums/albums.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './guard/auth.guard';
import { LoaderService } from './services/loader.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ArtistRegistrationComponent } from './Components/artist-registration/artist-registration.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Required for datepicker

@NgModule({
  declarations: [
    AppComponent,
    SpotifyComponent,
    LoginComponent,
    SearchComponent,
    AlbumsComponent,
    NavBarComponent,
    ArtistRegistrationComponent,
  ],
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(UserRoutes),
    ReactiveFormsModule,
    StarRatingModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule
  ],
  providers: [
    {
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  AuthGuard,
  LoaderService,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
