import {createContext} from "react";
import type {CartContextArrayType} from "../ui/data/CartContextArrayType.ts";

export const CartContext = createContext<CartContextArrayType>({
  cartContext:[],
  cartCount:0,
  refreshCart: async () => {},
  })