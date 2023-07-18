import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {
    this.loginForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      password: ['', Validators.required],
      emeraldAmount: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.cookieService.get('jwtToken'));
  }
  submitLoginForm(): void {
    const companyName = this.loginForm.get('companyName')?.value;
    const password = this.loginForm.get('password')?.value;

    this.userService.loginUser(companyName, password).subscribe({
      next: (response) => {
        console.log('User logged successfully:', response);
        this.cookieService.set('jwtToken', response);
      },
      error: (error) => {
        console.error('Error loggin user:', error);
      },
    });
  }
}
