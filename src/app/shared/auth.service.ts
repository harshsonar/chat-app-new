import { Injectable, inject, signal } from '@angular/core';
import { Auth, user, signOut } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { RouterService } from './router.service';
import { UserInterface } from '../interface/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterForm } from '../interface/register';
import { catchError, concatMap, from } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  constructor(private router: RouterService, private auth: Auth, private http: HttpClient) { }
  
  firebaseAuth = inject(Auth);
  userdata$ = user(this.firebaseAuth);
  // contains all user data. "$" signifies its an observable. It does not have any function of its own but is a convention.

  currentUserSig = signal<UserInterface | null | undefined>(undefined);
  // Can have <> 3 values, undefined by default.
  // We need undefined because we want to avoid any unusual circumstance.
  

  tempApi: string = 'http://localhost:3000/users/registerUser';


  userRegister(form: RegisterForm) {
    return this.dbRegister(form).pipe(
      concatMap( () => from(this.firebaseRegister(form))),
      catchError(err => {return err})
    );
  }


  // Register on database
  dbRegister(form: RegisterForm) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const response = this.http.post(this.tempApi, form, { headers });
    console.log("db response: ", response);
    
    return response;
  }

  //Register on Firebase
  firebaseRegister(form: RegisterForm) {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, form.email, form.password)
    .then(  
      (res) => {
        updateProfile(res.user, {displayName: form.username});
        console.log("fb response: ", promise);
      }
    ).catch( () => console.log("fb error in service file") );
    //updateProfile() is for updating username as createUserWithEmailAndPassword() does not contain param to add username
    
    return promise;
  }




  //Login
  firebaseLogin(loginForm: any) {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, loginForm.email, loginForm.password);
    console.log(promise);
    
    return promise;
  }

  //Logout
  firebaseLogout() {
    const promise = signOut(this.firebaseAuth);
    return promise;
  }
}
