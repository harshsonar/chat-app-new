import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(@Inject(Router) public router: Router) { }

  routeToHome() {
    this.router.navigateByUrl("home");
  }

  routeToLandingPage() {
    this.router.navigateByUrl("");
  }
}
