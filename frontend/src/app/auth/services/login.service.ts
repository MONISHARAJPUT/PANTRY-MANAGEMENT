import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './auth.model.definition';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(
        public http: HttpClient,
        public auth: AuthService,
        public route: Router
    ) {}

    loginUser(userEmail: string, userPassword: string): Observable<Login> {
        const request = {
            email: userEmail,
            password: userPassword,
        };
        return this.http
            .post<Login>(`${environment.bffURL}/login`, request, {
                responseType: 'json',
            })
            .pipe(
                tap((response: any) => {
                    if (response) {
                        if (response.success === true) {
                            console.log('Success Response: ', response);
                            localStorage.setItem('authToken', response.token);
                        } else {
                            console.log('Error Response: ', response);
                        }
                    } else {
                        console.log('Error');
                    }
                })
            );
    }
    logout() {
        localStorage.removeItem('authToken');
        this.route.navigate(['login']);
    }
}
