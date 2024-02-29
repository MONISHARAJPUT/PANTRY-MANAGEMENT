import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from './service/item.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    itemsName: any;
    constructor(private router: Router, private itemservice: ItemService) {}
    ngOnInit(): void {
        this.itemservice.items().subscribe((data) => {
            console.log(data);
            this.itemsName = data;
        });
    }

    redirectToSnacks(): void {
        this.router.navigate(['dashboard/snacks']);
    }
    redirectToBeverages(): void {
        this.router.navigate(['dashboard/beverages']);
    }
    redirectToAllitems(): void {
        this.router.navigate(['dashboard/allitems']);
    }
    // redirectToAdditem():void{
    //     this.router.navigate(['dashboard/additem']);
    // }
}
