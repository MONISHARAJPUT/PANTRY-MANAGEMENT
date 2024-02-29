import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-snacks',
  templateUrl: './snacks.component.html',
  styleUrls: ['./snacks.component.scss'],
})
export class SnacksComponent implements OnInit {
  allitems: any[] = [];

  constructor(
    private router: Router,
    private itemservice: ItemService
  ) {}

  totalCostOfAllItems: number = 0; 

ngOnInit(): void {
  this.itemservice.items().subscribe((data: any) => {
    this.allitems = data.map((item: any) => { 
      item.customCost = 25; 
      item.totalCost = item.itemQuantity * item.customCost;
      this.totalCostOfAllItems += item.totalCost;
      return item;
    });
  });
}

  redirectToAllitems(): void {
    this.router.navigate(['dashboard/allitems']);
  }
}
