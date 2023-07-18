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

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      password: ['', Validators.required],
      emeraldAmount: ['', Validators.required],
    });
  }

  submitRegisterForm(): void {
    const companyName = this.registerForm.get('companyName')?.value;
    const password = this.registerForm.get('password')?.value;
    const emeraldAmount = this.registerForm.get('emeraldAmount')?.value;

    this.userService
      .registerUser(companyName, password, emeraldAmount)
      .subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
        },
        error: (error) => {
          console.error('Error registering user:', error);
        },
      });
  }
}
