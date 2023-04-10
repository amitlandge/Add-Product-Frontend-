import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const param = useParams();
  useEffect(() => {
    const getUpdate = async () => {
      const response = await fetch(
        `http://localhost:2000/getProduct/${param.productId}`
      );
      const result = await response.json();

      setName(result.update_product.name);
      setDescription(result.update_product.description);
      setCategory(result.update_product.category);
      setPrice(result.update_product.price);
    };
    getUpdate();
  }, [param.productId]);

  const onSubmitProductDataHandler = (e) => {
    e.preventDefault();
    console.log(name, description, price, category);

    const updateProduct = async () => {
      if (!name || !description || !price || !category) {
        alert("Please Fill All information");
        return false;
      }

      const response = await fetch(
        `http://localhost:2000/update-product/${param.productId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name,
            description,
            category,
            price,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (result.success) {
        navigate("/products");
      }
    };
    updateProduct();
  };
  return (
    <div>
      <h1>Update Products</h1>
      <form onSubmit={onSubmitProductDataHandler}>
        <input
          type="text"
          placeholder="Enter Your Product Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          defaultValue={name}
        />

        <input
          type="text"
          placeholder="Enter Your Product Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          defaultValue={description}
        />
        <input
          type="text"
          placeholder="Enter Your Product Category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          defaultValue={category}
        />
        <input
          type="number"
          placeholder="Enter Your Product Price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          defaultValue={price}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
