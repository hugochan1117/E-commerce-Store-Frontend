import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useSearch } from "@tanstack/react-router";
import { getTransactionByTid } from "../../../api/TransactionApis.ts";
import type { TransactionDto } from "../../data/TransactionDto.type.ts";
import NavigationBar from "../../SharedComponents/NavigationBar.tsx";

export default function OrderDetailsPage() {
  const search = useSearch({ from: "/orderDetails/" });
  const [transaction, setTransaction] = useState<TransactionDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await getTransactionByTid(search.tid.toString());
        setTransaction(response);
      } catch (err) {
        console.error("Failed to fetch transaction details", err);
      } finally {
        setLoading(false);
      }
    };
    void fetchTransaction();
  }, [search.tid]);

  return (
    <>
      <NavigationBar/>
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : !transaction ? (
          <Typography variant="body1" color="error">
            Transaction not found.
          </Typography>
        ) : (
          <>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Transaction #{transaction.tid}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Status: {transaction.status}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total: ${Number(transaction.total).toFixed(2)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Date: {new Date(transaction.dateTime).toLocaleString()}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Items
            </Typography>
            <List>
              {transaction.transactionProductResponseDtoList?.map((item) => (
                <ListItem key={item.product.pid}>
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={item.product.productImageList?.[0]?.imageUrl || ""}
                      alt={item.product.name}
                      sx={{ width: 64, height: 64, mr: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.product.name} (x${item.quantity})`}
                    secondary={`Price: $${Number(item.product.price).toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Paper>
    </Container>
    </>
  );
}
