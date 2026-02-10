import type {ProductDto} from "../ui/data/ProductDto.type.ts";
import axios from "axios";
import getEnvConfig from "../config/env/EnvConfig.ts";
import type {ProductDtoByPid} from "../ui/data/ProductDtoByPid.type.ts";

const baseUrl = getEnvConfig().baseUrl;
export async function getAllProduct(){
  const response = await axios.get<ProductDto[]>(`${baseUrl}/public/products`)
  return response.data;
}


export async function getProductById(productId:string){
  const response = await axios.get<ProductDtoByPid>(`${baseUrl}/public/products/${productId}`)
  return response.data;
}

export async function getProductsByCategory(category:string){
  const response = await axios.get<ProductDto[]>(`${baseUrl}/public/products/category/${category}`)
  return response.data;
}

export async function getSearchProducts(search:string){
  const response = await axios.get<ProductDto[]>(`${baseUrl}/public/products/search/${search}`)
  return response.data;
}
