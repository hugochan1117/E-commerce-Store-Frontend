import ProductGrid from "../../SharedComponents/ProductGrid.tsx";
import {useEffect, useState} from "react";
import type {ProductDto} from "../../data/ProductDto.type.ts";
import NavigationBar from "../../SharedComponents/NavigationBar.tsx"
import {Box, Typography} from "@mui/material";
import {getAllProduct} from "../../../api/ProductApis.ts";
import LoadingContainer from "../../SharedComponents/LoadingContainer.tsx";
import {Link, useNavigate} from "@tanstack/react-router";
import CategoriesContainer from "../../SharedComponents/CategoriesContainer.tsx";

export function ProductListingPage() {
  const navigate = useNavigate({from: "/"})

  const [productDto, setProductDto] = useState<ProductDto[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProductDto = async () => {
      try {
        const responseData = await getAllProduct();
        setProductDto(responseData)
        setIsLoading(false)
      } catch {
        void navigate({to:"/error"});
      }
    }
    void fetchProductDto();
  }, [navigate]);

  return (
    <Box>
      <NavigationBar/>
      <Box sx={{ pt: 7, pl: 9, display: "flex", alignItems: "center", gap: 1 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }} >
          <Typography sx={{ color: "grey" }}>Home</Typography>
        </Link>
        <Typography>{">"}</Typography>
        <Typography>All Products</Typography>
      </Box>
      <CategoriesContainer/>
      {
        productDto && !isLoading ?
        <ProductGrid
          category={undefined}
          productDto={productDto}/>:
          <LoadingContainer
          loadingMessage={"Loading products…"}/>
      }

    </Box>
  )
}