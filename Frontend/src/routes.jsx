import { createBrowserRouter } from "react-router-dom";
import Home from "./features/landing/pages/Home";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Verify from "./features/auth/pages/Verify";
import CartItems from "./features/cart/pages/CartItems";
import Checkout from "./features/checkout/pages/Checkout";
import ProductList from "./features/products/pages/ProductList";
import ProductDetails from "./features/products/pages/ProductDetails";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"
import OrderList from "./features/orders/pages/OrderList";
import OrderDetails from "./features/orders/pages/OrderDetails";


export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/verify", element: <Verify /> },
  { path: "/products", element: <><Navbar /><ProductList /><Footer /></> },
  { path: "/products/:id", element: <><Navbar /><ProductDetails /><Footer /></> },
  { path: "/cart", element: <><Navbar /><CartItems /><Footer /></> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/orders", element: <><Navbar /><OrderList /><Footer /></> },
  { path: "/orders/:id", element: <><Navbar /><OrderDetails /><Footer /></> },
]);
