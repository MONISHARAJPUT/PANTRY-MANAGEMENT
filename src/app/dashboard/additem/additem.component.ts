import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../service/item.service';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddComponent } from '../add/add.component';
import { CategoryService } from '../service/category.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-additem',
    templateUrl: './additem.component.html',
    styleUrls: ['./additem.component.scss'],
})
export class AdditemComponent implements OnInit {
    addForm!: FormGroup;
    minDate: Date;
    maxDate: Date;
    allCategories: any[] = [];
    itemCategory: string = '';

    hasWhitespace(value: string): boolean {
        if (!value) {
            return false;
        }
        return !!(
            (value && value.trim() === '') ||
            /^\d+$/.test(value) ||
            /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(value)
        );
    }

    containsSpecialCharacters(itemName: string): boolean {
        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(itemName);
    }

    constructor(
        private router: Router,
        private itemService: ItemService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<AdditemComponent>,
        private dialog: MatDialog,
        private categoryService: CategoryService
    ) {
        this.minDate = new Date();
        this.minDate.setFullYear(this.minDate.getFullYear() - 1);
        this.maxDate = new Date();
        this.maxDate.setFullYear(this.maxDate.getFullYear() + 3);
    }

    ngOnInit(): void {
        this.addForm = this.formBuilder.group({
            itemName: ['', [Validators.required, this.customValidator]],
            itemCategory: ['', Validators.required],
            itemImage: [''],
            itemQuantity: [
                '',
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(99),
                    Validators.pattern(/^[1-9]\d*$/),
                    // this.validateItemQuantity,
                ],
            ],
        });
        this.categoryService.getCategories().subscribe((categories) => {
            this.allCategories = categories;
        });
        this.allCategories.forEach((category) => {
            category.deleteChecked = false;
        });
    }

    // createItem() {
    //     if (this.addForm.valid) {
    //         this.itemService.createItem(this.addForm.value).subscribe(
    //             (newItem) => {
    //                 console.log('Item created successfully:', newItem);
    //                 this.ItemSnackbar();
    //                 this.dialogRef.close('success');
    //             },
    //             (error) => {
    //                 console.error('Error creating item:', error);
    //             }
    //         );
    //         this.getCategories();
    //     }
    // }

    createItem() {
        if (this.addForm.valid) {
            this.itemService.createItem(this.addForm.value).subscribe(
                (newItem) => {
                    console.log('Item created successfully:', newItem);
                    this.ItemSnackbar();
                    this.dialogRef.close('success');
                },
                (error) => {
                    console.error('Error creating item:', error);
                    if (error instanceof HttpErrorResponse && error.status === 500) {
                        const errorMessage = error.error.error;
                        if (errorMessage.includes('E11000 duplicate key error collection:')) {
                            this.showDuplicateItemError();
                        }
                    }
                }
            );
            this.getCategories();
        }
    }

    showDuplicateItemError() {
        this.snackBar.open('Item with the same name already exists.', 'OK', {
            duration: 5000,
            panelClass: 'custom-snackbar', 
        });
    }

    getCategories() {
        this.categoryService.getCategories().subscribe((categories) => {
            this.allCategories = categories;
        });
    }

    addCategory() {
        const dialogRef = this.dialog.open(AddComponent, {
            width: '300px',
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.categoryService.addCategory(result).subscribe(() => {
                    this.categoryService.addCategory(result);
                    this.allCategories.push({ name: result });
                    this.addForm.get('itemCategory')?.setValue(result);
                    this.CategorySnackbar();
                });
            }
        });
    }

    toggleDeleteCheckbox(category: any): void {
        this.allCategories.forEach((c) => {
            if (c !== category) {
                c.deleteChecked = false;
            }
        });
        category.deleteChecked = !category.deleteChecked;
    }

    customValidator(control: AbstractControl): ValidationErrors | null {
        const itemName = control.value as string;

        // has space?
        if (itemName.startsWith(' ')) {
            return { startsWithSpace: true };
        }

        // has special characters or emojis?
        if (/[^a-zA-Z0-9\s]/.test(itemName)) {
            return { containsSpecialCharacters: true };
        }

        return null;
    }

    validateItemQuantity(control: AbstractControl): ValidationErrors | null {
        const value = control.value as string;
        if (value.length > 2) {
            return { exceedsMaxLength: true };
        }
        return null;
    }

    allFieldsFilled(): boolean {
        return this.addForm.valid;
    }

    ItemSnackbar() {
        this.snackBar.open('Item added successfully', 'OK', {
            duration: 9000,
            panelClass: 'custom-snackbar',
        });
    }

    CategorySnackbar() {
        this.snackBar.open('Category added successfully', 'OK', {
            duration: 9000,
            panelClass: 'custom-snackbar',
        });
    }

    redirectToallitems(): void {
        this.router.navigate(['dashboard/allitems']);
    }
}
