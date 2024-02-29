import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private http: HttpClient) {}

    addCategory(newCategory: string): Observable<any> {
        return this.http.post<Categories>(`${environment.bffURL}/category`, {
            name: newCategory,
        });
    }

    getCategories(): Observable<any> {
        return this.http.get<Categories[]>(
            `${environment.bffURL}/category/categories`
        );
    }

    deleteCategory(id: string) {
        return this.http.delete(`${environment.bffURL}/category/delete/${id}`);
        // return this.http.delete('http://localhost:3000/item/delete/' + id + '');
    }
}
