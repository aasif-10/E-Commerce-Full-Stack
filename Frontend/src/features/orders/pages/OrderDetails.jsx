import { Link, useParams } from "react-router-dom";
import "../../products/style/shop.css";
import "./order-details.css";

/* ── Mock data (replace with API call keyed by id) ── */
const ORDERS = [
  {
    id: "LX-20260001",
    date: "Jun 20, 2026",
    placedAt: "June 20, 2026 · 9:14 AM",
    status: "delivered",
    statusLabel: "Delivered",
    deliveredAt: "June 23, 2026",
    estimatedDelivery: "June 23, 2026",
    subtotal: "$928.00",
    shipping: "Free",
    tax: "$50.00",
    total: "$978.00",
    items: [
      { id: 1, name: "Classic Timepiece", category: "Accessories", size: "One Size", qty: 1, price: "$429.00" },
      { id: 2, name: "Urban Runner", category: "Footwear", size: "EU 42", qty: 1, price: "$289.00" },
      { id: 3, name: "Silk Midi Dress", category: "Clothing", size: "M", qty: 1, price: "$210.00" },
    ],
    timeline: [
      { label: "Order Placed", date: "Jun 20, 9:14 AM", done: true },
      { label: "Processing", date: "Jun 20, 11:00 AM", done: true },
      { label: "Shipped", date: "Jun 21, 2:30 PM", done: true },
      { label: "Out for Delivery", date: "Jun 23, 8:00 AM", done: true },
      { label: "Delivered", date: "Jun 23, 1:47 PM", done: true },
    ],
    shipping_address: {
      name: "Alex Johnson",
      line1: "142 Montague Street",
      line2: "Apt 4B",
      city: "Brooklyn, NY 11201",
      country: "United States",
    },
    payment: {
      method: "Visa ending in 4242",
      icon: "💳",
    },
  },
  {
    id: "LX-20260002",
    date: "Jun 18, 2026",
    placedAt: "June 18, 2026 · 3:45 PM",
    status: "shipped",
    statusLabel: "Shipped",
    deliveredAt: null,
    estimatedDelivery: "June 25, 2026",
    subtotal: "$499.00",
    shipping: "Free",
    tax: "$0.00",
    total: "$499.00",
    items: [
      { id: 1, name: "Wool Overcoat", category: "Clothing", size: "L", qty: 1, price: "$499.00" },
    ],
    timeline: [
      { label: "Order Placed", date: "Jun 18, 3:45 PM", done: true },
      { label: "Processing", date: "Jun 18, 6:00 PM", done: true },
      { label: "Shipped", date: "Jun 19, 10:00 AM", done: true },
      { label: "Out for Delivery", date: null, done: false },
      { label: "Delivered", date: null, done: false },
    ],
    shipping_address: {
      name: "Alex Johnson",
      line1: "142 Montague Street",
      line2: "Apt 4B",
      city: "Brooklyn, NY 11201",
      country: "United States",
    },
    payment: { method: "Visa ending in 4242", icon: "💳" },
  },
];

/* ── Icons ── */
const PackageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ReceiptIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16l3-2 3 2 3-2 3 2V4a2 2 0 0 0-2-2z" />
    <line x1="8" y1="9" x2="16" y2="9" />
    <line x1="8" y1="13" x2="12" y2="13" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────
   ORDER NOT FOUND
   ───────────────────────────────────────────────────────────────── */
