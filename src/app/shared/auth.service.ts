import { Injectable, inject, signal } from '@angular/core';
import { Auth, user, signOut } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { RouterService } from './router.service';
import { UserInterface } from '../interface/user';
import { RegisterForm } from '../interface/register';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  constructor(private router: RouterService, private auth: Auth) { }
  
  firebaseAuth = inject(Auth);
  userdata$ = user(this.firebaseAuth);
  // contains all user data. "$" signifies its an observable - it does not have any function of its own but is a convention.

  currentUserSig = signal<UserInterface | null | undefined>(undefined);
  // Can have <> 3 values, undefined by default.
  // We need undefined because we want to avoid any unusual circumstance.



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
