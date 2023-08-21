import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./Components/login/login.component";
import { SearchComponent } from "./Components/search/search.component";

export const UserRoutes: Routes = [
  {
      path: '',
      component: AppComponent,
      children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'search', component: SearchComponent },

      ]
    }

]
