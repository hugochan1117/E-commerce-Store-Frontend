export interface CartItem {
  pid: number;
  name: string;
  images: ProductImage[];
  price: string;
  cartQuantity: number;
  stock: number;
}
export interface ProductImage {
  id: number;
  imageUrl: string;
  pid: number;
}