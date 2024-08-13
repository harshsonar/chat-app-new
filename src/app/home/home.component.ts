import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ButtonModule } from 'primeng/button';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatPanelComponent } from './chat-panel/chat-panel.component';
import { RouterService } from '../shared/router.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, ChatListComponent, ChatPanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  constructor(public authService: AuthService, private routerService: RouterService) {}

  ngOnInit(): void {

    this.authService.userdata$.subscribe((user) => {
      if(user) {
        this.authService.currentUserSig.set(
          {
            email: user.email!,
            username: user.displayName!
          }
        );

        this.currentUserUsername = user.displayName;
      }
      else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });

    // The "!" is used when "user.email" will DEFINITELY have a value and to ignore the null error.
  }

  currentUserUsername: string | null = null;

  logout() {
    let result = false;

    result = window.confirm("Are you sure you want to logout?");

    if (result) {
      this.authService.firebaseLogout();
      this.routerService.routeToLandingPage();
    }

  }
}
