import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  session: any;

  constructor() { }

  createProduct(product: any)
  {
    localStorage.setItem('session', JSON.stringify(product));
  }
}
