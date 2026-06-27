import { Link, useNavigate } from "react-router-dom";
import "../../products/style/shop.css";
import { useEffect, useState } from "react";
import { useCart } from "../../cart/hooks/useCart";
import { useAuth } from "../../auth/hooks/useAuth";
import { useOrder } from "../../orders/hooks/useOrder";

const ItemIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const MINI_ITEMS = [
  { id: 1, name: "Classic Timepiece", meta: "One Size · ×1", price: "₹249" },
  { id: 2, name: "Urban Runner", meta: "Size 42 · ×2", price: "₹378" },
  { id: 6, name: "Silk Midi Dress", meta: "Size M · ×1", price: "₹279" },
];

const Checkout = () => {
  const { user, handleGetMe } = useAuth();
  const { handleGetCartItems, cartItems } = useCart();
  const { handleCreateOrder } = useOrder();
  const [placing, setPlacing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getCart = async () => {
      await handleGetCartItems();
      await handleGetMe();
    };

    getCart();
  }, []);

  if (!cartItems || !user) {
    return (
      <div
        className="page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  const subtotal = cartItems.items.reduce(
    (acc, i) => acc + i.product.price * i.quantity,
    0,
  );
  const shipping = 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const handleOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    const products = [];
    cartItems.items.forEach((element) => {
      products.push({
        product: element.product._id,
        quantity: element.quantity,
        price: element.product.price,
      });
    });

    await handleCreateOrder(products, total);
    setPlacing(false);

    navigate("/orders");
  };

  return (
    <div className="page">
      <div className="page-header">
        <p className="page-eyebrow">Final Step</p>
        <h1 className="page-title">Checkout</h1>
      </div>

      <div className="checkout-layout">
        {/* ── Left: form ── */}
        <div>
          {/* 1. Contact */}
          <div className="checkout-section">
            <h2 className="checkout-section-title">
              <span className="checkout-section-num">1</span>Contact Information
            </h2>
            <div className="checkout-form">
              <div className="field-row">
                <div className="field">
                  <label className="input-label" htmlFor="co-name">
                    Full Name
                  </label>
                  <input
                    defaultValue={user.name}
                    id="co-name"
                    className="input"
                    type="text"
                    placeholder="John Doe"
                  />
                </div>
                <div className="field">
                  <label className="input-label" htmlFor="co-email">
                    Email
                  </label>
                  <input
                    defaultValue={user.email}
                    id="co-email"
                    className="input"
                    type="email"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="field">
                <label className="input-label" htmlFor="co-phone">
                  Phone (optional)
                </label>
                <input
                  id="co-phone"
                  className="input"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>

          {/* 2. Shipping */}
          <div className="checkout-section">
            <h2 className="checkout-section-title">
              <span className="checkout-section-num">2</span>Shipping Address
            </h2>
            <div className="checkout-form">
              <div className="field">
                <label className="input-label" htmlFor="co-address">
                  Street Address
                </label>
                <input
                  id="co-address"
                  className="input"
                  type="text"
                  placeholder="123 Main Street"
                />
              </div>
              <div className="field">
                <label className="input-label" htmlFor="co-address2">
                  Apartment, suite, etc. (optional)
                </label>
                <input
                  id="co-address2"
                  className="input"
                  type="text"
                  placeholder="Apt 4B"
                />
              </div>
              <div className="field-row">
                <div className="field">
                  <label className="input-label" htmlFor="co-city">
                    City
                  </label>
                  <input
                    id="co-city"
                    className="input"
                    type="text"
                    placeholder="New York"
                  />
                </div>
                <div className="field">
                  <label className="input-label" htmlFor="co-zip">
                    ZIP / Postal Code
                  </label>
                  <input
                    id="co-zip"
                    className="input"
                    type="text"
                    placeholder="10001"
                  />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label className="input-label" htmlFor="co-state">
                    State / Province
                  </label>
                  <input
                    id="co-state"
                    className="input"
                    type="text"
                    placeholder="New York"
                  />
                </div>
                <div className="field">
                  <label className="input-label" htmlFor="co-country">
                    Country
                  </label>
                  <select id="co-country" className="input select">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>India</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Delivery */}
          <div className="checkout-section">
            <h2 className="checkout-section-title">
              <span className="checkout-section-num">3</span>Delivery Method
            </h2>
            <div className="checkout-payment-opts">
              <label className="pay-option" id="delivery-standard">
                <input type="radio" name="delivery" defaultChecked />
                <div>
                  <p className="pay-option-label">Standard Shipping</p>
                  <p className="pay-option-sub">5–7 business days</p>
                </div>
                <span className="pay-option-icon">Free</span>
              </label>
              <label className="pay-option" id="delivery-express">
                <input type="radio" name="delivery" />
                <div>
                  <p className="pay-option-label">Express Shipping</p>
                  <p className="pay-option-sub">2–3 business days</p>
                </div>
                <span className="pay-option-icon">₹12</span>
              </label>
              <label className="pay-option" id="delivery-overnight">
                <input type="radio" name="delivery" />
                <div>
                  <p className="pay-option-label">Overnight</p>
                  <p className="pay-option-sub">Next business day</p>
                </div>
                <span className="pay-option-icon">₹28</span>
              </label>
            </div>
          </div>

          {/* 4. Payment */}
          <div className="checkout-section">
            <h2 className="checkout-section-title">
              <span className="checkout-section-num">4</span>Payment
            </h2>
            <div className="checkout-payment-opts" style={{ marginBottom: 20 }}>
              <label className="pay-option" id="pay-card">
                <input type="radio" name="payment" defaultChecked />
                <div>
                  <p className="pay-option-label">Credit / Debit Card</p>
                  <p className="pay-option-sub">Visa, Mastercard, Amex</p>
                </div>
                <span className="pay-option-icon">💳</span>
              </label>
              <label className="pay-option" id="pay-paypal">
                <input type="radio" name="payment" />
                <div>
                  <p className="pay-option-label">PayPal</p>
                  <p className="pay-option-sub">
                    Pay via PayPal balance or card
                  </p>
                </div>
                <span className="pay-option-icon">🅿️</span>
              </label>
            </div>

            <div className="checkout-form">
              <div className="field">
                <label className="input-label" htmlFor="co-card-name">
                  Name on Card
                </label>
                <input
                  id="co-card-name"
                  className="input"
                  type="text"
                  placeholder="John Doe"
                />
              </div>
              <div className="field">
                <label className="input-label" htmlFor="co-card-number">
                  Card Number
                </label>
                <input
                  id="co-card-number"
                  className="input"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="field-row">
                <div className="field">
                  <label className="input-label" htmlFor="co-card-expiry">
                    Expiry Date
                  </label>
                  <input
                    id="co-card-expiry"
                    className="input"
                    type="text"
                    placeholder="MM / YY"
                    maxLength={7}
                  />
                </div>
                <div className="field">
                  <label className="input-label" htmlFor="co-card-cvc">
                    CVC
                  </label>
                  <input
                    id="co-card-cvc"
                    className="input"
                    type="text"
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleOrder}
            className="btn btn-solid btn-lg btn-full"
            id="place-order-btn"
            disabled={placing}
            style={{ position: "relative" }}
          >
            {placing ? (
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    width: 18,
                    height: 18,
                    animation: "spin 1s linear infinite"
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v2m0 12v2m8-8h-2M6 12H4m13.4-5.4l-1.4 1.4M7.4 16.6l-1.4 1.4m10.6 0l-1.4-1.4M7.4 7.4L6 6" />
                </svg>
                Processing...
              </span>
            ) : (
              `Place Order — ₹${total}`
            )}
          </button>
          
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>

          <p
            style={{
              fontSize: ".78rem",
              color: "#aaa",
              textAlign: "center",
              marginTop: 12,
            }}
          >
            Your payment info is encrypted and secure.
          </p>
        </div>

        {/* ── Right: order summary ── */}
        <div className="checkout-summary">
          <p className="checkout-summary-title">Your Order</p>

          {cartItems.items.map((item) => (
            <div className="checkout-mini-item" key={item.product._id}>
              <div className="checkout-mini-thumb">
                <ItemIcon />
              </div>
              <div className="checkout-mini-info">
                <p className="checkout-mini-name">{item.product.name}</p>
                <p className="checkout-mini-meta">{item.size}</p>
                <p className="checkout-mini-meta">x{item.quantity}</p>
              </div>
              <span className="checkout-mini-price">₹{item.product.price}</span>
            </div>
          ))}

          <div className="checkout-sum-rows">
            <div className="checkout-sum-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="checkout-sum-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="checkout-sum-row">
              <span>Tax (8%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="checkout-sum-row total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <Link to="/cart" style={{ display: "block", marginTop: 16 }}>
            <button
              className="btn btn-ghost btn-full btn-sm"
              id="back-to-cart-btn"
            >
              ← Back to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
