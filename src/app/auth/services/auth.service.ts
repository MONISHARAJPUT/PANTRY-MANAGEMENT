import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('authToken');
        if (token === 'undefined' || token === null) {
            return false;
        } else {
            const decodeToken = jwtDecode<{ exp: number }>(token);
            if (decodeToken.exp < new Date().getTime()) {
                console.log('Invalid User');
                return false;
            } else {
                console.log('Valid User');
                return true;
            }
        }
    }
}
