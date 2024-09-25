import { Injectable, signal } from '@angular/core';
import { RouterService } from './router.service';
import { UserInterface } from '../interface/user';
import { RegisterForm } from '../interface/register';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: RouterService) { }

  currentUserSig = signal<UserInterface | null | undefined>(undefined);
  // Can have <> 3 values, undefined by default.
  // We need undefined because we want to avoid any unusual circumstance.

  userLoginAPI: string = 'http://localhost:3000/loginUser';

  validatePassword(form: RegisterForm): Observable<boolean> {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    return of(passwordRegex.test(form.password));
  }

  userLogin(form: UserInterface) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.userLoginAPI, form, { headers });
  }
}
