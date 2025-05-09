import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterForm } from '../interface/register';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private socketService: SocketService) { }

  // Register user via WebSocket
  userRegister(form: RegisterForm): Observable<any> {
    this.socketService.emitEvent('register', form);
    return this.socketService.listen('register-response');
  }
}
