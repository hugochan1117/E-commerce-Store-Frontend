import axios from "axios";
import type {CartItem} from "../ui/data/CartItem.type.ts";
import {getAccessToken} from "../authService/FirebaseAuthService.ts";
import getEnvConfig from "../config/env/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl;
export async function getCartItems(){
  const response = await axios.get<CartItem[]>(`${baseUrl}/cart/items`,{headers:{
      Authorization: `Bearer ${await getAccessToken()}`
    }
  })
  return response.data;
}

export async function changeCartQuantity(pid:number, quantity:number){
  await axios.patch<CartItem[]>(`${baseUrl}/cart/items/${pid}/${quantity}`,
    null,
    {headers:{
        Authorization: `Bearer ${await getAccessToken()}`
      }})
  return;
}
export async function putItemInCart(pid:number, quantity:number){
  await axios.put<CartItem[]>(`${baseUrl}/cart/items/${pid}/${quantity}`,
    null,
    {headers:{
        Authorization: `Bearer ${await getAccessToken()}`
      }})
  return;
}
export async function deleteCartItem(pid:number){
  await axios.delete<CartItem[]>(`${baseUrl}/cart/items/${pid}`,
    {headers:{
        Authorization: `Bearer ${await getAccessToken()}`
      }})
  return;
}