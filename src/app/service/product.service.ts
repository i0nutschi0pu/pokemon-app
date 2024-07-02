import { Injectable } from '@angular/core';
import { Product } from '../model/product.model'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product?: Product;

  constructor() { }

  createProduct(product: []): void
  {
    localStorage.setItem('product', JSON.stringify(product));
  }
}
