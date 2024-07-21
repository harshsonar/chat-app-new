import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterForm } from '../interface/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  tempApi: string = 'http://localhost:3000/users/registerUser';

  userRegister(form: RegisterForm): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    let log = this.http.post(this.tempApi, form, {headers});
    
    return log;
  }
}
