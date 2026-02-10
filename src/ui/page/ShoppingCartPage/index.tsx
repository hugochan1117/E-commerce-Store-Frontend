import {useContext, useEffect, useState} from "react";
import {getCartItems} from "../../../api/CartApis.ts";
import {UserContext} from "../../../context/UserContext.tsx";
import type {CartItem} from "../../data/CartItem.type.ts";

import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Paper,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Row, Col} from "react-bootstrap";
import QuantitySelector from "../../SharedComponents/QuantitySelector.tsx";
import {changeCartQuantity} from "../../../api/CartApis.ts";
import type {AxiosError} from "axios";
import {deleteCartItem} from "../../../api/CartApis.ts";
import {CartContext} from "../../../context/CartContext.tsx";
import {createNewTransaction} from "../../../api/TransactionApis.ts";
import {useNavigate} from "@tanstack/react-router";


export default function ShoppingCartPage() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);   // for mutations
  const [isFetching, setIsFetching] = useState(true);  // for initial fetch
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const userData = useContext(UserContext);
  const {refreshCart} = useContext(CartContext);

  const handleCheckOut = async () => {
    setIsLoading(true)
    try {
      const response = await createNewTransaction();
      await navigate({to: `/CheckOutPage/${response.tid}`})
    } catch {
      setErrorMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteCartItem = async (pid: number) => {
    setIsLoading(true);
    try {
      await deleteCartItem(pid);
      await refreshCart()
      const response = await getCartItems();
      setCartItems(response);
    } catch {
      setErrorMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlusOne = async (pid: number, quantity: number) => {
    setIsLoading(true);
    try {
      await changeCartQuantity(pid, quantity + 1);
      await refreshCart();
      const response = await getCartItems();
      setCartItems(response);

    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      if (axiosErr.response?.status === 400) {
        setErrorMessage("Insufficient stock.");
      } else {
        setErrorMessage("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMinusOne = async (pid: number, quantity: number) => {
    setIsLoading(true);
    try {
      await changeCartQuantity(pid, quantity - 1);
      await refreshCart();
      const response = await getCartItems();
      setCartItems(response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      const fetchCartItems = async () => {
          setIsFetching(true);
          try {
            const response = await getCartItems();
            setCartItems(response);
          } finally {
            setIsFetching(false);
          }
        }
      ;
      if (userData) {
        void fetchCartItems();
      }
    }, [userData]
  )
  ;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.cartQuantity,
    0
  );

  return (
    <Container style={{marginTop: "2rem", position: "relative"}}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Shopping Cart
      </Typography>

      {isFetching ? (
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}>
        <CircularProgress/> </Box>) : cartItems.length === 0 ? (
        <Box sx={{
          textAlign: "center",
          mt: 4
        }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Your cart is empty.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate({to: "/"})}
            sx={{mt: 2, fontWeight: "bold"}}
          >
            Back to Home
          </Button>
        </Box>
      ) : (
        <Row className="justify-content-center" style={{marginTop: "1rem"}}>
          <Col xs={12} md={9}>
            <Paper elevation={2} style={{padding: "1rem"}}>
              <List>
                {cartItems.map((item) => (
                  <Box key={item.pid}>
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                        <ListItemAvatar>
                          <Avatar
                            variant="square"
                            src={item.images[0]?.imageUrl}
                            alt={item.name}
                            sx={{width: 64, height: 64}}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight="bold">
                              {item.name}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              ${item.price} × {item.cartQuantity}
                            </Typography>
                          }
                        />
                      </Box>
                      <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                        <QuantitySelector
                          quantity={item.cartQuantity}
                          handleQuantityMinusOne={() =>
                            handleMinusOne(Number(item.pid), item.cartQuantity)
                          }
                          handleQuantityPlusOne={() =>
                            handlePlusOne(Number(item.pid), item.cartQuantity)
                          }
                        />
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteCartItem(Number(item.pid))}
                          disabled={isLoading}
                        >
                          <DeleteIcon/>
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Divider/>
                  </Box>
                ))}
              </List>
            </Paper>
          </Col>

          <Col xs={12} md={3}>
            <Paper elevation={2} style={{padding: "1.5rem"}}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Order Summary
              </Typography>
              <Box sx={{display: "flex", justifyContent: "space-between", mb: 1}}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{display: "flex", justifyContent: "space-between", mb: 1}}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1">Free</Typography>
              </Box>
              <Divider sx={{my: 2}}/>
              <Box sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${subtotal.toFixed(2)}</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{fontWeight: "bold"}}
                onClick={handleCheckOut}
                disabled={isLoading}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Col>
        </Row>
      )}

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
          <CircularProgress/>
        </Box>
      )}

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
      >
        <Alert severity="error" sx={{width: "100%"}}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
