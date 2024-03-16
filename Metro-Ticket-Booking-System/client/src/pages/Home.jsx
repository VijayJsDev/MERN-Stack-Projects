import React from "react";
import metroPic1 from "../assets/metropic1.jpg";
import metroPic2 from "../assets/metropic2.jpg";
import metroPic3 from "../assets/metropic3.jpg";
import "./Home.css";
import { IoTimeOutline } from "react-icons/io5";
import { FaBoltLightning } from "react-icons/fa6";
import { RiSecurePaymentLine } from "react-icons/ri";

function Home() {
  return (
    <>
      <div id="main-tab">
        <h3 id="mmrl-heading">Madurai Metro Rail Limited</h3>
        <img src={metroPic1} id="mmrl-main-image" />
      </div>
      <div className="container-1">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae minus,
          earum dolorum eaque maxime, nulla iusto eos reiciendis fugit assumenda
          voluptatum molestias tempore tempora quisquam? Assumenda nesciunt odit
          ab sunt!
        </p>
        <img src={metroPic2} />
      </div>
      <div className="container-2">
        <img src={metroPic3} />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae minus,
          earum dolorum eaque maxime, nulla iusto eos reiciendis fugit assumenda
          voluptatum molestias tempore tempora quisquam? Assumenda nesciunt odit
          ab sunt!
        </p>
      </div>
      <div className="tabs">
        <div>
          <IoTimeOutline></IoTimeOutline>
          <p>On Time Metro Trains</p>
        </div>
        <div>
          <FaBoltLightning></FaBoltLightning>
          <p>Fast Connectivity Throughout the city</p>
        </div>
        <div>
          <RiSecurePaymentLine></RiSecurePaymentLine>
          <p>Secure Payment On Both Online & Offline</p>
        </div>
      </div>
    </>
  );
}

export default Home;
