import { Link } from "react-router-dom";
import "./style/components.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-top">

          {/* Brand */}
          <div>
            <Link to="/home" className="footer-brand-logo">
              <span>●</span>LUXE
            </Link>
            <p className="footer-tagline">
              Curated essentials for the modern wardrobe. Minimalist by design, bold by nature.
            </p>
          </div>

          {/* Shop */}
          <div className="footer-col">
            <span className="footer-col-title">Shop</span>
            <Link to="/products">All Products</Link>
            <Link to="/products">New Arrivals</Link>
            <Link to="/products">Sale</Link>
            <Link to="/cart">Cart</Link>
          </div>

          {/* Account */}
          <div className="footer-col">
            <span className="footer-col-title">Account</span>
            <Link to="/auth/login">Sign In</Link>
            <Link to="/auth/register">Register</Link>
            <Link to="/orders">My Orders</Link>
            <Link to="/checkout">Checkout</Link>
          </div>

          {/* Company */}
          <div className="footer-col">
            <span className="footer-col-title">Company</span>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
            <a href="#">Contact</a>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© 2026 LUXE. All rights reserved.</span>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;