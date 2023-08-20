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
@NgModule({
  declarations: [
    AppComponent,
    SpotifyComponent,
    LoginComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(UserRoutes),
    ReactiveFormsModule,
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
