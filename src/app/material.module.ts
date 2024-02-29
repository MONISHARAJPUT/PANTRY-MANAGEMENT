import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';


// import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
    exports: [
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatToolbarModule,
        MatInputModule,
        MatButtonModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatDialogModule,
        // MatDatepickerModule,
        MatSelectModule,
        MatTooltipModule,
        MatMenuModule,
        MatTableModule,
        // MatDatepickerModule
    ],
})
export class MaterialModule {}
