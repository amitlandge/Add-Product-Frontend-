import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./components/PrivateRoutes";
import AddProduct from "./components/Product/AddProduct";
import ProductsList from "./components/Product/ProductsList";
import UpdateProduct from "./components/Product/UpdateProduct";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import NavBar from "./components/UI/NavBar";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route element={<PrivateRoutes />}>
          <Route path="/products" element={<ProductsList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route
            path="/update-product/:productId"
            element={<UpdateProduct />}
          />
          <Route path="/profile" element={<h1>Profile page Here</h1>} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
