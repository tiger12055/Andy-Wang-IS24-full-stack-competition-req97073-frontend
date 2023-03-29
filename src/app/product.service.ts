import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from './product';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productListSubject = new BehaviorSubject<Product[]>([]);
  productList$ = this.productListSubject.asObservable();

  private baseURL = "http://localhost:3000/api/products";

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  private handleError(error: any): Observable<never> {
    this.snackBar.open(`Error: ${error.message}`, 'Close', {
      duration: 5000,
    });
    console.error('API Error:', error);
    return throwError(error);
  }

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseURL}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  createProduct(product: Product): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, product).pipe(
      catchError((error) => this.handleError(error))
    );
  } 

  getProductById(productNumber: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseURL}/${productNumber}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  updateProduct(productNumber: number, updatedProduct: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.baseURL}/${productNumber}`, updatedProduct).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  searchByScrumMaster(name: string): Observable<Product[]> {
    const url = `${this.baseURL}/search/scrum-master?name=${name}`;
    return this.httpClient.get<Product[]>(url);
  }

  searchByDeveloperName(name: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseURL}/search/developer?name=${name}`);
  }

  refreshProductList() {
    this.getProductList().subscribe((products: Product[]) => {
      this.productListSubject.next(products);
    });
  }
}