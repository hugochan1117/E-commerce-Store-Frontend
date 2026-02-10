import { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Box,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { UserContext } from "../../../context/UserContext.tsx";
import { CartContext } from "../../../context/CartContext.tsx";
import { useParams } from "@tanstack/react-router";
import { getTransactionByTid } from "../../../api/TransactionApis.ts";
import type { TransactionDto } from "../../data/TransactionDto.type.ts";
import type { TransactionProductResponseDto } from "../../data/TransactionDto.type.ts";
import {stripePayment} from "../../../api/TransactionApis.ts";

export default function CheckoutPage() {
  const { tid } = useParams({ from: "/CheckOutPage/$tid" });
  const userData = useContext(UserContext);
  const { refreshCart } = useContext(CartContext);
  const [transaction, setTransaction] = useState<TransactionDto | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const handlePayment = async () => {
    try {
      const response = await stripePayment(tid);
      window.location.replace(response.url);
    } catch (err) {
      console.error("Payment initiation failed", err);
      alert("Unable to start payment. Please try again.");
    }
  };


  useEffect(() => {
    const fetchTransaction = async () => {
      setIsFetching(true);
      try {
        const response = await getTransactionByTid(tid);
        setTransaction(response);
      } finally {
        setIsFetching(false);
      }
    };
    if (userData) {
      void fetchTransaction();
    }
  }, [userData, refreshCart, tid]);

  const subtotal = transaction ? Number(transaction.total) : 0;

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Checkout
      </Typography>

      {isFetching ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <CircularProgress />
        </Box>
      ) : !transaction ? (
        <Typography variant="body1" color="text.secondary">
          No transaction found.
        </Typography>
      ) : transaction.transactionProductResponseDtoList.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <Row className="justify-content-center" style={{ marginTop: "1rem" }}>
          <Col xs={12} md={8}>
            <Paper elevation={2} style={{ padding: "1rem" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, px: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ flex: 2 }}>
                  Product
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ flex: 1, textAlign: "center" }}>
                  Price
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ flex: 1, textAlign: "center" }}>
                  Quantity
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ flex: 1, textAlign: "right" }}>
                  Subtotal
                </Typography>
              </Box>
              <Divider />
              <List>
                {transaction.transactionProductResponseDtoList.map((item: TransactionProductResponseDto) => (
                  <Box key={item.product.pid}>
                    <ListItem sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box sx={{ flex: 2, display: "flex", alignItems: "center", gap: 2 }}>
                        <ListItemAvatar>
                          <Avatar
                            variant="square"
                            src={item.product.productImageList[0]?.imageUrl || ""}
                            alt={item.product.name}
                            sx={{ width: 64, height: 64 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography variant="subtitle1" fontWeight="bold">{item.product.name}</Typography>}
                        />
                      </Box>
                      <Box sx={{ flex: 1, textAlign: "center" }}>
                        <Typography variant="body1">${Number(item.product.price).toFixed(2)}</Typography>
                      </Box>
                      <Box sx={{ flex: 1, textAlign: "center" }}>
                        <Typography variant="body1">{item.quantity}</Typography>
                      </Box>
                      <Box sx={{ flex: 1, textAlign: "right" }}>
                        <Typography variant="body1" fontWeight="bold">
                          ${(Number(item.product.price) * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            </Paper>
          </Col>

          <Col xs={12} md={4}>
            <Paper elevation={2} style={{ padding: "1.5rem" }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Order Summary
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1">Free</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${subtotal.toFixed(2)}</Typography>
              </Box>

              {/* Payment button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePayment}
              >
                Proceed to Payment
              </Button>
            </Paper>
          </Col>
        </Row>
      )}
    </Container>
  );
}
