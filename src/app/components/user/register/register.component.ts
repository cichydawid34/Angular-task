import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true;
  registerForm: FormGroup;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      emeraldAmount: [200, [Validators.required, Validators.min(200)]],
    });
  }

  submitRegisterForm(): void {
    const companyName = this.registerForm.get('companyName')?.value;
    const password = this.registerForm.get('password')?.value;
    const emeraldAmount = this.registerForm.get('emeraldAmount')?.value;
    if (this.registerForm.invalid) {
      return;
    }
    this.userService
      .registerUser(companyName, password, emeraldAmount)
      .subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          alert('Succesfully registered');
        },
        error: (error) => {
          console.error('Error registering user:', error);
          for (const key in error.error.errors) {
            if (error.error.errors.hasOwnProperty(key)) {
              const errorMessage = error.error.errors[key].message;
              this.errorMessage = errorMessage;
              alert(errorMessage);
            }
          }
        },
      });
  }
}
