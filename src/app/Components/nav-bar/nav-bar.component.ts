import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  isLogetIn: boolean = false;
  i:string = '/';

  constructor(
    private router: Router,
  ){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event.url)
        // Route navigation has completed, you can perform actions here
         if(event.url === '/login' || event.url === '/'){
          this.isLogetIn = false;
         }else{
          this.isLogetIn = true;
         }
        // You can check the event.url and perform specific actions based on the route
      }
    });

  }

}
