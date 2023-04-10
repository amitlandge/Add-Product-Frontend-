import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Input.css";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const onSubmitProductDataHandler = (e) => {
    const userData = localStorage.getItem("user");
    const userId = JSON.parse(userData)._id;

    e.preventDefault();

    if (!name || !description || !category || !price) {
      alert("please fill all information");
      return false;
    } else {
      sendProduct(userId);
    }
  };
  const sendProduct = async (userId) => {
    const response = await fetch("http://localhost:2000/add-product", {
      method: "post",
      body: JSON.stringify({ name, description, category, price, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      navigate("/products");
    }
  };
  return (
    <div>
      <h1>Product Details</h1>
      <form onSubmit={onSubmitProductDataHandler}>
        <input
          type="text"
          placeholder="Enter Your Product Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />

        <input
          type="text"
          placeholder="Enter Your Product Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <input
          type="text"
          placeholder="Enter Your Product Category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
        />
        <input
          type="number"
          placeholder="Enter Your Product Price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
