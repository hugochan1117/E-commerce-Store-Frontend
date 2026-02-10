import {Box, Typography, Button, Stack, Alert, Snackbar, CircularProgress} from "@mui/material";
import type {ProductDtoByPid} from "../../../data/ProductDtoByPid.type.ts";
import QuantitySelector from "../../../SharedComponents/QuantitySelector.tsx";
import {useContext, useState} from "react";
import ColourVariantBox from "./ColourVariantBox.tsx";
import {Link, useNavigate} from "@tanstack/react-router";
import WeightVariantBox from "./WeightVariantBox.tsx";
import {putItemInCart} from "../../../../api/CartApis.ts";
import {UserContext} from "../../../../context/UserContext.tsx";
import {CartContext} from "../../../../context/CartContext.tsx";
import type {AxiosError} from "axios";

interface Props {
  productDto: ProductDtoByPid;
}

export default function ProductDetails({productDto}: Props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [quantity, setQuantity] = useState(1);
  const loginUser = useContext(UserContext);
  const {refreshCart } = useContext(CartContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasVariants =
    !!productDto.variantType &&
    !!productDto.variant?.length &&
    !!productDto.linkedIds?.length;

  const variantType = (productDto.variantType ?? "").trim();
  const handleAddToCart = async ()=>{
    setIsLoading(true)
    try {
      if (productDto && loginUser) {
        await putItemInCart(productDto.pid, quantity)
        await refreshCart();
      }
    }catch (err: unknown) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        if (axiosErr.response?.status === 400) {
          setErrorMessage("Insufficient stock. Already in cart");
        } else {
          setErrorMessage("Something went wrong");
        }
      }finally{
      setIsLoading(false)
    }

  }

  const handleQuantityMinusOne = () => {
    if (quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    }
  };

  const handleQuantityPlusOne = () => {
    if (productDto && quantity < productDto.stock) {
      setQuantity((prevState) => prevState + 1);
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{fontWeight: "bold"}}>
        <br/>
        {productDto.name}
      </Typography>

      <Typography variant="h6">HK${productDto.price}</Typography>

      {productDto.stock === 0 ? (
        <Box sx={{borderRadius: 1, bgcolor: "red", width: "100%", textAlign: "center", color: "white", p: 0.5}}>
          Out of Stock
        </Box>
      ) : productDto.stock < 6 ? (
        <Box sx={{borderRadius: 1, bgcolor: "green", width: "100%", textAlign: "center", color: "white", p: 0.5}}>
          In Stock (Only {productDto.stock} left...)
        </Box>
      ) : (
        <Box sx={{borderRadius: 1, bgcolor: "green", width: "100%", textAlign: "center", color: "white", p: 0.5}}>
          In Stock
        </Box>
      )}



      {hasVariants && (
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          {variantType === "Colour" &&
            productDto.variant!.map((_p, index) => {
              const isSelected = productDto.linkedIds?.[index] === productDto.pid;
              const pid = productDto.linkedIds?.[index]?.toString() ?? "";
              const color = `#${productDto.iconVariable?.[index] ?? "000000"}`;

              return isSelected ? (
                <ColourVariantBox
                  key={index}
                  color={color}
                  isSelected
                  tooltip={productDto.variant?.[index] ?? ""}
                />
              ) : (
                <Link
                  key={index}
                  to="/product/$productId"
                  params={{ productId: pid }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ColourVariantBox
                    color={color}
                    isSelected={false}
                    tooltip={productDto.variant?.[index] ?? ""}
                  />
                </Link>
              );
            })}

          {variantType === "Weight" &&
            productDto.variant!.map((_p, index) => {
              const isSelected = productDto.linkedIds?.[index] === productDto.pid;
              const pid = productDto.linkedIds?.[index]?.toString() ?? "";
              const weight = productDto.variant?.[index] ?? "?";

              return isSelected ? (
                <WeightVariantBox key={index} weight={weight} isSelected />
              ) : (
                <Link
                  key={index}
                  to="/product/$productId"
                  params={{ productId: pid }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <WeightVariantBox weight={weight} isSelected={false} />
                </Link>
              );
            })}
        </Box>
      )}




      <Typography>
        Description: <br/>
        {productDto.description}
      </Typography>

      <Stack direction="row" spacing={2}>
        <QuantitySelector
          quantity={quantity}
          handleQuantityMinusOne={handleQuantityMinusOne}
          handleQuantityPlusOne={handleQuantityPlusOne}
        />
        <Button
          variant="contained"
          size="medium"
          disabled={productDto.stock <= 0}
          onClick={
            loginUser
              ? async () => {
                await handleAddToCart();
              }
              : () => {
                navigate({
                  to: "/login",
                  search: {
                    redirect: `/product/${productDto.pid}`,
                    reason: "access cart",
                  },
                });
              }
          }
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            background: "linear-gradient(135deg, #4a90e2, #357ab8)",
            color: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(135deg, #4a90e2, #357ab8)",
              boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
            },
          }}
        >
          Add to Cart
        </Button>

      </Stack>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(255,255,255,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
