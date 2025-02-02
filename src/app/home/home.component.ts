import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ButtonModule } from 'primeng/button';
import { RouterService } from '../shared/router.service';
import { NbLayoutModule, NbListModule, NbUserModule } from '@nebular/theme';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, NbLayoutModule, NbListModule, NbUserModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, private routerService: RouterService) { }

  ngOnInit(): void {}

  currentUserUsername: string | null = null;
  users: { name: string, title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];

  logout() {
    let result = false;

    result = window.confirm("Are you sure you want to logout?");

    if (result) {
      this.routerService.routeToLandingPage();
    }

  }
}
