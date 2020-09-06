import React, { useState, useEffect, useContext } from "react";
import "./product.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Context from "../../context";

function Product(props) {
  const prop = props.product;
  const trueId = prop.id;
  const data = useContext(Context).data;
  const initialData = useContext(Context).initialData;
  const changeData = useContext(Context).changeData;
  const cart = useContext(Context).cart;
  const setCart = useContext(Context).changeCart;
  const itemsOfCart = useContext(Context).cartItems;
  const setItems = useContext(Context).changeCartQuantity;
  const cartCharge = useContext(Context).cartCharge;
  const setCartCharge = useContext(Context).setCartCharge;

  function add() {
    const placeA = initialData.findIndex((x) => x.id === prop.id);
    const firstQuantity = initialData[placeA].quantity;
    if (prop.quantity > 0) {
      setCart(cart + 1);
      setCartCharge(cartCharge + prop.price);
      //change the quantity of the product in the shop
      prop.quantity = prop.quantity - 1;
      let newProducts = data;
      const place1 = newProducts.findIndex((x) => x.id === prop.id);
      newProducts[place1] = prop;
      changeData(newProducts);
      //add product to the cart or change his quantity on cart
      const newItem = prop;
      const place2 = itemsOfCart.findIndex((x) => x.id === prop.id);
      if (place2 > -1) {
        const newItems = itemsOfCart;
        const replaceQuanti = (newItems[place2].quantityOnCart =
          firstQuantity - prop.quantity);
        setItems(newItems);
      } else {
        const addQuantiOnCart = (newItem.quantityOnCart =
          firstQuantity - prop.quantity);
        setItems([...itemsOfCart, newItem]);
      }
    }
  }

  const remove = (product, quantityOnCart) => {
    const placeA = initialData.findIndex((x) => x.id === prop.id);
    const firstQuantity = initialData[placeA].quantity;
    if (prop.quantity < firstQuantity) {
      setCart(cart - 1);
      setCartCharge(cartCharge - prop.price);
      //change the quantity of the product in the shop
      prop.quantity = prop.quantity + 1;
      let newProducts = data;
      const place1 = newProducts.findIndex((x) => x.id === prop.id);
      newProducts[place1] = prop;
      changeData(newProducts);
      //remove product from the cart or change his quantity on cart
      const newItem = prop;
      const place2 = itemsOfCart.findIndex((x) => x.title === prop.title);
      if (place2 > -1) {
        const newItems = itemsOfCart;
        if (newItems[place2].quantityOnCart > 1) {
          const replaceQuanti = (newItems[place2].quantityOnCart =
            firstQuantity - prop.quantity);
          setItems(newItems);
        } else {
          const removeItem = newItems.splice([place2], 1);
          setItems(newItems);
        }
      }
    }
  };

  return (
    <div>
      <Link to={`/product/${trueId}`}>
        <h2>{prop.title}</h2>
        <div>
          <img src={prop.image} />
        </div>
        <div>המחיר: {prop.price}</div>
        <div>המלאי בחנות: {prop.quantity} </div>
      </Link>
      <button onClick={add}>הוסף מוצר לעגלה</button>
      <button onClick={remove}>הסר מוצר מהעגלה</button>
    </div>
  );
}

export default Product;
