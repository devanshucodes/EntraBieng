import React, { useState, useEffect } from "react";
import "./Shopdashboard.css";
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
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Typography from "@mui/material/Typography";
import { Toolbar } from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
import store from "../../store.svg";

export function Shopdashboard(props) {
  const navigate = useNavigate();
  const [shopDetails, setShopDetails] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [sideOpen, setSideOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [addProduct, setAddProduct] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [change, DoChange] = useState(false);

  const delProduct = (index) => {
    let token = localStorage.getItem("token_shop");

    const data = {
      Token: token,
      Product_id: index,
      Key: 69,
    };
    fetch("http://10.21.84.132:8000/Entrabeing/Product/delete", {
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
          Swal.fire({
            title: "Product Deleted",
            text: "The product has been successfully deleted!",
            icon: "success",
            confirmButtonText: "Close",
          });
          DoChange(!change);
        });
      }
    });
  };
  const markComplete = (index) => {
    let token = localStorage.getItem("token_shop");

    const data = {
      Token: token,
      Order_id: index,
      Key: 69,
    };
    fetch("http://10.21.84.132:8000/Entrabeing/Store/Order/Status/upd", {
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
          setOrdersOpen(!ordersOpen);
          Swal.fire({
            title: "Marked as Deleted",
            text: "The product has been marked delivered!",
            icon: "success",
            confirmButtonText: "Close",
          });
        });
      }
    });
  };

  const pendingOrder = () => {
    let token = localStorage.getItem("token_shop");

    const data = {
      Token: token,
      Key: 69,
    };
    fetch("http://10.21.84.132:8000/Entrabeing/Store/Order/Status", {
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
          setOrdersOpen(!ordersOpen);
          setPendingOrders(data["Order_data"]);
        });
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token_shop");
    if (token) {
      setAuth(true);
      const fetchShopData = () => {
        const data = {
          Token: token,
          Key: 69,
        };
        fetch("http://10.21.84.132:8000/Entrabeing/Store/home", {
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
              setShopDetails(data["Store_detail"]);
              setProductDetails(data["Product_detail"]);
            });
          }
        });
      };
      fetchShopData();
    }
  }, [change]);
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
            id="addProduct"
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={addProduct}
          >
            <Card
              sx={{ minWidth: 600, minHeight: 300, p: 2 }}
              className="flex column"
            >
              <h1>Add a New Product</h1>
              <Box
                component="form"
                id="newProduct"
                className="flex column"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                  width: "100%",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  id="product_name"
                  label="Product Name"
                  style={{ width: "100%" }}
                />
                <TextField
                  required
                  id="product_price"
                  type="number"
                  label="Product Price"
                  fullWidth
                  style={{ width: "100%" }}
                />
                <TextField
                  required
                  multiline
                  id="product_desc"
                  label="Product Description"
                  rows={5}
                  fullWidth
                  style={{ width: "100%" }}
                />
              </Box>
              <CardActions
                className="flex"
                style={{ justifyContent: "space-between", width: "100%" }}
              >
                <Button
                  onClick={() => {
                    setAddProduct(!addProduct);
                  }}
                  size="normal"
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    let token = localStorage.getItem("token_shop");
                    let p_name = document.getElementById("product_name").value;
                    let p_price =
                      document.getElementById("product_price").value;
                    let p_desc = document.getElementById("product_desc").value;
                    const data = {
                      Product_Name: p_name,
                      Product_Price: p_price,
                      Product_Description: p_desc,
                      Token: token,
                      Key: 69,
                    };
                    fetch(
                      "http://10.21.84.132:8000/Entrabeing/Product/registration",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                      }
                    ).then((res) => {
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
                          let form = document.getElementById("newProduct");
                          form.reset();
                          setAddProduct(!addProduct);
                          Swal.fire({
                            title: "Product Added Successfully!",
                            icon: "success",
                          });
                        });
                        DoChange(!change);
                      }
                    });
                  }}
                  size="normal"
                >
                  Add
                </Button>
              </CardActions>
            </Card>
          </Backdrop>
          <Backdrop
            id="pendingOrders"
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={ordersOpen}
          >
            <Card
              sx={{
                minWidth: 900,
                minHeight: 400,
                justifyContent: "space-between",
              }}
              className="flex column"
            >
              <Typography
                varient="h1"
                sx={{ fontWeight: "bold", fontSize: "8vh", fontFamily: "Teko" }}
              >
                Your Pending Orders
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
                  style={{ justifyContent: "space-between", width: "100%" }}
                >
                  <Typography
                    sx={{
                      color: "text.primary",
                      width: "20%",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "3vh",
                    }}
                  >
                    User Name
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.primary",
                      width: "20%",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "3vh",
                    }}
                  >
                    Product Name
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.primary",
                      width: "10%",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "3vh",
                    }}
                  >
                    Product Price
                  </Typography>

                  <Typography
                    sx={{
                      color: "text.primary",
                      width: "10%",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "3vh",
                    }}
                  >
                    Quantity
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.primary",
                      width: "10%",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "3vh",
                    }}
                  >
                    Total Pay
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.primary",
                      width: "15%",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "3vh",
                    }}
                  >
                    View Directions
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.primary",
                      width: "15%",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "3vh",
                    }}
                  >
                    Mark Completed
                  </Typography>
                </div>
                {pendingOrders.map((order, index) => (
                  <div
                    className="flex"
                    style={{ justifyContent: "space-evenly", width: "100%" }}
                  >
                    <Typography
                      sx={{
                        color: "text.primary",
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      {order["User_name"]}
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.primary",
                        width: "20%",
                        textAlign: "center",
                      }}
                    >
                      {order["Product_name"]}
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.primary",
                        width: "10%",
                        textAlign: "left",
                      }}
                    >
                      ₹{order["Product_price"]}
                    </Typography>

                    <Typography
                      sx={{
                        color: "text.primary",
                        width: "10%",
                        textAlign: "left",
                      }}
                    >
                      {order["quantity"]}
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.primary",
                        width: "10%",
                        textAlign: "left",
                      }}
                    >
                      ₹{order["quantity"] * order["Product_price"]}
                    </Typography>
                    <Button
                      href={`https://www.google.com/maps?q=${order["Geo_loc"]}&h1=es;z=14`}
                      target="_blank"
                      width="15%"
                    >
                      <DirectionsIcon />
                    </Button>
                    <Button
                      target="_blank"
                      width="15%"
                      onClick={() => {
                        markComplete(order["Order_id"]);
                      }}
                    >
                      <AddTaskIcon />
                    </Button>
                  </div>
                ))}
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
                    setOrdersOpen(!ordersOpen);
                  }}
                  size="normal"
                >
                  Close
                </Button>
              </CardActions>
            </Card>
          </Backdrop>
          <Drawer
            open={sideOpen}
            sx={{ p: 2 }}
            PaperProps={{ style: { minWidth: "15%" } }}
          >
            <DrawerHeader>
              <IconButton
                sx={{ mr: "auto", fontSize: "3vh" }}
                onClick={() => {
                  let token = localStorage.getItem("token_shop");
                  const data = {
                    Token: token,
                  };
                  fetch("http://10.21.84.132:8000/Entrabeing/Store/logout", {
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
                        localStorage.removeItem("token_shop");
                        navigate("/shop");
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
              <img src={store} style={{ width: "50%", borderRadius: "50%" }} />
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                  fontFamily: "Josefin Sans",
                  mt: 2,
                }}
              >
                {shopDetails["Store_Name"]}
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
                {shopDetails["Mobile_Number"]}
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
                {shopDetails["Email"]}
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
                <div>
                  <IconButton sx={{ mr: 2 }} onClick={pendingOrder}>
                    <NotificationsActiveIcon />
                  </IconButton>
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
                Products
              </Typography>
              <div
                className="flex row"
                style={{
                  flexWrap: "wrap",
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              >
                <Card
                  sx={{
                    width: 400,
                    height: 250,
                    mt: "2vw",
                    mr: "2vw",
                    boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
                    transition: "0.4s",
                    borderRadius: "25px",
                  }}
                  className="card"
                >
                  <CardActionArea
                    sx={{ height: "100%" }}
                    onClick={() => {
                      setAddProduct(true);
                    }}
                  >
                    <CardContent
                      className="flex column"
                      sx={{ height: "100%" }}
                    >
                      <AddIcon
                        sx={{
                          border: "1px dashed grey",
                          borderRadius: "50%",
                          p: 1,
                          mb: 2,
                          fontSize: "10vh",
                        }}
                      />
                      <Typography
                        varient="h1"
                        color="text.primary"
                        gutterBottom
                        sx={{ fontSize: "4vh" }}
                      >
                        Add Product
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                {productDetails.map((product, productIndex) => (
                  <Card
                    sx={{
                      maxWidth: 400,
                      height: 250,
                      mt: "2vw",
                      mr: "2vw",
                      boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
                      transition: "0.4s",
                      borderRadius: "25px",
                    }}
                    className="card"
                  >
                    <CardActionArea>
                      <Button
                        sx={{ width: "100%" }}
                        onClick={() => {
                          console.log(product);
                          delProduct(product["id"]);
                        }}
                      >
                        Delete
                      </Button>
                    </CardActionArea>
                    <CardContent>
                      <Typography varient="h3" color="text.secondary">
                        Product Name
                      </Typography>
                      <Typography
                        varient="h1"
                        color="text.primary"
                        gutterBottom
                      >
                        {product["Product_Name"]}
                      </Typography>
                      <Typography varient="h3" color="text.secondary">
                        Product Price
                      </Typography>
                      <Typography
                        varient="h2"
                        color="text.primary"
                        gutterBottom
                      >
                        ₹{product["Product_Price"]}
                      </Typography>
                      <Typography varient="h3" color="text.secondary">
                        Description
                      </Typography>
                      <Typography
                        varient="h2"
                        color="text.primary"
                        gutterBottom
                      >
                        {product["Product_Description"]}
                      </Typography>
                    </CardContent>
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
