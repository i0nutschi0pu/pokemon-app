export class Product {
    public id: number;
    public title: string;
    public description: string;
    public category: string; 
    public price: number;  
    public photo: string;
    public phone: number;

    constructor(id: number, title: string, description: string, category: string, price: number,
                 photo: string, phone: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.photo = photo;
        this.phone = phone;
    }

    public static createBlank(): Product {
        return new Product(-1, '', '', '', 1, '', 1);
    }
}