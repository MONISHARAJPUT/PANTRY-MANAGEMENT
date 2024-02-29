import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Items } from 'src/app/item.model';

@Injectable({
    providedIn: 'root',
})
export class ItemService {
    private itemsSubject = new BehaviorSubject<Items[]>([]);
    items$ = this.itemsSubject.asObservable();
    constructor(private http: HttpClient) {}

    items(): Observable<Items> {
        return this.http.get<Items>(`${environment.bffURL}/item`);
    }

    // createItem(
    //     itemName: string,
    //     itemCategory: string,
    //     itemQuantity: number,
    //     itemImage:string,
    //     expiration: string,
    // ) {
    //     const data = { itemName, itemCategory, itemQuantity,itemImage, expiration};
    //     return this.http.post(`${environment.bffURL}/item/create`,data);
    // // return this.http.post('http://localhost:3000/item/create/', data);
    // }
    createItem(itemData: Items): Observable<Items> {
        return this.http.post<Items>(
            `${environment.bffURL}/item/create`,
            itemData
        );
    }
    deleteItem(id: string) {
        return this.http.delete(`${environment.bffURL}/item/delete/${id}`);
        // return this.http.delete('http://localhost:3000/item/delete/' + id + '');
    }

    updateItem(id: string, data: any): Observable<Items> {
        return this.http.put<Items>(
            `${environment.bffURL}/item/update/${id}`,
            data
        );
        // return this.http.put('http://localhost:3000/item/update/' + id + '',data);
    }

    searchItem() {
        return this.http.get(`${environment.bffURL}/item/itemName`);
        // return this.http.delete('http://localhost:3000/item/delete/' + id + '');
    }
}
