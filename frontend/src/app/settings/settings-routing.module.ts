import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Auth0Roles } from '../shared/enums/auth0-roles.enum';
import { RoleAuthGuard } from '../shared/guards/role-auth.guard';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        canActivate: [RoleAuthGuard],
        data: { roles: [Auth0Roles.ADMIN] },
        children: [
            {
                path: '',
                component: SettingsComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
