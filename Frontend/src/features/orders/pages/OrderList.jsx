import { Link } from "react-router-dom";
import "../../products/style/shop.css";
import { useOrder } from "../hooks/useOrder";
import { useEffect } from "react";

const ORDERS = [
  {
    id: "LX-20260001",
    date: "Jun 20, 2026",
    status: "delivered",
    statusLabel: "Delivered",
    total: "₹978",
    itemCount: 3,
    items: [
      { name: "Classic Timepiece" },
      { name: "Urban Runner" },
      { name: "Silk Midi Dress" },
    ],
  },
  {
    id: "LX-20260002",
    date: "Jun 18, 2026",
    status: "shipped",
    statusLabel: "Shipped",
    total: "₹499",
    itemCount: 1,
    items: [{ name: "Wool Overcoat" }],
  },
  {
    id: "LX-20260003",
    date: "Jun 15, 2026",
    status: "processing",
    statusLabel: "Processing",
    total: "₹329",
    itemCount: 1,
    items: [{ name: "Linen Blazer" }],
  },
  {
    id: "LX-20260004",
    date: "Jun 10, 2026",
    status: "delivered",
    statusLabel: "Delivered",
    total: "₹324",
    itemCount: 2,
    items: [{ name: "Canvas Backpack" }, { name: "Leather Tote" }],
  },
  {
    id: "LX-20260005",
    date: "May 28, 2026",
    status: "cancelled",
    statusLabel: "Cancelled",
    total: "₹189",
    itemCount: 1,
    items: [{ name: "Urban Runner" }],
  },
];

const FILTERS = [
  "All Orders",
  "Delivered",
  "Shipped",
  "Processing",
  "Cancelled",
];

const ItemIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const OrderList = () => {
  const { handleGetOrderByUser, orders, fetching, handleCancelOrder } = useOrder();

  useEffect(() => {
    const getOrders = async () => {
      await handleGetOrderByUser();
    };

    getOrders();
  }, []);

  if (!orders || fetching) {
    return (
      <div className="page">
        <div className="page-header">
          <div style={{ width: "80px", height: "12px", background: "#f0f0f0", marginBottom: "16px", borderRadius: "4px" }} />
          <div style={{ width: "200px", height: "36px", background: "#f0f0f0", marginBottom: "12px", borderRadius: "4px" }} />
          <div style={{ width: "120px", height: "14px", background: "#f0f0f0", borderRadius: "4px" }} />
        </div>

        <div className="orders-filters" style={{ marginBottom: "28px" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ width: "80px", height: "34px", background: "#f0f0f0", borderRadius: "99px" }} />
          ))}
        </div>

        {[1, 2].map((i) => (
          <div className="order-card" key={i} style={{ borderColor: "#f5f5f5" }}>
            <div className="order-card-header" style={{ background: "#fafafa" }}>
              <div>
                <div style={{ width: "140px", height: "16px", background: "#eee", marginBottom: "8px", borderRadius: "4px" }} />
                <div style={{ width: "100px", height: "12px", background: "#eee", borderRadius: "4px" }} />
              </div>
              <div style={{ width: "80px", height: "24px", background: "#eee", borderRadius: "99px" }} />
            </div>
            <div className="order-card-body" style={{ opacity: 0.7 }}>
              <div className="order-items-preview">
                {[1, 2, 3].map((j) => (
                  <div key={j} style={{ width: "48px", height: "48px", background: "#f0f0f0", borderRadius: "8px" }} />
                ))}
              </div>
              <div className="order-card-meta">
                <div style={{ width: "60px", height: "18px", background: "#f0f0f0", marginBottom: "6px", borderRadius: "4px" }} />
                <div style={{ width: "50px", height: "14px", background: "#f0f0f0", borderRadius: "4px" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (orders.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <svg
            className="empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          >
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="2" />
          </svg>
          <p className="empty-title">No orders yet</p>
          <p className="empty-sub">
            When you place an order it will appear here.
          </p>
          <Link to="/products">
            <button className="btn btn-solid btn-lg" style={{ marginTop: 8 }}>
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <p className="page-eyebrow">Account</p>
        <h1 className="page-title">My Orders</h1>
        <p className="page-sub">{orders.length} order{orders.length === 1 ? '' : 's'} placed</p>
      </div>

      {/* Filters */}
      <div className="orders-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-chip${f === "All Orders" ? " active" : ""}`}
            id={`orders-filter-${f.toLowerCase().replace(" ", "-")}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Order cards */}
      {orders.map((order) => (
        <div className="order-card" key={order._id} id={`order-${order._id}`}>
          <div className="order-card-header">
            <div>
              <p className="order-card-id">Order #{order._id}</p>
              <p className="order-card-date">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <span className={`order-status status-${order.status}`}>
              {order.status}
            </span>
          </div>

          <div className="order-card-body">
            {/* Item thumbnails */}
            <div className="order-items-preview">
              {order.products.map((item, i) => (
                <div
                  className="order-item-thumb"
                  key={i}
                  title={item.product?.name || ""}
                >
                  {item.product?.imageUrl ? (
                    <img src={item.product.imageUrl} alt={item.product.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
                  ) : (
                    <ItemIcon />
                  )}
                </div>
              ))}
            </div>

            <div className="order-card-meta">
              <p className="order-total">₹{order.totalPrice}</p>
              <p className="order-item-count">
                {order.products.reduce((acc, curr) => acc + (curr.quantity || 1), 0)} item{order.products.reduce((acc, curr) => acc + (curr.quantity || 1), 0) > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="order-card-actions">
            <Link
              to={`/orders/${order._id}`}
              className="btn btn-outline btn-sm"
              id={`view-order-${order._id}`}
            >
              View Details
            </Link>
            {order.status === "delivered" && (
              <button
                className="btn btn-ghost btn-sm"
                id={`reorder-${order._id}`}
              >
                Reorder
              </button>
            )}
            {order.status === "shipped" && (
              <button
                className="btn btn-ghost btn-sm"
                id={`track-${order._id}`}
              >
                Track Package
              </button>
            )}
            {order.status === "pending" && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => handleCancelOrder(order._id)}
                id={`cancel-${order._id}`}
                style={{ color: "red" }}
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
