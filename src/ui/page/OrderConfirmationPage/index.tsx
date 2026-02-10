import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  Paper,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useSearch, Link } from "@tanstack/react-router";
import { verifyingPayment } from "../../../api/TransactionApis.ts";
import type { TransactionDto } from "../../data/TransactionDto.type.ts";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export default function OrderConfirmationPage() {
  const [payed, setPayed] = useState(false);
  const [transactionDto, setTransactionDto] = useState<TransactionDto>();
  const search = useSearch({ from: "/OrderConfirmationPage/" });
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await verifyingPayment(search.tid.toString());
          setTransactionDto(response);
          setPayed(true);
        } catch (err) {
          console.error("Payment verification failed", err);
        }
      }
    });
    return () => unsubscribe();
  }, [auth, search.tid]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 5, textAlign: "center", borderRadius: 3 }}>
        {!payed ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <CircularProgress size={64} />
            <Typography variant="h5" fontWeight="bold">
              Confirming your payment...
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please do not exit this page while we verify your transaction.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" color="success.main" gutterBottom>
              Payment Confirmed!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Thank you for your purchase 🎉
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              You can view your order in Order History.
            </Typography>
            {transactionDto && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Transaction ID: {transactionDto.tid}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total: ${Number(transactionDto.total).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {transactionDto.status}
                </Typography>
              </Box>
            )}
            <Box sx={{ mt: 3 }}>
              <Button component={Link} to="/" variant="contained" color="primary">
                Back to Home
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
