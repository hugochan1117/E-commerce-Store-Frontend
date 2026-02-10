export interface ProductDto {
  pid:          number;
  name:         string;
  price:        number;
  hasStock:     boolean;
  categories:   Category[];
  variantType:  string;
  linkedIds:    number[] | null;
  iconVariable: string[] | null;
  variant:      string[] | null;
  images:       Image[];
}

export interface Category {
  id:       number;
  category: string;
  pid:      number;
}

export interface Image {
  id:       number;
  imageUrl: string;
  pid:      number;
}
