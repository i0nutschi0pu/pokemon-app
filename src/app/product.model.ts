export class Product {
    public id: number;
    public title: string;
    public description: string;
    public category: string; 
    public price: number;  
    public photo: string;
    public phone: number;

    constructor(id: number, t: string, d: string, c: string, price: number,
                 photo: string, phone: number) {
        this.id = id;
        this.title = t;
        this.description = d;
        this.category = c;
        this.price = price;
        this.photo = photo;
        this.phone = phone;
    }
}