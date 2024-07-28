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


  // Register user on database and firebase
  // For registering user, we need to call both functions from auth and user services. Hence, using concatMap()
  register(form: RegisterForm) {
    return this.userRegister(form).pipe(
      concatMap( () => from(this.authService.firebaseRegister(form))),
      catchError(err => {return err})
    );
  }

  // Register on database
  userRegister(form: RegisterForm) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const response = this.http.post(this.userRegisterAPI, form, { headers });
    console.log("db response: ", response);
    
    return response;
  }
}
