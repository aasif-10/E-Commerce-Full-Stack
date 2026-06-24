import { Link } from "react-router-dom";
import "../../products/style/shop.css";

const CART_ITEMS = [
  { id: 1, name: "Classic Timepiece", category: "Accessories", size: "One Size", price: 249, qty: 1 },
  { id: 2, name: "Urban Runner", category: "Footwear", size: "42", price: 189, qty: 2 },
  { id: 6, name: "Silk Midi Dress", category: "Women", size: "M", price: 279, qty: 1 },
];

const ItemIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const subtotal = CART_ITEMS.reduce((acc, i) => acc + i.price * i.qty, 0);
const shipping = 0;
const tax = Math.round(subtotal * 0.08);
const total = subtotal + shipping + tax;

const CartItems = () => {
  if (CART_ITEMS.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
          </svg>
          <p className="empty-title">Your cart is empty</p>
          <p className="empty-sub">Looks like you haven't added anything yet.</p>
          <Link to="/products"><button className="btn btn-solid btn-lg" style={{ marginTop: 8 }}>Start Shopping</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">

      <div className="page-header">
        <p className="page-eyebrow">Your</p>
        <h1 className="page-title">Shopping Cart</h1>
        <p className="page-sub">{CART_ITEMS.reduce((a, i) => a + i.qty, 0)} items</p>
      </div>

      <div className="cart-layout">

        {/* Items */}
        <div>
          <div className="cart-list">
            {CART_ITEMS.map((item) => (
              <div className="cart-item" key={item.id} id={`cart-item-${item.id}`}>

                <div className="cart-item-thumb">
                  <ItemIcon />
                </div>

                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-meta">{item.category} · Size {item.size}</p>
                  <div className="cart-item-qty">
                    <button className="cqty-btn" id={`dec-${item.id}`} aria-label="Decrease">−</button>
                    <span className="cqty-val">{item.qty}</span>
                    <button className="cqty-btn" id={`inc-${item.id}`} aria-label="Increase">+</button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <span className="cart-item-price">${item.price * item.qty}</span>
                  <button className="cart-remove-btn" id={`remove-${item.id}`} aria-label="Remove">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14H6L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            <Link to="/products">
              <button className="btn btn-ghost" id="continue-shopping-btn">← Continue Shopping</button>
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <p className="cart-summary-title">Order Summary</p>

          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
          </div>
          <div className="cart-summary-row">
            <span>Tax (8%)</span>
            <span>${tax}</span>
          </div>
          <div className="cart-summary-row total">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <div className="cart-promo-wrap">
            <input
              id="promo-code-input"
              className="cart-promo-input"
              type="text"
              placeholder="Promo code"
            />
            <button className="cart-promo-btn" id="apply-promo-btn">Apply</button>
          </div>

          <Link to="/checkout">
            <button className="btn btn-solid btn-lg btn-full" id="cart-checkout-btn">
              Proceed to Checkout
            </button>
          </Link>

          <p style={{ fontSize: ".78rem", color: "#aaa", textAlign: "center", marginTop: 14 }}>
            Free shipping on orders over $50
          </p>
        </div>

      </div>
    </div>
  );
};

export default CartItems;