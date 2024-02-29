import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { OrganisationAuthGuard } from './shared/guards/organisation-auth.guard';
import { LoginComponent } from './auth/component/login.component';
import { SnacksComponent } from './dashboard/snacks/snacks.component';
import { BeveragesComponent } from './dashboard/beverages/beverages.component';
import { AllItemsComponent } from './dashboard/all-items/all-items.component';

const routes: Routes = [
    // {
    //     path: 'login',
    //     component:LoginComponent,
    //     canActivate: [OrganisationAuthGuard],
    //     children: [],
    // },

    {
        path: '',
        canActivateChild: [OrganisationAuthGuard],
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: 'dashboard/info',
                component: SnacksComponent,
            },
            {
                path: 'dashboard/beverages',
                component: BeveragesComponent,
            },
            {
                path: 'dashboard/allitems',
                component: AllItemsComponent,
            },
            {
                path: '**',
                component: PageNotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
