import {useEffect, useState} from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import {Link} from "@tanstack/react-router";
import {getSuccessfulTransactions} from "../../../api/TransactionApis.ts"; // <-- your API call
import type {TransactionDto} from "../../data/TransactionDto.type.ts";
import NavigationBar from "../../SharedComponents/NavigationBar.tsx";

export default function OrderHistoryPage() {
  const [transactions, setTransactions] = useState<TransactionDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getSuccessfulTransactions();
        const sorted = response.sort(
          (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
        );
        setTransactions(sorted);
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      } finally {
        setLoading(false);
      }
    };
    void fetchTransactions();
  }, []);


  return (
    <>
      <NavigationBar/>
      <Container maxWidth="md" sx={{mt: 6}}>
        <Paper elevation={4} sx={{p: 4, borderRadius: 3}}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Order History
          </Typography>

          {loading ? (
            <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
              <CircularProgress/>
            </Box>
          ) : transactions.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              You have no past successful transactions.
            </Typography>
          ) : (
            <List>
              {transactions.map((tx) => (
                <Box key={tx.tid}>
                  <ListItemButton>
                    <Link
                      to="/orderDetails"
                      search={{tid: tx.tid}}
                      style={{textDecoration: "none", color: "inherit", width: "100%"}}
                    >
                      <ListItemText
                        primary={`Transaction #${tx.tid}`}
                        secondary={`Total: $${Number(tx.total).toFixed(2)} | Date: ${new Date(tx.dateTime).toLocaleDateString()}`}
                      />
                    </Link>
                  </ListItemButton>
                  <Divider/>
                </Box>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </>
  );
}
