import React, { useState, useEffect } from "react";
import "./App.css";
import PageOfProduct from "../src/components/pages/pageofproduct/pageOfProduct";
import Login from "../src/components/pages/pageOfLogin/login";
import Change from "../src/components/pages/ChangeServer/Change";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "../src/components/header/header";
import Products from "../src/components/products/products";
import Items from "../src/components/items/items";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(0);
  const [itemsOfCart, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/shop").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const add = (product, quantityOnCart) => {
    setCart(cart + 1);
    //change the quantity of the product in the shop
    let newProducts = products;
    product.quantity = product.quantity - 1;
    const place1 = newProducts.findIndex((x) => x.id === product.id);
    newProducts[place1] = product;
    setProducts(newProducts);
    //add product to the cart or change his quantity on cart
    const newItem = product;
    const place = itemsOfCart.findIndex((x) => x.id === product.id);
    if (place > -1) {
      const newItems = itemsOfCart;
      const replaceQuanti = (newItems[place].quantityOnCart = quantityOnCart);
      setItems(newItems);
    } else {
      const addQuantiOnCart = (newItem.quantityOnCart = quantityOnCart);
      setItems([...itemsOfCart, newItem]);
    }
  };

  const remove = (product, quantityOnCart) => {
    if (cart) {
      setCart(cart - 1);
    }
    let newProducts = products;
    product.quantity = product.quantity + 1;
    const place1 = newProducts.findIndex((x) => x.id === product.id);
    newProducts[place1] = product;
    setProducts(newProducts);
    const newItem1 = product;
    const place = itemsOfCart.findIndex((x) => x.title === product.title);
    if (place > -1) {
      const newItems1 = itemsOfCart;
      if (newItems1[place].quantityOnCart !== 1) {
        const replaceQuanti = (newItems1[place].quantityOnCart =
          quantityOnCart - 2);
        setItems(newItems1);
      } else {
        const removeItem = newItems1.splice([place], 1);
        setItems(newItems1);
      }
    }
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <div className="hed">
              <Header />
            </div>
            <div className="cart">
              פריטים שנוספו לעגלה: {cart}
              <Items className="items" items={itemsOfCart} />
            </div>

            <div className="prod">
              <Products products={products} add={add} remove={remove} />
            </div>
          </div>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/changeServer">
          <Change />
        </Route>
        <Route exact path="/product/:id">
          <PageOfProduct />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
