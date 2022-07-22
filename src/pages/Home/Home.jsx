import React from "react";
import "./Home.css";
import photo from "../../hand.png";
import photo1 from "../photo1.png";
import photo2 from "../photo2.png";
import photo3 from "../photo3.png";
import TypeAnimation from "react-type-animation";
import { Navbar } from "../../components/Navbar";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { Helmet } from "react-helmet";

export default function Home(props) {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  return (
    <>
      <Helmet>
        <title>EntraBeing | Home</title>
      </Helmet>
      <Navbar />
      <div className="header flex">
        <div className="flex left-content">
          <h1>Shopping Re-Defined</h1>
          <div className="flex animation">
            <h2 style={{ marginRight: "10px" }}>Shop</h2>
            <TypeAnimation
              sequence={[
                "in 3D",
                2000,
                "with your friends",
                2000,
                "without even leaving your home",
                3000,
              ]}
              cursor={false}
              wrapper="h2"
              className="type"
              repeat={Infinity}
            />
          </div>
          <div className="flex animation">
            <h2 style={{ marginRight: "10px" }}>Buy</h2>
            <TypeAnimation
              cursor={false}
              sequence={[
                "from your local shops",
                3000,
                "from the people you trust",
                3000,
              ]}
              wrapper="h2"
              className="type"
              repeat={Infinity}
            />
          </div>
          <div className="flex animation">
            <TypeAnimation
              sequence={[
                "Cheap prices",
                3000,
                "No share cut",
                3000,
                "Directly shop to your doorstep",
                3000,
              ]}
              cursor={false}
              wrapper="h2"
              className="type"
              repeat={Infinity}
            />
          </div>
        </div>
        <div className="flex right-content">
          <img src={photo} alt="" height="130%" />
        </div>
      </div>
      <div className="border flex">BUILT WITH TRUST</div>
      <div className="cover-container blue flex">
        <div className="right-content flex" id="diff">
          <h3>What makes us</h3>
          <h1>different</h1>
          <h3>from others?</h3>
        </div>
        <div className="left-content flex" id="diff_cards">
          <AutoplaySlider
            play={true}
            cancelOnInteraction={false} // should stop playing on user interaction
            interval={3000}
          >
            <div>
              <img src={photo1} alt="" style={{ width: "100%" }} />
            </div>
            <div>
              <img src={photo2} alt="" style={{ width: "100%" }} />
            </div>
            <div>
              <img src={photo3} alt="" style={{ width: "100%" }} />
            </div>
          </AutoplaySlider>
        </div>
      </div>
    </>
  );
}
