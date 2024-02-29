import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../service/item.service';
@Component({
    selector: 'app-addphoto',
    templateUrl: './addphoto.component.html',
    styleUrls: ['./addphoto.component.scss'],
})
export class AddphotoComponent implements OnInit {
    itemName!: string;
    selectedFile: File | null = null;

    constructor(
        private router: Router,
        private snackBar: MatSnackBar,
        private http: HttpClient,
        private route: ActivatedRoute,
        private itemService: ItemService
    ) {}
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.itemName = params.itemName;
        });
    }
    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    uploadPhoto() {
        if (this.selectedFile) {
            const formData = new FormData();
            formData.append('photo', this.selectedFile);

            this.http
                .post(
                    `http://localhost:3000/item/${this.itemName}/photo`,
                    formData
                )
                .subscribe((res: any) => {
                    console.log(res.message);
                    console.log('Photo uploaded successfully.');
                    this.router.navigate(['']);
                    this.snackBar.open('Photo uploaded Successfully!', 'OK', {
                        duration: 3000,
                    });
                });
        }
    }
}
