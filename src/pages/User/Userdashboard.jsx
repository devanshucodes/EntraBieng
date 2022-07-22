import React, { useState, useEffect } from "react";
import "./Userdashboard.css";
import Swal from "sweetalert2";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Drawer } from "@mui/material";
import { Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import { Toolbar } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import male from "../../male.svg";
import female from "../../female.svg";
import { Link } from "react-router-dom";

export function Userdashboard(props) {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState("");
  const [shopDetails, setShopDetails] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [sideOpen, setSideOpen] = useState(false);
  const [cartSum, setCartSum] = useState(0);
  const [auth, setAuth] = useState(false);
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [drawOpen, setDrawOpen] = useState(false);

  const addCart = (index) => {
    let cart2 = localStorage.getItem("cart");
    let quantity = document.getElementById(`${index}`).value;
    let product = productDetails[index];
    if (cart2) {
      cart2 = JSON.parse(cart2);
      cart2.push({
        quantity: quantity,
        product_id: product["id"],
        store_id: product["Store"],
        product_name: product["Product_Name"],
        product_price: product["Product_Price"],
        index: index,
      });
      localStorage.setItem("cart", JSON.stringify(cart2));
      setCart(cart2);
    } else {
      let cart2 = [
        {
          quantity: quantity,
          product_id: product["id"],
          store_id: product["Store"],
          product_name: product["Product_Name"],
          product_price: product["Product_Price"],
          index: index,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(cart2));
      setCart(cart2);
    }
  };

  const order = () => {
    let cart2 = JSON.parse(localStorage.getItem("cart"));
    let token = localStorage.getItem("token");
    let data = [];
    cart2.map((item, index) => {
      data.push({
        Store: item["store_id"],
        Product: item["product_id"],
        Quantity: item["quantity"],
      });
    });
    const data2 = {
      Token: token,
      Orders: data,
      Key: 69,
    };
    fetch("http://10.21.84.132:8000/Entrabeing/Store/Order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data2),
    }).then((res) => {
      if (res.status != 200) {
        res.json().then((data) => {
          Swal.fire({
            title: "An Error Occurred!",
            text: data["message"],
            icon: "error",
            confirmButtonText: "Close",
          });
        });
      } else {
        res.json().then((data) => {
          setCartOpen(!cartOpen);
          Swal.fire(
            "Order Successfull!",
            "Order has been placed and will be delivered to you by your local vendor soon!",
            "success"
          );
          localStorage.removeItem("cart");
          setCart([]);
        });
      }
    });
  };
  const fetchProducts = (name) => {
    const data = {
      Email: name,
      Key: 69,
    };
    fetch("http://10.21.84.132:8000/Entrabeing/Store/Product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status != 200) {
        res.json().then((data) => {
          Swal.fire({
            title: "Sorry!",
            text: data["message"],
            icon: "error",
            confirmButtonText: "Close",
          });
        });
      } else {
        res.json().then((data) => {
          console.log(data);
          setProductDetails(data["Product_detail"]);
          setDrawOpen(true);
        });
      }
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
      const fetchUserData = () => {
        const data = {
          Token: token,
          Key: 69,
        };
        fetch("http://10.21.84.132:8000/Entrabeing/User/home", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((res) => {
          if (res.status != 200) {
            res.json().then((data) => {
              Swal.fire({
                title: "An Error Occurred!",
                text: data["message"],
                icon: "error",
                confirmButtonText: "Close",
              });
            });
          } else {
            res.json().then((data) => {
              console.log(data);
              setUserDetails(data["User_detail"]);
              setShopDetails(data["Store_detail"]);
            });
          }
        });
      };
      fetchUserData();
    }
  }, []);
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  const handleSideBar = () => {
    setSideOpen(!sideOpen);
  };
  return (
    <>
      {!auth && (
        <>
          <h1 className="flex" style={{ marginTop: "15vh" }}>
            404 FORBIDDEN
          </h1>
        </>
      )}
      {auth && (
        <>
          <Backdrop
            id="cart"
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={cartOpen}
          >
            <Card
              sx={{
                minWidth: 600,
                minHeight: 300,
                justifyContent: "space-between",
              }}
              className="flex column"
            >
              <Typography
                varient="h1"
                sx={{ fontWeight: "bold", fontSize: "8vh", fontFamily: "Teko" }}
              >
                Your Shopping Cart
              </Typography>
              <CardContent
                sx={{
                  width: "100%",
                  p: "0 16px 0 16px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  className="flex"
                  style={{ justifyContent: "center", width: "100%" }}
                >
                  <Typography
                    sx={{
                      color: "text.primary",
                      width: "40%",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Product Name
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.primary",
                      width: "20%",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Product Price
                  </Typography>

                  <Typography
                    sx={{
                      color: "text.primary",
                      width: "20%",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Quantity
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.primary",
                      width: "20%",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    Total
                  </Typography>
                </div>
                {cart.map((item, index) => (
                  <div
                    className="flex"
                    style={{ justifyContent: "space-between", width: "100%" }}
                  >
                    <Typography
                      sx={{
                        color: "text.primary",
                        width: "40%",
                        textAlign: "center",
                      }}
                    >
                      {item["product_name"]}
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.primary",
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      ₹{item["product_price"]}
                    </Typography>

                    <Typography
                      sx={{
                        color: "text.primary",
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      {item["quantity"]}
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.primary",
                        width: "20%",
                        textAlign: "right",
                      }}
                    >
                      ₹{item["quantity"] * item["product_price"]}
                    </Typography>
                  </div>
                ))}
                <div
                  className="flex"
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    borderTop: "2px dashed grey",
                    margin: "1vh 0",
                    padding: "1vh 0",
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.primary",
                      width: "40%",
                      fontWeight: "bold",
                    }}
                  >
                    You Pay
                  </Typography>
                  <Typography
                    sx={{ color: "text.primary", width: "20%" }}
                  ></Typography>

                  <Typography
                    sx={{ color: "text.primary", width: "20%" }}
                  ></Typography>
                  <Typography
                    sx={{
                      color: "text.primary",
                      width: "20%",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    ₹{cartSum}
                  </Typography>
                </div>
              </CardContent>
              <CardActions
                sx={{
                  width: "100%",
                  boxSizing: "border-box",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => {
                    setCartOpen(!cartOpen);
                  }}
                  size="normal"
                >
                  Continue Shopping
                </Button>
                <Button onClick={order} size="normal" variant="contained">
                  Place Order
                </Button>
              </CardActions>
            </Card>
          </Backdrop>
          <Drawer
            anchor="bottom"
            open={drawOpen}
            PaperProps={{ style: { maxHeight: "70vh" } }}
            onClose={() => {
              setDrawOpen(false);
            }}
          >
            {productDetails.map((product, index) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{product["Product_Name"]}</Typography>
                  <Typography
                    sx={{ color: "text.secondary", marginLeft: "auto" }}
                  >
                    ₹{product["Product_Price"]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: "text.secondary" }} gutterBottom>
                    {product["Product_Description"]}
                  </Typography>
                  <TextField
                    id={`${index}`}
                    defaultValue={1}
                    label="Quantity"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    onChange={(e) => {
                      if (e.target.value < 1 || e.target.value > 20) {
                        e.target.value = 1;
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      addCart(index);
                    }}
                  >
                    Add to Cart
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))}
          </Drawer>

          <Drawer
            variant="persistant"
            open={sideOpen}
            sx={{ p: 2 }}
            PaperProps={{ style: { minWidth: "15%" } }}
          >
            <DrawerHeader>
              <IconButton
                sx={{ mr: "auto", fontSize: "3vh" }}
                onClick={() => {
                  let token = localStorage.getItem("token");
                  const data = {
                    Token: token,
                    Key: 69,
                  };
                  fetch("http://10.21.84.132:8000/Entrabeing/User/logout", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                  }).then((res) => {
                    if (res.status != 200) {
                      res.json().then((data) => {
                        Swal.fire({
                          title: "Sorry!",
                          text: data["message"],
                          icon: "error",
                          confirmButtonText: "Close",
                        });
                      });
                    } else {
                      res.json().then((data) => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("cart");
                        navigate("/user");
                      });
                    }
                  });
                }}
              >
                <LogoutOutlinedIcon /> Logout
              </IconButton>
              <IconButton onClick={handleSideBar}>
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Box className="flex column" sx={{ mt: 2, mb: 2 }}>
              {userDetails["Gender"] === "Male" && (
                <img src={male} style={{ width: "50%", borderRadius: "50%" }} />
              )}
              {userDetails["Gender"] === "Female" && (
                <img
                  src={female}
                  style={{ width: "50%", borderRadius: "50%" }}
                />
              )}

              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                  fontFamily: "Josefin Sans",
                  mt: 2,
                }}
              >
                {userDetails["Name"]}
              </Typography>
              <Typography
                variant="h8"
                noWrap
                component="div"
                color="text.secondary"
                sx={{
                  fontFamily: "Josefin Sans",
                  mb: 0.5,
                }}
              >
                {userDetails["Mobile_Number"]}
              </Typography>
              <Typography
                variant="h8"
                noWrap
                component="div"
                color="text.secondary"
                sx={{
                  fontFamily: "Josefin Sans",
                }}
              >
                {userDetails["Email"]}
              </Typography>
            </Box>

            <Divider />
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 38,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon>
                    <HomeIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: "center",
                      }}
                      fontSize="large"
                    />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 38,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon>
                    <HistoryOutlinedIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: "center",
                      }}
                      fontSize="large"
                    />
                  </ListItemIcon>
                  <ListItemText primary="Past Orders" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <div
            className="flex column"
            style={{
              minHeight: "100%",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              backgroundColor: "#e3f0ff",
            }}
          >
            <AppBar position="static">
              <Toolbar
                disableGutters
                className="flex"
                sx={{ justifyContent: "space-between" }}
              >
                <div className="flex">
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleSideBar}
                    sx={{
                      ml: 2,
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      ml: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    ENTRA BEING
                  </Typography>
                </div>
                <div className="flex">
                  <IconButton
                    sx={{ mr: 2 }}
                    onClick={() => {
                      let sum = 0;
                      cart.map((item) => {
                        sum += item["quantity"] * item["product_price"];
                      });
                      setCartSum(sum);
                      setCartOpen(!cartOpen);
                    }}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                  <Link
                    className="btn"
                    to="/metaverse"
                    style={{ height: "70%", backgroundColor: "#29AB87" }}
                  >
                    METAVERSE
                  </Link>
                </div>
              </Toolbar>
            </AppBar>

            <div
              className="flex column"
              style={{
                padding: " 0 2vw",
                boxSizing: "border-box",
                flexWrap: "wrap",
                width: "100%",
                alignItems: "flex-start",
              }}
            >
              <Typography
                variant="h3"
                noWrap
                sx={{
                  m: 2,

                  fontFamily: "Poppins",
                  fontWeight: 300,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                SHOPS
              </Typography>
              <div
                className="flex row"
                style={{
                  flexWrap: "wrap",
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              >
                {shopDetails.map((shop, shopIndex) => (
                  <Card
                    sx={{
                      minWidth: 275,
                      mt: 2,
                      mr: "2vw",
                      boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
                      transition: "0.4s",
                      borderRadius: "25px",
                    }}
                    onClick={() => {
                      fetchProducts(shop["Email"]);
                    }}
                    className="card"
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography varient="h3" color="text.secondary">
                          Name
                        </Typography>
                        <Typography
                          varient="h1"
                          color="text.primary"
                          gutterBottom
                        >
                          {shop["Store_Name"]}
                        </Typography>
                        <Typography varient="h3" color="text.secondary">
                          Email
                        </Typography>
                        <Typography
                          varient="h2"
                          color="text.primary"
                          gutterBottom
                        >
                          {shop["Email"]}
                        </Typography>
                        <Typography varient="h3" color="text.secondary">
                          Contact Number
                        </Typography>
                        <Typography
                          varient="h2"
                          color="text.primary"
                          gutterBottom
                        >
                          {shop["Mobile_Number"]}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
