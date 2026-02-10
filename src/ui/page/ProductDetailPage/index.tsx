import { Link, useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { getProductById } from "../../../api/ProductApis.ts";
import { useEffect, useState } from "react";
import NavigationBar from "../../SharedComponents/NavigationBar.tsx";
import LoadingContainer from "../../SharedComponents/LoadingContainer.tsx";
import type { ProductDtoByPid } from "../../data/ProductDtoByPid.type.ts";
import ProductDetailContainer from "./components/ProductDetailsContainer.tsx";
import ErrorPage from "../ErrorPage";
import { Box, Typography } from "@mui/material";

export default function ProductDetailPage() {
  const navigate = useNavigate({ from: "/product/$productId" });
  const { productId } = useParams({ from: "/product/$productId" });
  const [productDto, setProductDto] = useState<ProductDtoByPid | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const search = useSearch({ from: "/product/$productId" }) as { category?: string };
  const category = search.category;

  useEffect(() => {
    const fetchProductByPid = async () => {
      setIsLoading(true); // reset loading state whenever productId changes
      try {
        const response = await getProductById(productId);
        setProductDto(response);
      } catch {
        void navigate({ to: "/error" });
      } finally {
        setIsLoading(false);
      }
    };
    void fetchProductByPid();
  }, [productId, navigate]); // <-- depend on productId so it re-fetches

  return (
    <>
      <NavigationBar />

      <Box sx={{ pt: 7, pl: 9, display: "flex", alignItems: "center", gap: 1 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography sx={{ color: "grey" }}>Home</Typography>
        </Link>
        <Typography>{">"}</Typography>
        <Link to="/product/listingPage" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography sx={{ color: "grey" }}>All Products</Typography>
        </Link>
        <Typography>{">"}</Typography>
        {category ? (
          <Link
            to="/product/category/$category"
            params={{ category }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography sx={{ color: "grey" }}>{category}</Typography>
          </Link>
        ) : (
          productDto?.category && (
            <Link
              to="/product/category/$category"
              params={{ category: productDto.category }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography sx={{ color: "grey" }}>{productDto.category}</Typography>
            </Link>
          )
        )}
        <Typography>{">"}</Typography>
        {productDto?.name && <Typography>{productDto.name}</Typography>}
      </Box>

      {isLoading ? (
        <LoadingContainer loadingMessage="Loading product details..." />
      ) : productDto ? (
        <ProductDetailContainer productDto={productDto} />
      ) : (
        <ErrorPage />
      )}
    </>
  );
}
