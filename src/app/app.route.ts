import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./Component/login/login.component";
import { SearchComponent } from "./Component/search/search.component";

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
