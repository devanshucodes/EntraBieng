import Home from "./pages/Home";
import Userregister from "./pages/User";
import Shopregister from "./pages/Shop";
import { Userdashboard } from "./pages/User/Userdashboard";
import { Shopdashboard } from "./pages/Shop/Shopdashboard";
import MetaVerse from "./pages/MetaVerse";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/user" exact element={<Userregister />} />
          <Route path="/shop" exact element={<Shopregister />} />
          <Route path="/user/dashboard" exact element={<Userdashboard />} />
          <Route path="/shop/dashboard" exact element={<Shopdashboard />} />
          <Route path="/metaverse" exact element={<MetaVerse />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
