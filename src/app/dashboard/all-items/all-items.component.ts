import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Items } from 'src/app/item.model';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ConfirmComponent } from '../confirm/confirm.component';
import { AdditemComponent } from '../additem/additem.component';
import { CategoryService } from '../service/category.service';
import { Categories } from 'src/app/category.model';
import { MatSelect } from '@angular/material/select';
import { AddComponent } from '../add/add.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-all-items',
    templateUrl: './all-items.component.html',
    styleUrls: ['./all-items.component.scss'],
})
export class AllItemsComponent implements OnInit {
    allitems: Items[] = [];
    allCategories: any[] = [];
    // formData! : FormGroup;
    selectedCategory: string = '';
    editingMap: { [itemId: string]: boolean } = {};
    selectedcard: Items | null = null;
    // expirationDate: Date | null = null;
    minDate: Date;
    maxDate: Date;
    searchName: string = '';
    selectedDeleteCategory: string = '';
    category: Categories[] = [];
    currentlyEditingItemId: string | null = null;



    @ViewChild('categorySelect', { static: true }) categorySelect!: MatSelect;

    validateInput(element: Items): boolean {
        if (
            !element.itemQuantity ||
            isNaN(element.itemQuantity) ||
            element.itemQuantity < 1 ||
            element.itemQuantity > 99
        )
            return true;

        return false;
    }

    containsspl(value: any): boolean {
        return !!(
            (String(value) && String(value).trim() === '') ||
            /[^0-9\s]/.test(value) ||
            /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(value)
        );

        // return /^\d+$/.test(value);  /^[1-9]\d*$/
    }

    haszero(value: any): boolean {
        // return !!(String(value) && String(value).trim() === '' ||   /[0*\s]/.test(value))
        return /^(00|0\s)/.test(String(value).trim());
    }

    hasWhitespace(value: string): boolean {
        if (!value) {
            return false;
        }
        return !!(
            (value && value.trim() === '') ||
            /^\d+$/.test(value) ||
            /[^a-zA-Z0-9\s]/.test(value) ||
            /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(value)
        );
    }

    containsSpecialCharacters(value: any): boolean {
        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    }

