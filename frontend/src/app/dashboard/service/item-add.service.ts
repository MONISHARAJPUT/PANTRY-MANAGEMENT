import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Items } from '../../item.model';

@Injectable({
    providedIn: 'root',
})
export class ItemAddService {
    constructor(private http: HttpClient) {}

    // addItem(item: Items): Observable<Items> {
    //   return this.http.post<Items>(`${environment.bffURL}/item/create`, item);
    // }
}