const NotFound = () => (
  <div className="page">
    <div className="empty-state">
      <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p className="empty-title">Order not found</p>
      <p className="empty-sub">We couldn't find that order in your account.</p>
      <Link to="/orders">
        <button className="btn btn-solid btn-lg" style={{ marginTop: 8 }}>Back to Orders</button>
      </Link>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */
const OrderDetails = () => {
  const { id } = useParams();

  /* In a real app: fetch order by id from API */
  const order = ORDERS.find((o) => o.id === id) ?? ORDERS[0];

  if (!order) return <NotFound />;

  const allDone = order.timeline.every((t) => t.done);
  const lastDoneIndex = order.timeline.reduce((acc, t, i) => (t.done ? i : acc), -1);

  return (
    <div className="page od-page">

      {/* ── Breadcrumb ── */}
      <nav className="od-breadcrumb">
        <Link to="/orders" className="od-back-link">
          <ArrowLeftIcon />
          My Orders
        </Link>
      </nav>

      {/* ── Page header ── */}
      <div className="od-header">
        <div>
          <p className="page-eyebrow">Order Details</p>
          <h1 className="page-title">#{order.id}</h1>
          <p className="page-sub">Placed on {order.placedAt}</p>
        </div>
        <span className={`order-status status-${order.status} od-status-badge`}>
          {order.statusLabel}
        </span>
      </div>

      <div className="od-layout">

        {/* ═══════════════════════════════════════
            LEFT COLUMN
        ═══════════════════════════════════════ */}
        <div className="od-main">

          {/* ── Timeline ── */}
          <section className="od-section">
            <h2 className="od-section-title">Order Progress</h2>
            <div className="od-timeline">
              {order.timeline.map((step, i) => {
                const isActive = i === lastDoneIndex && !allDone;
                const isDone   = step.done;
                return (
                  <div
                    key={i}
                    className={`od-timeline-step${isDone ? " done" : ""}${isActive ? " active" : ""}`}
                  >
                    <div className="od-timeline-icon">
                      {isDone ? <CheckIcon /> : null}
                    </div>
                    {i < order.timeline.length - 1 && (
                      <div className={`od-timeline-line${isDone ? " done" : ""}`} />
                    )}
                    <div className="od-timeline-content">
                      <p className="od-timeline-label">{step.label}</p>
                      {step.date && <p className="od-timeline-date">{step.date}</p>}
                    </div>
                  </div>
                );
              })}
            </div>

            {order.status === "shipped" && (
              <div className="od-tracking-notice">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <path d="M16 8h4l3 5v4h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                Estimated delivery: <strong>{order.estimatedDelivery}</strong>
              </div>
            )}
          </section>

          {/* ── Items ── */}
          <section className="od-section">
            <h2 className="od-section-title">Items in This Order</h2>
            <div className="od-items-list">
              {order.items.map((item) => (
                <div className="od-item" key={item.id}>
                  <div className="od-item-thumb">
                    <PackageIcon />
                  </div>
                  <div className="od-item-info">
                    <p className="od-item-name">{item.name}</p>
                    <p className="od-item-meta">{item.category} · Size: {item.size} · Qty: {item.qty}</p>
                  </div>
                  <p className="od-item-price">{item.price}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ═══════════════════════════════════════
            RIGHT COLUMN — sticky sidebar
        ═══════════════════════════════════════ */}
        <aside className="od-sidebar">

          {/* ── Order Summary ── */}
          <div className="od-card">
            <div className="od-card-header">
              <ReceiptIcon />
              <span>Order Summary</span>
            </div>
            <div className="od-summary-rows">
              <div className="od-sum-row">
                <span>Subtotal</span>
                <span>{order.subtotal}</span>
              </div>
              <div className="od-sum-row">
                <span>Shipping</span>
                <span className="od-sum-free">{order.shipping}</span>
              </div>
              <div className="od-sum-row">
                <span>Tax</span>
                <span>{order.tax}</span>
              </div>
              <div className="od-sum-row total">
                <span>Total</span>
                <span>{order.total}</span>
              </div>
            </div>
          </div>

          {/* ── Delivery Address ── */}
          <div className="od-card">
            <div className="od-card-header">
              <MapPinIcon />
              <span>Delivery Address</span>
            </div>
            <div className="od-address">
              <p className="od-address-name">{order.shipping_address.name}</p>
              <p>{order.shipping_address.line1}</p>
              {order.shipping_address.line2 && <p>{order.shipping_address.line2}</p>}
              <p>{order.shipping_address.city}</p>
              <p>{order.shipping_address.country}</p>
            </div>
          </div>

          {/* ── Payment ── */}
          <div className="od-card">
            <div className="od-card-header">
              <span style={{ fontSize: "1rem" }}>{order.payment.icon}</span>
              <span>Payment</span>
            </div>
            <p className="od-payment-method">{order.payment.method}</p>
          </div>

          {/* ── Actions ── */}
          <div className="od-actions">
            {order.status === "delivered" && (
              <button className="btn btn-solid btn-full" id={`reorder-${order.id}`}>
                Reorder Items
              </button>
            )}
            {order.status === "shipped" && (
              <button className="btn btn-solid btn-full" id={`track-${order.id}`}>
                Track Package
              </button>
            )}
            <button className="btn btn-outline btn-full" id={`contact-support-${order.id}`}>
              Contact Support
            </button>
            {(order.status === "processing" || order.status === "shipped") && (
              <button className="btn btn-ghost btn-full od-cancel-btn" id={`cancel-${order.id}`}>
                Cancel Order
              </button>
            )}
          </div>

        </aside>
      </div>
    </div>
  );
};

export default OrderDetails;
