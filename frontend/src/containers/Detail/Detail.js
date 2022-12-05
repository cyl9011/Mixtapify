import React, { useState, useRef, useEffect } from "react";

import ReactDOM from "react-dom";

import { useParams } from "react-router";

import "./Detail.css";
import shirts from "../../shared/shirts.js";

import { App } from "../../App";

// get state from App.js
//const Detail = ({createNewShirt}) => {

const Detail = () => {

  const { id } = useParams();
  const shirt = shirts.find((shirt) => shirt.name === id);
  var shirtId = shirt.name;
  var shirtColor = "white";
  var shirtSide = "front";

  const shirtRef = useRef();

  var [color, setColor] = useState("white");
  var [side, setSide] = useState("front");
  var [quantity, setQuantity] = useState("1");
  var [size, setSize] = useState("size");
  const [isDisabled, setDisabled] = useState(true);

  function changeColor(color) {
    setColor(color);

    console.log(color);

    shirtColor = color;
    shirtSide = side;

    var shirtPreview = document.getElementById("shirtPreview");
    shirtPreview.src = shirt.colors[shirtColor][shirtSide];

    return shirtColor;
  }

  function changeSide(side) {
    setSide(side);

    console.log(side);

    shirtSide = side;
    shirtColor = color;

    var shirtPreview = document.getElementById("shirtPreview");
    shirtPreview.src = shirt.colors[shirtColor][shirtSide];

    return shirtSide;
  }

  const changeQuantity = (e) => {
    var shirtQuantity = document.getElementById("shirtQuantity").value;

    console.log(shirtQuantity);

    setQuantity(shirtQuantity);

    quantity = shirtQuantity;

    return quantity;
  };

  const changeSize = (e) => {
    var shirtSize = document.getElementById("shirtSize").value;

    console.log(shirtSize);

    setSize(shirtSize);

    size = shirtSize;

    if (size !== "size") {
      document.getElementById("addToCart").disabled = false;
      setDisabled(false);
    } else {
      document.getElementById("addToCart").disabled = true;
    }

    return size;
  };

  const addToCart = (e) => {
    //console.log("Add to cart");
    // send shirt info to ShoppingCart.js
    //setCart([...cart, [id, shirtColor, shirtSide, quantity, size]]);
    //console.log("cart: " + cart);
    /*
    console.log("id: " + id);
    console.log("shirtColor: " + shirtColor);
    console.log("shirtSide: " + shirtSide);
    console.log("quantity: " + quantity);
    console.log("size: " + size);
     */

    console.log([shirtId, shirtColor, shirtSide, quantity, size]);

    // send to ShoppingCart.js
    //setCartItems([...cartItems, [shirtId, shirtColor, shirtSide, quantity, size]]);

    //createNewShirt([shirtId, shirtColor, shirtSide, quantity, size]);
    return [shirtId, shirtColor, shirtSide, quantity, size];
  };

  return (
    <div>
      <h1>{shirt.name}</h1>
      <div className="details">
        <div id="shirtPicture">
          <img
            ref={shirtRef}
            id="shirtPreview"
            className="shirtImg"
            src={shirt.colors[shirtColor][shirtSide]}
            alt={shirt.name}
          />
        </div>
        <div id="shirtDescription">
          <h3>{shirt.price}</h3>
          <p>{shirt.description}</p>
          <div id="shirtSelectors">
            <div>
              <h4>
                <b> Side: </b>
                <button onClick={() => changeSide("front")}>Front</button>
                <button onClick={() => changeSide("back")}>Back</button>
              </h4>
              <h4>
                Color: {/* create buttons for each color if in json */}
                {Object.keys(shirt.colors).map((color) => (
                  <button
                    key={color}
                    id="colorButton"
                    onClick={() => changeColor(color)}
                    style={{ backgroundColor: color }}
                  >
                    {color}
                  </button>
                ))}
                {/* swap image on button press */}
              </h4>
              <h4>{/*dropdown menu from 1-20*/}</h4>

              <b>Quantity: </b>
              <select
                value={quantity}
                id="shirtQuantity"
                onChange={changeQuantity}
              >
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

              <h4>
                {/* dropdown list of sizes */}
                <b>Size: </b>
                <select value={size} id="shirtSize" onChange={changeSize}>
                  <option value="size"> Size </option>
                  <option value="women-xs"> Women's XS </option>
                  <option value="women-s"> Women's S </option>
                  <option value="women-m"> Women's M </option>
                  <option value="women-l"> Women's L </option>
                  <option value="women-xl"> Women's XL </option>
                  <option value="women-2xl"> Women's 2XL </option>
                  <option value="men-xs"> Men's XS </option>
                  <option value="men-s"> Men's S </option>
                  <option value="men-m"> Men's M </option>
                  <option value="men-l"> Men's L </option>
                  <option value="men-xl"> Men's XL </option>
                  <option value="men-2xl"> Men's 2XL </option>
                </select>
              </h4>
            </div>
          </div>
          {/* disable until size selected */}
          <button id="addToCart" disabled={isDisabled} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
