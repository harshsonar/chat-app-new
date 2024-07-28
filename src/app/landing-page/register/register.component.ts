import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { inject } from '@angular/core';
import { FormControl,
         FormGroupDirective,
         NgForm,
         Validators,
         ReactiveFormsModule, 
         FormBuilder,
         FormGroup} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../shared/auth.service';
import { RouterService } from '../../shared/router.service';
import { UserService } from '../../shared/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DividerModule, ButtonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor (private authService: AuthService, private userService: UserService, private router: RouterService) {}

  formBuilder = inject(FormBuilder);
  errorMessage: string | null = null;

  registerForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  
  onSubmit() {
    this.userService.register(this.registerForm.value)
    .subscribe({
      next: (res) => {
        window.alert("Account Created!");
      },
      error: (err) => {
        // console.log("Component error " + err);
      }
    });

  }

}
