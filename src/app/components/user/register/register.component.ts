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
  loading = false;

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
    this.loading = true;
    this.userService
      .registerUser(companyName, password, emeraldAmount)
      .subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          alert('Succesfully registered');
        },
        error: (error) => {
          this.loading = false;
          console.error('Error registering user:', error);
          this.errorMessage = error.error;
          for (const key in error.error.errors) {
            if (error.error.errors.hasOwnProperty(key)) {
              this.errorMessage = error.error.errors[key].msg;
            }
          }
          alert(this.errorMessage);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
