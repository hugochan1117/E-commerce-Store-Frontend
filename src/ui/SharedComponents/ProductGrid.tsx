import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';
import ProductGridItem from "./ProductGridItem.tsx";
import type {ProductDto} from "../data/ProductDto.type.ts";

interface Props {
  productDto: ProductDto[];
  category: string | undefined;
}

export default function ProductGrid({productDto, category}: Props) {
  return (
    <Fade in={true} timeout={800}>
      <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center', paddingTop: 5, paddingX: 0.5}}>
        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
          {productDto.map((listItem) => (

            <ProductGridItem listItem={listItem}
                             category={category}/>
          ))}
        </Grid>
      </Box>
    </Fade>
  );
}
