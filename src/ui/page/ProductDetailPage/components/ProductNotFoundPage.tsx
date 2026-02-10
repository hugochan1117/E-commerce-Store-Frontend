import { Box, Typography } from "@mui/material";
import NavigationBar from "../../../SharedComponents/NavigationBar";

export default function ProductNotFoundPage() {
  return (
    <>
      <NavigationBar />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "calc(100vh - 64px)", // full viewport minus nav bar height
        }}
      >
        {/* Full-screen stretched image */}
        <img
          src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8NDA0fGVufDB8fDB8fHww"
          alt="Not found"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // ensures it fills without distortion
          }}
        />

        {/* Overlay text in bottom-right */}
        <Box
          sx={{
            position: "absolute",
            bottom: "25%",   // push up from bottom
            right: "15%",     // push in from right
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="h4" color="red">
            Product Not Found...
          </Typography>
        </Box>
      </Box>
    </>
  );
}
