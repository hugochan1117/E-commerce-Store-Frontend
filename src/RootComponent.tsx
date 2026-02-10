import {Outlet} from "@tanstack/react-router";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {useCallback, useEffect, useState} from "react";
import type {UserData} from "./ui/data/UserData.ts";
import {onAuthStateChanged} from "./authService/FirebaseAuthService.ts";
import {UserContext} from "./context/UserContext.tsx";
import {CartContext} from "./context/CartContext.tsx";
import type {CartContextType} from "./ui/data/CartContext.type.ts";
import {getCartItems} from "./api/CartApis.ts";


export default function RootComponent() {
  const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined)
  const [cartContext, setCartContext] = useState<CartContextType[] | undefined>(undefined)

  useEffect(() => {
    onAuthStateChanged(setLoginUser)
  }, []);



  const refreshCart = useCallback(async () => {
    if (loginUser) {
      const response = await getCartItems();
      setCartContext(response);
    } else {
      setCartContext([]);
    }
  }, [loginUser]);



  useEffect(() => {
    const run = async () => {
      await refreshCart();  };
    if (loginUser !== undefined) {
      void run();
    }
    }, [loginUser, refreshCart]
  )
    ;
  const cartCount = cartContext ? cartContext.reduce((sum, i) => sum + i.cartQuantity, 0) : 0;
    return (
      <>
        <UserContext.Provider value={loginUser}>
          <CartContext.Provider value={{cartContext,cartCount, refreshCart}}>
            <Outlet/>
          </CartContext.Provider>
        </UserContext.Provider>
      </>
    )
  }