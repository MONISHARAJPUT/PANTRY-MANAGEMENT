import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    isloading: boolean = false;
    opacityLevel: number = 0.5;
    messageAlert: string = '';
    mwAlert: boolean = false;
    loginFormControl = new UntypedFormControl('', [
        Validators.required,
        Validators.email,
    ]);
    durationInSeconds = 5;

    constructor(
        public auth: AuthService,
        public route: Router,
        public loginService: LoginService
    ) {}

    login(userEmail: string, userPassword: string) {
        this.isloading = true;
        this.opacityLevel = 0.5;
        this.loginService.loginUser(userEmail, userPassword).subscribe(
            (val) => {
                console.log('Response', val);
                // if (this.auth.isAuthenticated()) {
                this.route.navigate(['dashboard']);
                //     this.isloading = false;
                //     this.opacityLevel = 1;
                // } else {
                //     this.messageAlert = 'Username or password are not valid';
                //     this.mwAlert = true;
                //     this.opacityLevel = 1;
                //     this.isloading = false;
                // }
            },
            (err: any) => {
                if (err.error.response) {
                    this.messageAlert = err.error.response;
                } else {
                    this.messageAlert = 'No response from server';
                }
                this.mwAlert = true;
                this.opacityLevel = 1;
                this.isloading = false;
            }
        );
    }
}
