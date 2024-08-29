class Product {
    id: number;
    name: string;
    currency: string;
    price: number;
    stock: number;
    image: string;
    constructor(id: number, name: string, currency: string, price: number, stock: number, image: string) {
        this.id = id;
        this.name = name;
        this.currency = currency;
        this.price = price;
        this.stock = stock;
        this.image = image;
    }
}

export default Product;