import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from './material.module';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { LoginComponent } from './auth/component/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        NavigationComponent,
        PageNotFoundComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        AuthModule.forRoot({
            domain: environment.auth0Domain,
            clientId: environment.auth0ClientId,
            organization: environment.auth0OrganizationId,
            httpInterceptor: {
                allowedList: [{ uri: `${environment.bffURL}*` }],
            },
            useRefreshTokens: true,
            cacheLocation: 'localstorage',
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
