import { Box } from "@mui/material";
import type { ProductDtoByPid } from "../../../data/ProductDtoByPid.type.ts";
import ProductGallery from "./ProductGallery.tsx";
import ProductDetails from "./ProductDetails.tsx";

interface Props {
  productDto: ProductDtoByPid;
}

export default function ProductDetailContainer({ productDto }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "85%",          // not full width, leaves space on sides
        mx: "auto",            // centers the container horizontally
        pt: 8,                 // padding top
        px: 4,                 // padding left/right
      }}
    >
      {/* Left side gallery */}
      <Box sx={{ width: "50%" }}>
        <ProductGallery images={productDto.productImageList} />
      </Box>

      {/* Right side details */}
      <Box sx={{ width: "50%", pl: 2 }}>
        <ProductDetails
          productDto={productDto}
        />
      </Box>
    </Box>
  );
}
