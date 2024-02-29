import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Items } from 'src/app/item.model';
import { EdititemComponent } from '../edititem/edititem.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'app-beverages',
    templateUrl: './beverages.component.html',
    styleUrls: ['./beverages.component.scss'],
})
export class BeveragesComponent implements OnInit {
    bevItems: Items[] = [];
    editingMap: { [itemId: string]: boolean } = {};

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private itemservice: ItemService
    ) {}

    ngOnInit(): void {
        this.itemservice.items().subscribe((data: any) => {
            this.bevItems = data.filter(
                (item: any) => item.itemCategory === 'Beverages'
            );
            this.bevItems.forEach((item) => {
                this.editingMap[item._id] = false;
            });
        });
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
                        // Remove the deleted item from the frontend list
                        this.bevItems = this.bevItems.filter(
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
        if (this.editingMap[itemId]) {
            this.saveAllEditedFields();
        } else {
            this.editingMap[itemId] = !this.editingMap[itemId];
        }
    }

    saveAllEditedFields(): void {
        // Loop through the edited items and update them in the backend
        this.bevItems.forEach((item) => {
            if (this.editingMap[item._id]) {
                this.updateItemInBackend(item._id, item);
                this.editingMap[item._id] = false;
            }
        });
    }

    formatDate(date: string): string {
        const parts = date.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${day}/${month}/${year}`;
        }
        return date;
    }

    editItem(ele: any) {
        const dialogRef = this.dialog.open(EdititemComponent, {
            width: '300px',
            data: ele,
        });
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                console.log(res);
                // this.updateBackendItem(res);
                this.updateItemInBackend(ele._id, res);
            }
        });
    }

    updateItemInBackend(id: string, data: any) {
        this.itemservice.updateItem(id, data).subscribe((response) => {
            console.log('Item updated in backend:', response);
        });
    }

    redirectToHome(): void {
        this.router.navigate(['dashboard']);
    }
    redirectToAdditem(): void {
        this.router.navigate(['dashboard/additem']);
    }
}
