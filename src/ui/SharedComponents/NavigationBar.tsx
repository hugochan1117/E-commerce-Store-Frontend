import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Badge,
  TextField,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,   // <-- add spinner
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {Link, useLocation, useNavigate} from "@tanstack/react-router";
import {useState, useRef, useContext, useEffect} from "react";
import {UserContext} from "../../context/UserContext.tsx";
import {signOut} from "../../authService/FirebaseAuthService.ts";
import {CartContext} from "../../context/CartContext.tsx";


export default function NavigationBar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [showSearch, setShowSearch] = React.useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const loginUser = useContext(UserContext);
  const location = useLocation();
  const {cartContext, refreshCart} = useContext(CartContext);
  const cartCount = cartContext ? cartContext.reduce((sum, item) => sum + item.cartQuantity, 0) : 0;
  // Logout dialog state

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [anchorElCategories, setAnchorElCategories] = useState<null | HTMLElement>(null);

  const handleOpenCategories = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCategories(event.currentTarget);
  };
  const handleCloseCategories = () => setAnchorElCategories(null);
  const categories = [
    {label: "WeightLifting", path: "/product/category/Weightlifting"},
    {label: "Calisthenics", path: "/product/category/Calisthenics"},
    {label: "Home gym", path: "/product/category/Home%20gym"},
    {label: "Cardio", path: "/product/category/Cardio"},
    {label: "Fuel & Recovery", path: "/product/category/Fuel%20&%20Recovery"},
  ]

  useEffect(() => {
    void refreshCart();
  }, [location.pathname, refreshCart]);


  const handleSearch = () => {
    if (query.trim() !== "") {
      void navigate({
        to: "/product/search",
        search: {q: query},
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const toggleSearch = () => {
    setShowSearch((prev) => {
      const next = !prev;
      if (!prev && inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 300);
      }
      return next;
    });
  };

  // Logout handlers
  const handleOpenLogoutDialog = () => {
    handleCloseUserMenu();
    setOpenLogoutDialog(true);
  };
  const handleCloseLogoutDialog = () => setOpenLogoutDialog(false);

  const handleConfirmLogout = async () => {
    await signOut();
    setOpenLogoutDialog(false);
  };

  const settings = [
    {
      label: "Order History", onClick: () => {
        void navigate({to: "/OrderHistory"})
      }
    },
    {label: "Logout", onClick: handleOpenLogoutDialog},
  ];

  return (
    <Box>
      <AppBar position="static" sx={{backgroundColor: "#50B1A4"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{display: "flex", justifyContent: "space-between"}}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
            >
              <StorefrontIcon style={{marginRight: 8}}/>
              <Typography
                variant="h6"
                noWrap
                sx={{fontFamily: "monospace", fontWeight: 700, letterSpacing: ".3rem"}}
              >
                STORE
              </Typography>
            </Link>

            <Box sx={{flexGrow: 1, display: "flex", ml: 3}}>
              <Button
                key="Products"
                component={Link}
                to="/product/listingPage"
                sx={{my: 2, color: "white", display: "block"}}
              >
                Products
              </Button>
              <Button
                key="Categories"
                onClick={handleOpenCategories}
                sx={{my: 2, color: "white", display: "block"}}
              >
                Categories
              </Button>
              <Menu
                anchorEl={anchorElCategories}
                open={Boolean(anchorElCategories)}
                onClose={handleCloseCategories}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}> {categories.map((cat) => (
                <MenuItem key={cat.label} onClick={() => {
                  handleCloseCategories();
                  void navigate({to: cat.path});
                }}>
                  {cat.label}
                </MenuItem>))}
              </Menu>
            </Box>

            <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
              <IconButton color="inherit" onClick={toggleSearch}>
                <SearchIcon/>
              </IconButton>
              {
                loginUser === undefined ? (
                  <CircularProgress size={24} color="inherit"/>
                ) : loginUser === null ? (
                  <IconButton color="inherit" onClick={() => {
                    void navigate({to: "/login", search: {redirect: "/ShoppingCart", reason: "access cart"},})
                  }}>
                    <Badge>
                      <ShoppingCartIcon/>
                    </Badge>
                  </IconButton>
                ) : <IconButton color="inherit" onClick={() => {
                  void navigate({to: "/ShoppingCart"})
                }}>
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon/>
                  </Badge>
                </IconButton>
              }


              {/* Right side conditional rendering */}
              {loginUser === undefined ? (
                <CircularProgress size={24} color="inherit"/>
              ) : loginUser === null ? (
                <Button
                  variant="outlined"
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{borderColor: "white", color: "white"}}
                >
                  Login
                </Button>
              ) : (
                <>
                  <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar sx={{bgcolor: "#1976d2", color: "white"}}>
                      {loginUser.email ? loginUser.email.charAt(0).toUpperCase() : "U"}
                    </Avatar>
                  </IconButton>
                  <Menu
                    sx={{mt: "45px"}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                    keepMounted
                    transformOrigin={{vertical: "top", horizontal: "right"}}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.label}
                        onClick={() => {
                          handleCloseUserMenu();
                          setting.onClick();
                        }}
                      >
                        <Typography sx={{textAlign: "center"}}>{setting.label}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Collapse in={showSearch} timeout={400}>
        <Box
          sx={{
            backgroundColor: "#50B1A4",
            p: 2,
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <TextField
            inputRef={inputRef}
            placeholder="Search products..."
            variant="outlined"
            size="small"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              bgcolor: "white",
              borderRadius: 5,
              width: "50%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 5,
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              bgcolor: "white",
              color: "#50B1A4",
              fontWeight: "bold",
              borderRadius: 5,
              "&:hover": {bgcolor: "#f0f0f0"},
            }}
          >
            Search
          </Button>
        </Box>
      </Collapse>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={handleCloseLogoutDialog}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
