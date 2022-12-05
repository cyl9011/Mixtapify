import React from "react";

import { useParams } from "react-router";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./ShoppingCart.css";

import shirts from "../../shared/shirts.js";

const ShoppingCart = () => {
  const { id } = useParams();
  const shirt = shirts.find((shirt) => shirt.name === id);

  return (
    <div>
      <div id="cart">
        <div id="quantity">
          <h3>My Cart</h3>
          <h3 id="itemCount"></h3>
        </div>
        <div id="cartItems">
          <div id="cartItem">
            <div id="cartItemImg"></div>
            <div id="cartItemInfo">
              <h4>Quantity</h4>
              <select id="shirtQuantity">
                <option value="1"> 1 </option>
                <option value="2"> 2 </option>
                <option value="3"> 3 </option>
                <option value="4"> 4 </option>
                <option value="5"> 5 </option>
                <option value="6"> 6 </option>
                <option value="7"> 7 </option>
                <option value="8"> 8 </option>
                <option value="9"> 9 </option>
                <option value="10"> 10 </option>
                <option value="11"> 11 </option>
                <option value="12"> 12 </option>
                <option value="13"> 13 </option>
                <option value="14"> 14 </option>
                <option value="15"> 15 </option>
                <option value="16"> 16 </option>
                <option value="17"> 17 </option>
                <option value="18"> 18 </option>
                <option value="19"> 19 </option>
                <option value="20"> 20 </option>
              </select>
              <h4>Color:</h4>
              <h4>Size:</h4>
              <h4>Price (each):</h4>
              <button>Remove</button>
            </div>
          </div>
        </div>
      </div>
      <div id="order">
        <div id="orderSummary">
          <h3>Order Summary</h3>
          <div id="orderAmounts">
            <h4>Subtotal:</h4> <h4 id="subtotalAmount"></h4>
            <h4>Shipping:</h4> <h4 id="shippingAmount"></h4>
            <h4>Total:</h4> <h4 id="totalAmount"></h4>
            <button>Log in and Checkout</button>
          </div>
          <button>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
