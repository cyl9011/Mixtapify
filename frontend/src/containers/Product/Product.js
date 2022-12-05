import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./Product.css";

import appRoutes from "../../shared/appRoutes.js";

import { Link } from "react-router-dom";

import { Col } from "reactstrap";

import shirts from "../../shared/shirts.js";



import detail from "../Detail/Detail.js";

const Product = () => {
  return (
    <div>
      <h2 id="productHeader">Our T-Shirts</h2>
      <div className="products"></div>
      {/* Map default shirts.js to html */}
      {shirts.map((shirt) => (
        <Col
          key={shirt.name}
          tag={Link}
          to={`${appRoutes.product}/${shirt.name}`}
        >
          <div className="product">
            <div className="product-images">
              <img src={shirt.colors.white.front} alt={shirt.name} />
            </div>
            <h3>{shirt.name}</h3>
            <p>Available in {Object.keys(shirt.colors).length} colors</p>
            <div className="productButton">
              <button>See Page</button>
            </div>
          </div>
        </Col>
      ))}
    </div>
  );
};

export default Product;
