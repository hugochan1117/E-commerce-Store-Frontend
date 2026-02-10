export interface ProductDtoByPid {
  pid:              number;
  name:             string;
  description:      string;
  productImageList: ProductImageList[];
  price:            number;
  stock:            number;
  category:         string;
  variantType:      string;
  linkedIds:    number[] | null;
  iconVariable: string[] | null;
  variant:      string[] | null;
}

export interface ProductImageList {
  id:       number;
  imageUrl: string;
  pid:      number;
}