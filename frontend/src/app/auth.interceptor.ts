import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (request.url.includes(environment.bffURL)) {
            return from(this.authService.getAccessTokenSilently()).pipe(
                switchMap((token) => {
                    console.log("Access token : ",token)
                    const authorizedRequest = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return next.handle(authorizedRequest);
                })
            );
        }
        return next.handle(request);
    }
}