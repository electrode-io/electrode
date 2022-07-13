import { React, ReactSubApp } from "@xarc/react";
import { products as data } from "./data";
import { Product } from "./product";

const Products = () => {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    setProducts(data)
  }, []);
  
  if (products) {
    return (
      <div
        style={{
          padding: "5px",
          marginTop: "15px",
          border: "solid",
          marginLeft: "15%",
          marginRight: "15%",
          textAlign: "center",
        }}
      >
        <h2>Products</h2>
        {products.map((product, i) => (
          <Product key={`prd_key_${i}`} {...product} />
        ))}
      </div>
    );
  }
};

export const subapp: ReactSubApp = {
  Component: Products
};

