import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SnacksComponent } from './snacks/snacks.component';
import { BeveragesComponent } from './beverages/beverages.component';
import { AllItemsComponent } from './all-items/all-items.component';
import { AdditemComponent } from './additem/additem.component';
import { AddphotoComponent } from './addphoto/addphoto.component';
import { EdititemComponent } from './edititem/edititem.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';

@NgModule({
    declarations: [
        DashboardComponent,
        SnacksComponent,
        BeveragesComponent,
        AllItemsComponent,
        AdditemComponent,
        AddphotoComponent,
        EdititemComponent,
        ConfirmComponent,
        AddComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
