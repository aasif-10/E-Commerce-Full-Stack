import { Link, useParams } from "react-router-dom";
import "../../products/style/shop.css";
import "./order-details.css";
import { useOrder } from "../hooks/useOrder";
import { useEffect } from "react";



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
      <svg
        className="empty-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p className="empty-title">Order not found</p>
      <p className="empty-sub">We couldn't find that order in your account.</p>
      <Link to="/orders">
        <button className="btn btn-solid btn-lg" style={{ marginTop: 8 }}>
          Back to Orders
        </button>
      </Link>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */
const OrderDetails = () => {
  const { id } = useParams();
  const { handleGetOrderById, handleCancelOrder, order, fetching } =
    useOrder();

  useEffect(() => {
    const getById = async () => {
      await handleGetOrderById(id);
    };

    getById();
  }, [id]);

  if (!order || fetching) return <NotFound />;

  const isShipped = order.status === "shipped" || order.status === "delivered";
  const isDelivered = order.status === "delivered";

  const timeline = [
    { label: "Order Placed", done: true },
    { label: "Processing", done: true },
    { label: "Shipped", done: isShipped },
    { label: "Out for Delivery", done: isDelivered },
    { label: "Delivered", done: isDelivered },
  ];

  const allDone = timeline.every((t) => t.done);
  const lastDoneIndex = timeline.reduce(
    (acc, t, i) => (t.done ? i : acc),
    -1,
  );

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = new Date(order.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

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
          <h1 className="page-title">#{order._id}</h1>
          <p className="page-sub">Placed on {formattedDate} · {formattedTime}</p>
        </div>
        <span className={`order-status status-${order.status} od-status-badge`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
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
              {timeline.map((step, i) => {
                const isActive = i === lastDoneIndex && !allDone;
                const isDone = step.done;
                return (
                  <div
                    key={i}
                    className={`od-timeline-step${isDone ? " done" : ""}${isActive ? " active" : ""}`}
                  >
                    <div className="od-timeline-icon">
                      {isDone ? <CheckIcon /> : null}
                    </div>
                    {i < timeline.length - 1 && (
                      <div
                        className={`od-timeline-line${isDone ? " done" : ""}`}
                      />
                    )}
                    <div className="od-timeline-content">
                      <p className="od-timeline-label">{step.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {order.status === "shipped" && (
              <div className="od-tracking-notice">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="16"
                  height="16"
                >
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <path d="M16 8h4l3 5v4h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                Estimated delivery: <strong>Standard Delivery</strong>
              </div>
            )}
          </section>

          {/* ── Items ── */}
          <section className="od-section">
            <h2 className="od-section-title">Items in This Order</h2>
            <div className="od-items-list">
              {order.products?.map((item) => (
                <div className="od-item" key={item.product?._id || Math.random()}>
                  <div className="od-item-thumb">
                    <PackageIcon />
                  </div>
                  <div className="od-item-info">
                    <p className="od-item-name">{item.product?.name || "Unknown Product"}</p>
                    <p className="od-item-meta">
                      {item.product?.category || "N/A"} · Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="od-item-price">₹{item.price}</p>
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
                <span>₹{order.totalPrice}</span>
              </div>
              <div className="od-sum-row">
                <span>Shipping</span>
                <span className="od-sum-free">Free</span>
              </div>
              <div className="od-sum-row">
                <span>Tax</span>
                <span>₹0.00</span>
              </div>
              <div className="od-sum-row total">
                <span>Total</span>
                <span>₹{order.totalPrice}</span>
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
              <p className="od-address-name">{order.user?.name || "Customer"}</p>
              <p>{order.address}</p>
            </div>
          </div>

          {/* ── Payment ── */}
          <div className="od-card">
            <div className="od-card-header">
              <span style={{ fontSize: "1rem" }}>💳</span>
              <span>Payment</span>
            </div>
            <p className="od-payment-method">{order.paymentId}</p>
          </div>

          {/* ── Actions ── */}
          <div className="od-actions">
            {order.status === "delivered" && (
              <button
                className="btn btn-solid btn-full"
                id={`reorder-${order._id}`}
              >
                Reorder Items
              </button>
            )}
            {order.status === "shipped" && (
              <button
                className="btn btn-solid btn-full"
                id={`track-${order._id}`}
              >
                Track Package
              </button>
            )}
            <button
              className="btn btn-outline btn-full"
              id={`contact-support-${order._id}`}
            >
              Contact Support
            </button>
            {(order.status === "pending" ||
              order.status === "processing" ||
              order.status === "shipped") && (
                <button
                  className="btn btn-ghost btn-full od-cancel-btn"
                  id={`cancel-${order._id}`}
                  onClick={() => {
                    handleCancelOrder(order._id);
                    // No router push, just handleCancelOrder. The user's code re-fetches.
                  }}
                  style={{ color: "red" }}
                >
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
