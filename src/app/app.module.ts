import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpotifyComponent } from './Component/spotify/spotify.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Component/login/login.component';
import { RouterModule } from '@angular/router';
import { UserRoutes } from './app.route';
import { SearchComponent } from './Component/search/search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarRatingModule } from 'angular-star-rating';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    SpotifyComponent,
    LoginComponent,
    SearchComponent,
  ],
  imports: [
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
    // MatRippleModule,
  ],
  providers: [
    // {
    // provide:HTTP_INTERCEPTORS,
    // useClass: AuthInterceptor,
    // multi: true
  // }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
