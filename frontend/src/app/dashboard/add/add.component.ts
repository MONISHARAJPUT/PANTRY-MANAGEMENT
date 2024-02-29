import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
    newCategory: string = '';

    constructor(
        public dialogRef: MatDialogRef<AddComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {}
    saveNewCategory() {
        if (this.newCategory.trim() !== '') {
            this.dialogRef.close(this.newCategory.trim());
        }
    }

    cancel() {
        this.dialogRef.close();
    }
}
