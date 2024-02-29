import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SnacksComponent } from './snacks/snacks.component';
import { BeveragesComponent } from './beverages/beverages.component';
import { AllItemsComponent } from './all-items/all-items.component';
import { AdditemComponent } from './additem/additem.component';
import { EdititemComponent } from './edititem/edititem.component';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [
    {
        path: '',
        component: AllItemsComponent,
    },
    {
        path: 'aboutus',
        component: SnacksComponent,
    },
    {
        path: 'beverages',
        component: BeveragesComponent,
    },
    {
        path: 'allitems',
        component: AllItemsComponent,
    },
    {
        path: 'additem',
        component: AdditemComponent,
    },
    {
        path: 'edititem',
        component: EdititemComponent,
    },
    {
        path: 'confirm',
        component: ConfirmComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
