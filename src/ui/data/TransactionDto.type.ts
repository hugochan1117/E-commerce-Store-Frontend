export interface TransactionDto {
  tid:                               number;
  buyerUid:                          number;
  dateTime:                          Date;
  status:                            string;
  total:                             number;
  transactionProductResponseDtoList: TransactionProductResponseDto[];
}

export interface TransactionProductResponseDto {
  tid:      number;
  product:  Product;
  quantity: number;
  subtotal: number;
}

export interface Product {
  pid:              number;
  name:             string;
  description:      string;
  productImageList: ProductImageList[];
  price:            number;
  stock:            number;
  category:         string;
  variantType:      string;
  linkedIds:        null;
  iconVariable:     null;
  variant:          null;
}

export interface ProductImageList {
  id:       number;
  imageUrl: string;
  pid:      number;
}