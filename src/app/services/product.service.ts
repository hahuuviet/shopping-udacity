import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
// ProductService to handle operations related to products
export class ProductService {
  // URL to the JSON file containing product data
  private url: string = '../../assets/data.json';

  // Constructor to inject the HttpClient service for making HTTP requests
  constructor(private http: HttpClient) { }

  // Method to fetch the list of products from the JSON file
  getProduct(): Observable<Product[]> {
    // Use HttpClient to send a GET request to the specified URL and return an Observable of Product array
    return this.http.get<Product[]>(this.url);
  }
}

