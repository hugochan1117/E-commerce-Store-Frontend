import {useEffect, useState} from "react";
import {Link, useNavigate, useSearch} from "@tanstack/react-router";
import {Box, Typography} from "@mui/material";
import ProductGrid from "../../SharedComponents/ProductGrid.tsx";
import {getSearchProducts} from "../../../api/ProductApis.ts";
import type {ProductDto} from "../../data/ProductDto.type.ts";
import NavigationBar from "../../SharedComponents/NavigationBar.tsx"
import SearchOffIcon from "@mui/icons-material/SearchOff";

export default function SearchPage(){
  const navigate = useNavigate({from:"/product/search"})
  const { q } = useSearch({from:"/product/search"})
  const [productDtoList, setProductDtoList] = useState<ProductDto[]|undefined>(undefined)

  useEffect(() => {
    const fetchSearchProductDtoList = async () => {
      try {
        const response = await getSearchProducts(q ?? "");
        setProductDtoList(response)
      } catch {
        await navigate({to: "/error"})
      }
    }
    void fetchSearchProductDtoList();
  }, [q, navigate]);

  return(
    <>
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
        <Typography>Search Results for: {q}</Typography>
      </Box>
      {
        productDtoList &&
        (productDtoList.length==0 ? <Box sx={{ textAlign: "center", mt: 10 }}>
            <SearchOffIcon sx={{ fontSize: 60, color: "grey.500" }} />
            <Typography variant="h5" sx={{ mt: 2 }}>
              No products found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or browse all products.
            </Typography>
          </Box>:
          <ProductGrid productDto={productDtoList} category={undefined}/>)
      }

    </>
  )
}