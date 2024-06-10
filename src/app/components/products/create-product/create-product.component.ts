import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../../product.model';
import { ProductService } from '../../../product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product!: Product;
  load_error!: boolean;
  // productForm: FormGroup;
  session: { 
    name: string; 
    description: string, 
    price: number, 
    phone: number,
    category: string,
    select: string,
    imageUrl: string
  }[] = [];

  cover_photo_for_viewing: any = '/assets/emptybowl.jpg';
  cover_photo_for_upload!: File;

  public data!: {
    name: string, 
    description: string, 
    price: number , 
    phone: number, 
    category: string, 
    select: string, 
    imageUrl: string
  };
  public formDataList = [];

  constructor(
      private fb: FormBuilder,
      private productService: ProductService,
      private router: Router) {
    // this.productForm = this.fb.group({
    //   name: ['', Validators.required],
    //   desc: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
    //   price: ['', Validators.compose([Validators.required])],
    //   phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
    //   category: ['', Validators.compose([Validators.required])],
    //   select: ['', Validators.compose([Validators.required])],
    //   imageUrl: ['', Validators.compose([Validators.required])],
    // });
  }

  productForm = this.fb.group({
    items: this.fb.array([]) 
  });

  get items(): any
  {
    let xx = this.productForm.get('items') as FormArray;
    // console.log(xx.controls);
    return xx;
  }

  ngOnInit() {
    this.addItem();
  }

  addItem(){
    this.items.push(this.fb.group(
      { 
        name: ['', Validators.required],
        desc: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
        price: ['', Validators.compose([Validators.required])],
        phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
        category: ['', Validators.compose([Validators.required])],
        select: ['', Validators.compose([Validators.required])],
        imageUrl: ['', Validators.compose([Validators.required])],
      }
    )) 
  } 

  submit()
  {
    console.log(this.productForm.value);

    if (Array.isArray(this.productForm.value.items)) {
      this.productForm.value.items.forEach( (items: any ) => {
        console.log(items.name);
        this.session.push({
          name: items.name,
          description: items.desc,
          price: items.price,
          phone: items.phone,
          category: items.category,
          select: items.select,
          imageUrl: items.imageUrl
        });
        // this.evolutionLevel = details.min_level;
      });
    }

    console.log(this.session);

     localStorage.setItem("product", JSON.stringify(this.session));
     this.resetData();

    

    // let data: any = localStorage.getItem('product');
    // console.log(data);
    // data = JSON.parse(data);
    // console.log(data);
 
    //  if(data) {
    //    data.forEach((item: { [x: string]: string; }) => {
    //     // console.log(item['name']);
    //        this.session.push(
    //        {
    //          name: item['name'],
    //          description: item['description'],
    //          price: Number(item['price']),
    //          phone: Number(item['phone']),
    //          category: item['category'],
    //          select: item['select'],
    //          imageUrl: item['imageUrl']
    //        }
    //      );
    //    });
    //  }else{

    //   if (Array.isArray(this.productForm.value.items)) {
    //     this.productForm.value.items.forEach( (items: any ) => {
    //       console.log(items.name);
    //       this.session.push({
    //         name: items.name,
    //         description: items.desc,
    //         price: items.price,
    //         phone: items.phone,
    //         category: items.category,
    //         select: items.select,
    //         imageUrl: items.imageUrl
    //       });
    //       // this.evolutionLevel = details.min_level;
    //     });
    //   }
    //  }

    //  localStorage.setItem("product", JSON.stringify(this.session));
    //  this.resetData();
  }

  get f() {
    return this.productForm.controls;
  }

  /**
     * Submit form handler
     */
  //  submit(): void {
  //   this.isSubmitted = true;
  //   console.log('form submitted');
  // }
  

  // getBase64Image(img: any) 
  // {
  //   var canvas = document.createElement("canvas");
  //   canvas.width = 100;
  //   canvas.height = 80;

  //   let ctx = canvas.getContext("2d");
  //   if(ctx){
  //     ctx.drawImage(img, 0, 0);
  //   }
    
  //   var dataURL = canvas.toDataURL("image/png");

  //   return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  // }

  // on file select event
  // onFileChange(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.productForm.patchValue({
  //       fileSource: file
  //     });
  //   }
  // }

  // saveProduct(values: any): void{
  //   // const productData = new FormData();
  //   // productData.append('name', values.name);
  //   // productData.append('description', values.desc);
  //   // productData.append('price', values.price);
  //   // productData.append('fileSource', values.file);
  //   console.log(values);

  //   let data: any = localStorage.getItem('product');
  //  console.log(data);
  //   data = JSON.parse(data);
  //  console.log(data);

  //   if(data) {
  //     data.forEach((item: { [x: string]: string; }) => {
  //      // console.log(item['name']);
  //         this.session.push(
  //         {
  //           name: item['name'],
  //           description: item['description'],
  //           price: Number(item['price']),
  //           phone: Number(item['phone']),
  //           category: item['category'],
  //           select: item['select'],
  //           imageUrl: item['imageUrl']
  //         }
  //       );
  //     });
  //   }else{
  //     console.log()
  //     this.session.push({
  //       name: values.name,
  //       description: values.desc,
  //       price: values.price,
  //       phone: values.phone,
  //       category: values.category,
  //       select: values.select,
  //       imageUrl: values.imageUrl
  //     });
  //   }

    
  //   localStorage.setItem("product", JSON.stringify(this.session));
  //   this.resetData();
  // }

  resetData() {
    this.productForm.reset();
  }

  addProductClicked(): void {

  }

  coverPhotoPath() {
  }

  productPath() {
  }

  PhotoUrl(i: number, event: any): void {
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
