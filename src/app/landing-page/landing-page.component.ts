import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RegisterComponent, LoginComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userdata$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set(
          {
            email: user.email!,
            username: user.displayName!
            // We are using "!" as we know it wont be null/empty. Because we already have put condition "if(user)"
          }
        )
      }
      else {
        this.authService.currentUserSig.set(null);
      }
    });
  }
}
