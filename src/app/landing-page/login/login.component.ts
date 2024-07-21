import { Component, inject } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormControl,
         FormGroupDirective,
         NgForm,
         Validators,
         FormsModule,
         ReactiveFormsModule,
         FormBuilder,
         FormGroup, } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../shared/auth.service';
import { RouterService } from '../../shared/router.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, DividerModule, ButtonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor (private authService: AuthService, private router: RouterService) {}

  errorMessage: string | null = null;

  formBuilder = inject(FormBuilder);
  loginForm: FormGroup = this.formBuilder.group({
    email: '',
    password: ''
  });
 
  onSubmit() {
    this.authService
    .firebaseLogin(this.loginForm.value)
    .then(() => {
      this.errorMessage = null;
      this.router.routeToHome();
    })
    .catch((err) => {
      this.errorMessage = err.code;
    });
  }
}
