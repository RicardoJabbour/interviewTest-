import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private activateRoute: ActivatedRoute,
      ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('isLogedIn') === 'true') {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }, relativeTo: this.activateRoute });
        return false;
    }
}



