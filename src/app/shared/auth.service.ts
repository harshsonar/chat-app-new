import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../interface/user';
import { RegisterForm } from '../interface/register';
import { Observable, of } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private socketService: SocketService) {}

  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  // Validate password locally (No WebSocket needed)
  validatePassword(form: RegisterForm): Observable<boolean> {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    return of(passwordRegex.test(form.password));
  }

  // Login user via WebSocket
  userLogin(form: UserInterface): Observable<any> {
    this.socketService.emitEvent('login', form);
    return this.socketService.listen('login-response');
  }
}
