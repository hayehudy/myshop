import React, { useState, useEffect } from "react";
import "./products.css";
import Product from "./product";
import { Slider } from "antd";

function Products(props) {
  const [value0, setValue0] = useState(0);
  const [value1, setValue1] = useState(2001);

  function onAfterChange(value) {
    setValue0(value[0]);
    setValue1(value[1]);
  }

  return (
    <div className="pro">
      <Slider
        defaultValue={[0, 2001]}
        max={2001}
        onAfterChange={onAfterChange}
      />
      {props.products.map(
        (product) =>
          product.price > value0 &&
          product.price < value1 && (
            <div className="pr">
              <Product
                add={props.add}
                remove={props.remove}
                product={product}
              />
            </div>
          )
      )}
    </div>
  );
}

export default Products;

//       [ {tytle:"לולב",
//     src:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQm7swHno1Ti49EJcNhjwJzPcV4lsSHf0eAvg&usqp=CAU"},
//     {tytle:"שופר",
//     src:"data:image/jpeg;base64,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",},
//     {tytle:"מצה",
//     src:"data:image/jpeg;base64,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",},
//     {tytle:"תפילין",
//     src:"data:image/jpeg;base64,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",},
//     {tytle:"אתרוג",
//     src:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_r7pK3_nLUMnpj38lS5dIAb-Kv176J5OXdw&usqp=CAU",},
//     {tytle:"כיפה",
//     src:"data:image/jpeg;base64,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",}
// ]
