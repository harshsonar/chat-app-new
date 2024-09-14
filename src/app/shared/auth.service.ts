import { Injectable, inject, signal } from '@angular/core';
import { RouterService } from './router.service';
import { UserInterface } from '../interface/user';
import { RegisterForm } from '../interface/register';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: RouterService) { }

  currentUserSig = signal<UserInterface | null | undefined>(undefined);
  // Can have <> 3 values, undefined by default.
  // We need undefined because we want to avoid any unusual circumstance.


  validatePassword(form: RegisterForm): Observable<boolean> {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    return of(passwordRegex.test(form.password));
  }
}
