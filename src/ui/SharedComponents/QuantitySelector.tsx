import { Box, Button, Stack } from "@mui/material";

interface Props {
  quantity: number
  handleQuantityMinusOne: () => void;
  handleQuantityPlusOne: () => void;
}

export default function QuantitySelector({quantity, handleQuantityPlusOne, handleQuantityMinusOne}: Props) {
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="contained"
          size="small"
          onClick={handleQuantityMinusOne}
          sx={{
            minWidth: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4a90e2, #357ab8)',
            color: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            '&:hover': { background: 'linear-gradient(135deg, #357ab8, #2a5d91)' }
          }}
        >
          –
        </Button>

        <Box
          sx={{
            width: 48,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
            backgroundColor: '#f5f5f5',
            color: '#333',
            fontWeight: 600,
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)'
          }}
        >
          {quantity}
        </Box>

        <Button
          variant="contained"
          size="small"
          onClick={handleQuantityPlusOne}
          sx={{
            minWidth: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4a90e2, #357ab8)',
            color: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            '&:hover': { background: 'linear-gradient(135deg, #357ab8, #2a5d91)' }
          }}
        >
          +
        </Button>
      </Stack>


    </>

  )
}
