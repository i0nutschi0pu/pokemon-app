import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { NgModule } from '@angular/core';
// import { AppComponent } from '../../../app.component';
// import { bootstrapApplication } from '@angular/platform-browser';

// @NgModule({
//   imports: [MenuComponent]
// })

@Component({
  selector: 'app-products-list',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  

  session: { 
    name: string; 
    description: string, 
    price: number, 
    phone: number,
    category: string,
    select: string,
    imageUrl: string
  }[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadData();

    // bootstrapApplication(MenuComponent, {
    //   providers: []
    // });
  }

  loadData()
  {
    let data: any = localStorage.getItem('product');
   // console.log(data);
    data = JSON.parse(data);

    if(data) {
      data.forEach((item: { [x: string]: string; }) => {
    //    console.log(item['name']);
        this.session.push(
          {
            name: item['name'],
            description: item['description'],
            price: Number(item['price']),
            phone: Number(item['phone']),
            category: item['category'],
            select: item['select'],
            imageUrl: item['imageUrl']
          }
        );
    });
    }
    
  }

  coverPhotoPath()
  {
    
  }

}
