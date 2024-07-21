import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  constructor(public authService: AuthService) {}

  ngOnInit(): void {

    this.authService.userdata$.subscribe((user) => {
      if(user) {
        this.authService.currentUserSig.set(
          {
            email: user.email!,
            username: user.displayName!
          }
        )
      }
      else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });

    // The "!" is used when "user.email" will DEFINITELY have a value and to ignore the null error.
  }

  result: boolean = false;
  username: string = ""; 

  logout() {

    this.result = window.confirm("Are you sure you want to logout?");

    if (this.result) {
      this.authService.firebaseLogout();
    }
  }
}