    data: any[] = ['itemName', 'itemCategory', 'itemQuantity', 'expiration'];

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private itemservice: ItemService,
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private snackBar: MatSnackBar,
    ) {
        this.minDate = new Date();
        this.minDate.setFullYear(this.minDate.getFullYear() - 1);

        this.maxDate = new Date();
        this.maxDate.setFullYear(this.maxDate.getFullYear() + 3);
    }

    openAddItemDialog(): void {
        const dialogRef = this.dialog.open(AdditemComponent, {
            width: '400px',
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'success') {
                this.itemservice.items().subscribe((data: any) => {
                    console.log(data);
                    this.allitems = data;
                    this.allitems.forEach((item) => {
                        this.editingMap[item._id] = false;
                    });
                    this.getCategories();
                });
            }
        });
    }

    ngOnInit(): void {
        this.itemservice.items().subscribe((data: any) => {
            this.allitems = data;
            this.allitems.forEach((item) => {
                this.editingMap[item._id] = false;
            });
        });
        this.getCategories();
    }

    confirmDelete(item: Items) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: '300px',
            data: { message: 'Are you sure you want to delete this item?' },
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'yes') {
                this.itemservice.deleteItem(item._id).subscribe(
                    () => {
                        // Remove the deleted item from the frontend
                        this.allitems = this.allitems.filter(
                            (i) => i._id !== item._id
                        );
                        console.log('Item deleted successfully');
                    },
                    (error) => {
                        console.error('Error deleting item:', error);
                    }
                );
            }
        });
    }


    toggleEditingMode(itemId: string): void {
        if (!this.currentlyEditingItemId) {
            this.currentlyEditingItemId = itemId;
            this.editingMap[itemId] = true;
        }
    }
    

    save(itemId: string) {
        if (this.currentlyEditingItemId === itemId) {
            this.saveAllEditedFields();
            this.currentlyEditingItemId = null; // Reset Id
        }
    }


    saveAllEditedFields(): void {
        this.allitems.forEach((item) => {
            if (this.editingMap[item._id]) {
                this.updateItemInBackend(item._id, item);
                this.editingMap[item._id] = false;
            }
        });
    }


    // formatDate(dateString: string): string {
    //     const dateObj = new Date(dateString);
    //     if (!isNaN(dateObj.getTime())) {
    //         const day = dateObj.getDate().toString().padStart(2, '0');
    //         const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    //         const year = dateObj.getFullYear().toString();
    //         return `${day}/${month}/${year}`;
    //     }
    //     return dateString;
    // }

    updateItemInBackend(id: string, data: any) {
        this.itemservice.updateItem(id, data).subscribe((response) => {
            console.log('Item updated in backend:', response);
            this.filterItemsByCategory();
            //     this.itemservice.items().subscribe((data:any)=>{
            //       this.allitems = data;
            //       this.allitems.forEach((item) => {
            //         this.editingMap[item._id] = false;
            //      });
            //   },
            // );
        });
    }

    getImageUrl(itemCategory: string): string {
        if (itemCategory === 'Snacks' || itemCategory === 'snacks') {
            return 'https://cdn-icons-png.flaticon.com/128/11247/11247183.png';
        } else if (
            itemCategory === 'Beverages' ||
            itemCategory === 'beverages'
        ) {
            return 'https://cdn-icons-png.flaticon.com/128/4721/4721026.png';
        } else if (itemCategory === 'Juice' || itemCategory === 'juice') {
            return 'https://cdn-icons-png.flaticon.com/128/11520/11520569.png';
        } else if (
            itemCategory === 'Ice cream' ||
            itemCategory === 'ice cream'
        ) {
            return 'https://cdn-icons-png.flaticon.com/128/3198/3198831.png';
        } else if (itemCategory === 'Others' || itemCategory === 'others') {
            return 'https://cdn-icons-png.flaticon.com/128/1941/1941225.png';
        } else if (itemCategory === 'Utensils' || itemCategory === 'utensils') {
            return 'https://cdn-icons-png.flaticon.com/128/894/894483.png';
        } else if (itemCategory === 'Misc' || itemCategory === 'misc') {
            return 'https://cdn-icons-png.flaticon.com/128/3362/3362720.png';
        } else if (
            itemCategory === 'Chocolates' ||
            itemCategory === 'chocolates'
        ) {
            return 'https://cdn-icons-png.flaticon.com/128/2553/2553591.png';
        }
        return 'https://cdn-icons-png.flaticon.com/128/8541/8541407.png';
    }

    getCategories() {
        this.categoryService.getCategories().subscribe((categories) => {
            this.allCategories = categories;
        });
    }

    openCategoryDropdown() {
        this.categorySelect.open();
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
                    this.CategorycreatedSnackbar();
                });
            }
        });
    }
    CategorycreatedSnackbar() {
        this.snackBar.open('Category added successfully', 'OK', {
            duration: 9000,
            panelClass: 'custom-snackbar',
        });
    }

    CategoryDeletedSnackbar() {
        this.snackBar.open('Category deleted', 'OK', {
            duration: 9000,
            panelClass: 'custom-snackbar',
        });
    }

    CategoryItemDeletedSnackbar() {
        this.snackBar.open('Item associated with the category deleted successfully', 'OK', {
            duration: 9000,
            panelClass: 'custom-snackbar',
        });
    }

    confirmDeleteCategory(category: any): void {
        this.getCategories();
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: '300px',
            data: { message: 'Are you sure you want to delete this Category?' },
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Dialog Result:', result);
            if (result === 'yes') {
                const itemsToDelete = this.allitems.filter(
                    (item) => item.itemCategory === category.name
                );
                if (itemsToDelete.length > 0) {
                    // Deleting items one by one
                    itemsToDelete.forEach((item) => {
                        this.itemservice.deleteItem(item._id).subscribe(
                            () => {
                                this.CategoryItemDeletedSnackbar();
                            },
                            (error) => {
                                console.error(
                                    'Error deleting item associated with the category:',
                                    error
                                );
                            }
                        );
                    });
                }
                this.deleteCategory(category);
            }
        });
    }

    private deleteCategory(category: any): void {
        this.categoryService.deleteCategory(category._id).subscribe(
            () => {
                this.allCategories = this.allCategories.filter(
                    (i) => i._id !== category._id
                );
                this.CategoryDeletedSnackbar();
                this.filterItemsByCategory();
                this.getCategories();
            },
            (error) => {
                console.error('Error deleting Category:', error);
            }
        );
    }

    // filterItemsByCategory() {
    //     if (this.selectedCategory === '') {
    //         this.itemservice.items().subscribe((data: any) => {
    //             this.allitems = data;
    //             this.getCategories();
    //         });
    //     } else {
    //         this.itemservice.items().subscribe((data: any) => {
    //             this.allitems = data.filter(
    //                 (item: Items) => item.itemCategory === this.selectedCategory
    //             );
    //         });
    //     }
    // }

    // searchItem() {
    //     this.itemservice.items().subscribe((data: any) => {
    //         this.allitems = data.filter((item: Items) =>
    //             item.itemName
    //                 .toLowerCase()
    //                 .includes(this.searchName.toLowerCase())
    //         );
    //     });
    // }

    filterItemsByCategory() {
        if (this.selectedCategory === '') {
            this.itemservice.items().subscribe((data: any) => {
                this.allitems = data.filter((item: Items) =>
                    item.itemName
                        .toLowerCase()
                        .includes(this.searchName.toLowerCase())
                );
            });
        } else {
            this.itemservice.items().subscribe((data: any) => {
                this.allitems = data.filter(
                    (item: Items) =>
                        item.itemCategory === this.selectedCategory &&
                        item.itemName
                            .toLowerCase()
                            .includes(this.searchName.toLowerCase())
                );
            });
        }
    }
    
    searchItem() {
        this.filterItemsByCategory();
    }
    
    redirectToAdditem(): void {
        this.router.navigate(['dashboard/additem']);
    }
}
