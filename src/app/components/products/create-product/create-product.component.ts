import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../../model/product.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product?: Product;
  productAttributes: { 
    name: string; 
    description: string, 
    price: number, 
    phone: number,
    category: string,
    select: string,
    imageUrl: string
  }[] = [];

  cover_photo_for_viewing: any;
  cover_photo_for_upload?: File;

  formDataList = [];

  constructor(
      private fb: FormBuilder
      ) {
  }

  productForm = this.fb.group({
    items: this.fb.array([]) 
  });

  get items(): any
  {
    let productAttributes = this.productForm.get('items') as FormArray;
    return productAttributes;
  }

  ngOnInit(): void 
   {
    this.addItem();
  }

  addItem(): void 
  {
    this.items.push(this.fb.group(
      { 
        name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1000)])],
        description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
        price: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
        phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
        category: ['', Validators.compose([Validators.required])],
        select: ['', Validators.compose([Validators.required])],
        imageUrl: ['', Validators.compose([Validators.required])],
      }
    )) 
  } 

  submit(): void 
  {
    if (Array.isArray(this.productForm.value.items)) {
      console.log(this.productForm.value.items);
      this.productForm.value.items.forEach( (items: any ) => {
        this.productAttributes.push({
          name: items.name,
          description: items.description,
          price: Number((Math.round(items.price * 100) / 100).toFixed(2)),
          phone: items.phone,
          category: items.category,
          select: items.select,
          imageUrl: items.imageUrl
        });
      });
    }

     localStorage.setItem("product", JSON.stringify(this.productAttributes));
     this.resetData();
  }

  resetData(): void 
  {
    this.productForm.reset();
  }

  readUrl(event: any): void 
  {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

      reader.onload = (rdr) => {
        this.cover_photo_for_viewing = reader.result;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.cover_photo_for_upload = event.target.files[0];
    }
  }

}
