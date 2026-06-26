import { createBrowserRouter } from "react-router-dom";
import Protected from "./features/auth/components/Protected";
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
  {
    path: "/products", element: <><Protected><Navbar /><ProductList /><Footer /></Protected></>
  },
  { path: "/products/:id", element: <><Protected><Navbar /><ProductDetails /><Footer /></Protected></> },
  { path: "/cart", element: <><Protected><Navbar /><CartItems /><Footer /></Protected></> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/orders", element: <><Protected><Navbar /><OrderList /><Footer /></Protected></> },
  { path: "/orders/:id", element: <><Protected><Navbar /><OrderDetails /><Footer /></Protected></> },
]);
