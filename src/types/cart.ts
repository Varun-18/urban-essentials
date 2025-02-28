export interface CartItem {
    id: string;
    qty: number;
    price: number;
}

export interface CartInterface {
    email: string;
    items: CartItem[];
}