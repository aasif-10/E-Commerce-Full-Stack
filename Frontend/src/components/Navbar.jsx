import { Link, NavLink } from "react-router-dom";
import "./style/components.css";
import { useCart } from "../features/cart/hooks/useCart";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = () => {
  const { cartItems, handleGetCartItems } = useCart();
  const { handleLogout, loading } = useAuth();
  const [addingCart, setAddingCart] = useState(false);

  const handleLogoutBtn = async (e) => {
    e.preventDefault();
    await handleLogout();
  };

  useEffect(() => {
    const getCartItems = async () => {
      setAddingCart(true);
      await handleGetCartItems();
      setAddingCart(false);
    };
    getCartItems();
  }, []);

  return (
    <nav className="nav">
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/home" className="nav-logo" id="nav-logo">
          <span className="nav-logo-dot">●</span>LUXE
        </Link>

        {/* Links */}
        <ul className="nav-links">
          <li>
            <NavLink to="/products" id="nav-products">
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" id="nav-orders">
              Orders
            </NavLink>
          </li>
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          {/* Cart icon */}
          <Link to="/cart" id="nav-cart-btn">
            <button className="nav-icon-btn" aria-label="Cart">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="nav-badge">
                {!cartItems || addingCart ? "..." : cartItems.items.length}
              </span>
            </button>
          </Link>

          {/* Account icon */}
          <Link to="/auth/login" id="nav-account-btn">
            <button className="nav-icon-btn" aria-label="Account">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </Link>

          <button
            onClick={handleLogoutBtn}
            className="nav-btn"
            id="nav-checkout-btn"
          >
            {loading ? "Logging out.." : "Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
