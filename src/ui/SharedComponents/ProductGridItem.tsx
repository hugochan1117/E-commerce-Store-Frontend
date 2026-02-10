import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import type {ProductDto} from "../data/ProductDto.type.ts";

import {Link} from "@tanstack/react-router";

interface Props {
  listItem: ProductDto
  category: string | undefined;
}

export default function ProductGridItem({listItem, category}: Props) {
  return (
    <Link to={"/product/$productId"} params={{productId: listItem.pid.toString()}}
          search={{ category: category }}
          style={{ textDecoration: "none", color: "inherit", }}>

      <Card
        sx={{
          width: 260,
          height: 350,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardMedia
          component="img"
          sx={{height: 180, objectFit: 'contain'}} // or 'cover'
          image={listItem.images[0].imageUrl}
          alt={listItem.name}
        />

        <CardContent sx={{flexGrow: 1}}>
          <Typography gutterBottom variant="subtitle1" component="div" fontWeight="bold">
            {listItem.name}
          </Typography>
          <Typography variant="body1" sx={{color: 'text.secondary'}}>
            Price: ${listItem.price.toLocaleString()}
          </Typography>
          {listItem.hasStock ? (
            <Typography variant="body1" sx={{color: 'green'}}>In Stock</Typography>
          ) : (
            <Typography variant="body1" sx={{color: 'red'}}>Out of stock</Typography>
          )}
        </CardContent>

      </Card>
    </Link>

  );
}
