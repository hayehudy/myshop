import React, { useState, useEffect } from "react";
import "./product.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Product(props) {
  const [products2, setProducts2] = useState([]);
  const prop = props.product;
  const [quantityOnCart, setQuantityOnCart] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/shop").then((res) => {
      setProducts2(res.data);
    });
  }, []);

  function add() {
    const place = products2.findIndex((x) => x.id === prop.id);
    const firstQuantity = products2[place].quantity;
    if (prop.quantity && quantityOnCart <= firstQuantity) {
      setQuantityOnCart(firstQuantity - prop.quantity + 2);
      props.add(prop, quantityOnCart);
    }
  }
  const remove = () => {
    const place1 = products2.findIndex((x) => x.id === prop.id);
    const firstQuantity2 = products2[place1].quantity;
    if (prop.quantity < firstQuantity2) {
      setQuantityOnCart(firstQuantity2 - prop.quantity);
      props.remove(prop, quantityOnCart);
    }
  };

  const trueId = props.product.id;

  return (
    <div>
      <Link to={`/product/${trueId}`}>
        <h2>{props.product.title}</h2>
        <div>
          <img src={props.product.image} />
          {console.log(props.product.image)}
        </div>
        <div>המחיר: {props.product.price}</div>
        <div>המלאי בחנות: {props.product.quantity} </div>
      </Link>
      <button onClick={add}>הוסף מוצר לעגלה</button>
      <button onClick={remove}>הסר מוצר מהעגלה</button>
    </div>
  );
}

export default Product;
