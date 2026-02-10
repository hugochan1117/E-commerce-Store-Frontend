import type {CartContextType} from "./CartContext.type.ts";

export interface CartContextArrayType {
  cartContext: CartContextType[] | undefined;
  cartCount: number;
  refreshCart: () => Promise<void>;
}