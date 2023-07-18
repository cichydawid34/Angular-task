import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      password: ['', Validators.required],
      emeraldAmount: ['', Validators.required],
    });
  }

  submitLoginForm(): void {
    const companyName = this.loginForm.get('companyName')?.value;
    const password = this.loginForm.get('password')?.value;

    this.userService.loginUser(companyName, password).subscribe({
      next: (response) => {
        console.log('User logged successfully:', response);
        console.log('Token:', response);
      },
      error: (error) => {
        console.error('Error loggin user:', error);
      },
    });
  }
}
