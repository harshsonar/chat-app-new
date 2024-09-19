import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterForm } from '../interface/register';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, concatMap, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  userRegisterAPI: string = 'http://localhost:3000/users/registerUser';

  // Register on database
  userRegister(form: RegisterForm) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.userRegisterAPI, form, { headers });;
  }
}
