import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    console.log(this.cookieService.get('jwtToken'));
  }
  submitLoginForm(): void {
    const companyName = this.loginForm.get('companyName')?.value;
    const password = this.loginForm.get('password')?.value;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.loginUser(companyName, password).subscribe({
      next: (response) => {
        console.log('User logged successfully:', response);
        this.cookieService.set('jwtToken', response);
        this.router.navigate(['/']);
        location.reload();
      },
      error: (error) => {
        console.error('Error loggin user:', error);
        this.errorMessage = error.error;
        for (const key in error.error.errors) {
          if (error.error.errors.hasOwnProperty(key)) {
            const errorMessage = error.error.errors[key].msg;
            this.errorMessage = errorMessage;
            alert(errorMessage);
          }
        }
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
