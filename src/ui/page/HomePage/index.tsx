import { Button, Typography, Box } from "@mui/material";
import NavigationBar from "../../SharedComponents/NavigationBar.tsx";
import { Link } from "@tanstack/react-router";

export default function HomePage() {
  return (
    <>
      <NavigationBar />

      {/* Hero section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "92vh",
          overflow: "hidden",
        }}
      >
        <img
          src="https://supplymaster.store/cdn/shop/collections/desktop-wallpaper-dumbbells-weight-a-healthy-lifestyle-sports-equipment-fitness-equipment_1.jpg?v=1681978125&width=1296"
          alt="cropped"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Overlay content */}
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "150px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              fontWeight: 700,
              textShadow: "0 2px 6px rgba(0,0,0,0.6)",
              background: "rgba(0,0,0,0.4)",
              padding: "8px 16px",
              borderRadius: 2,
            }}
          >
            Shop for the best fitness accessories!
          </Typography>

          <Link to="/product/listingPage">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#50B1A4",
                color: "#fff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                borderRadius: 3,
                width: 220,
                height: 56,
                fontWeight: 600,
                letterSpacing: ".05rem",
                textTransform: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#3d8f84",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.35)",
                  transform: "translateY(-2px)",
                },
              }}
              startIcon={<span style={{ fontSize: "1.2rem" }}>🛒</span>}
            >
              Browse All Products
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
