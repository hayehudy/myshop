import React, { useState, useEffect } from "react";
import "./items.css";

function Items(props) {
  return (
    <div>
      {props.items.map((product) => (
        <div className="product">
          <h4>{product.title}</h4>
          <div>
            <img src={product.image} />
          </div>
          <div>המחיר: {product.price}</div>
          <div>הכמות: {product.quantityOnCart}</div>
        </div>
      ))}
    </div>
  );
}
export default Items;
