import {Link, useNavigate, useParams} from "@tanstack/react-router";
import {useEffect, useState} from "react";
import type {ProductDto} from "../../data/ProductDto.type.ts";
import {getProductsByCategory} from "../../../api/ProductApis.ts";
import NavigationBar from "../../SharedComponents/NavigationBar.tsx";
import {Box, Typography} from "@mui/material";
import ProductGrid from "../../SharedComponents/ProductGrid.tsx";
import LoadingContainer from "../../SharedComponents/LoadingContainer.tsx";

export default function ProductCategoryPage(){
  const navigate = useNavigate({from:"/product/category/$category"})
  const {category} = useParams({from:"/product/category/$category"})
  const [productDtoList, setProductDtoList] = useState<ProductDto[]|undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProductDtoByCategory = async ()=>{
      try{
        const response = await getProductsByCategory(category)
        setProductDtoList(response)
        setIsLoading(false)
      }catch{
        void navigate({to:"/error"});
      }
    }
    void fetchProductDtoByCategory();
  }, [category, navigate]);

  return(
    <Box>
      <NavigationBar/>
      <Box sx={{ pt: 7, pl: 9, display: "flex", alignItems: "center", gap: 1 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }} >
          <Typography sx={{ color: "grey" }}>Home</Typography>
        </Link>
        <Typography>{">"}</Typography>
        <Link to="/product/listingPage" style={{ textDecoration: "none", color: "inherit" }}>
        <Typography sx={{ color: "grey" }}>All Products</Typography>
        </Link>
        <Typography>{">"}</Typography>
        <Typography>{category}</Typography>
      </Box>
      {
        productDtoList && !isLoading ?
          <ProductGrid
            productDto={productDtoList}
            category={category}/>:
          <LoadingContainer
            loadingMessage={"Loading products…"}/>
      }

    </Box>
  )
}