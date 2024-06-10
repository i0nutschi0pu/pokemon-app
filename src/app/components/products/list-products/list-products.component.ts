import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

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
