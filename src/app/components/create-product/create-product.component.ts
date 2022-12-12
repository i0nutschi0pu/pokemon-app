import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../product.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product!: Product;
  load_error!: boolean;
  productForm: FormGroup;
  session: { 
    name: string; 
    description: string, 
    price: number, 
    phone: number,
    category: string,
    select: string,
    file: string
  }[] = [];

  cover_photo_for_viewing: any = '/assets/emptybowl.jpg';
  cover_photo_for_upload!: File;

  constructor(
      private fb: FormBuilder,
      private productService: ProductService,
      private router: Router) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
      price: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      category: ['', Validators.compose([Validators.required])],
      select: ['', Validators.compose([Validators.required])],
      file: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  get f() {
    return this.productForm.controls;
  }

  getBase64Image(img: any) 
  {
    var canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 80;

    let ctx = canvas.getContext("2d");
    if(ctx){
      ctx.drawImage(img, 0, 0);
    }
    
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  // on file select event
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.patchValue({
        fileSource: file
      });
    }
  }

  saveProduct(values: any): void{
    const productData = new FormData();
    productData.append('name', values.name);
    productData.append('description', values.desc);
    productData.append('price', values.price);
    productData.append('fileSource', values.file);
   // console.log(productData);
  //  localStorage.clear();

    let prevEntries: { 
      name: string; 
      description: string; 
      price: number;
      phone: number,
      category: string,
      select: string, 
      file: string
    }[] = [];

    let bannerImage = document.getElementById('bannerImg');
    let imgPath = document.querySelector('input[type=file]');
    if(imgPath){
      imgPath = imgPath;
    }

    let imgData = this.getBase64Image(bannerImage);
   // localStorage.setItem("imgData", imgData);


    let data: any = localStorage.getItem('product');
   // console.log(data);
    data = JSON.parse(data);
   // console.log(data);

    if(data) {
      data.forEach((item: { [x: string]: string; }) => {
       // console.log(item['name']);
        this.session.push(
          {
            name: item['name'],
            description: item['description'],
            price: Number(item['price']),
            phone: Number(item['phone']),
            category: item['category'],
            select: item['select'],
            file: item['file']
          //  file: imgData
          }
        );
    });
    }

    this.session.push(
      {
          name: values.name,
          description: values.desc,
          price: values.price,
          phone: values.phone,
          category: values.category,
          select: values.select,
          //file: values.file
          file: imgData
      }
  );

    localStorage.setItem("product", JSON.stringify(this.session));
  }

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
