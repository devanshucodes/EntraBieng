import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import "./ShopRegister.css";
import Swal from "sweetalert2";
import photo from "../../bh2.webp";
import { useNavigate } from "react-router-dom";

export default function Shopregister(props) {
  const [geo, setGeo] = useState("Click to Get Location");
  const navigate = useNavigate();

  let regActive = true;
  const register = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const passw = document.getElementById("passw").value;
    const cpassw = document.getElementById("cpassw").value;
    const phone = document.getElementById("phone").value;
    const geolocation = document.getElementById("geolocation").value;
    const data = {
      Store_Name: name,
      Email: email,
      Password: passw,
      C_Password: cpassw,
      Mobile_Number: phone,
      Geo_Location: geolocation,
    };
    fetch("http://10.21.84.132:8000/Entrabeing/Store/registration", {
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
          let form = document.getElementById("register");
          form.reset();
          setGeo("Click to Get Location");
          Swal.fire("Account Creation Success!", data["message"], "success");
        });
      }
    });
  };

  const login = () => {
    const login_email = document.getElementById("login_email").value;
    const login_passw = document.getElementById("login_passw").value;
    const login_data = {
      Email: login_email,
      Password: login_passw,
    };
    fetch("http://10.21.84.132:8000/Entrabeing/Store/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login_data),
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

          Swal.fire({
            title: "Login Success!",
            text: data["message"],
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem("token_shop", data["Token"]);
          setTimeout(() => {
            navigate("/shop/dashboard");
          }, 1500);
        });
      }
    });
  };
  const switchTab = () => {
    if (regActive) {
      document.getElementById("register").classList.add("hidden");
      document.getElementById("login").classList.remove("hidden");
      document.getElementsByClassName("nav-item")[1].classList.add("active");
      document.getElementsByClassName("nav-item")[0].classList.remove("active");
      regActive = false;
    } else {
      document.getElementById("register").classList.remove("hidden");
      document.getElementById("login").classList.add("hidden");
      document.getElementsByClassName("nav-item")[1].classList.remove("active");
      document.getElementsByClassName("nav-item")[0].classList.add("active");
      regActive = true;
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token_shop");
    if (token) {
      navigate("/shop/dashboard");
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex" style={{ height: "100%" }}>
        <div className="left-content flex" style={{ alignItems: "flex-end" }}>
          <img src={photo} alt="" srcset="" />
        </div>
        <div className="right-content flex">
          <div className="nav flex">
            <div className="nav-item flex active" onClick={switchTab}>
              Register
            </div>
            <div className="nav-item flex" onClick={switchTab}>
              Login
            </div>
          </div>
          <form className="form flex" id="register">
            <h1 style={{ width: "100%" }}>Sign UP</h1>
            <div className="form-item flex">
              <input type="text" id="name" placeholder=" Store Name" required />
            </div>
            <div className="form-item flex">
              <input type="text" id="email" placeholder="E-Mail" required />
            </div>
            <div className="form-item flex">
              <input
                type="text"
                id="phone"
                placeholder="Mobile Number"
                required
              />
            </div>

            <div className="form-item flex">
              <input
                type="password"
                id="passw"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-item flex">
              <input
                type="password"
                id="cpassw"
                placeholder="Confirm Password"
                required
              />
            </div>

            <div className="form-item flex">
              <input
                type="button"
                id="geolocation"
                value={geo}
                required
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((pos) => {
                      setGeo(`${pos.coords.latitude},${pos.coords.longitude}`);
                    });
                  }
                }}
              />
            </div>
            <div className="form-item flex">
              <input type="button" value="Submit" onClick={register} required />
            </div>
          </form>
          <form
            className="form flex hidden"
            style={{ flexDirection: "column" }}
            id="login"
          >
            <h1 style={{ width: "100%", textAlign: "center" }}>
              Login In to access your Account
            </h1>

            <div className="form-item flex" style={{ width: "100%" }}>
              <input
                type="text"
                id="login_email"
                style={{ width: "97%" }}
                placeholder="E-Mail"
              />
            </div>

            <div className="form-item flex" style={{ width: "100%" }}>
              <input
                type="password"
                id="login_passw"
                style={{ width: "97%" }}
                placeholder="Password"
              />
            </div>

            <div className="form-item flex" style={{ width: "100%" }}>
              <input
                type="button"
                onClick={login}
                style={{ width: "100%" }}
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
