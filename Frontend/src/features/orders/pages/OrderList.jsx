import { Link } from "react-router-dom";
import "../../products/style/shop.css";

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

const FILTERS = ["All Orders", "Delivered", "Shipped", "Processing", "Cancelled"];

const ItemIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

const OrderList = () => {
    if (ORDERS.length === 0) {
        return (
            <div className="page">
                <div className="empty-state">
                    <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                        <rect x="9" y="3" width="6" height="4" rx="2" />
                    </svg>
                    <p className="empty-title">No orders yet</p>
                    <p className="empty-sub">When you place an order it will appear here.</p>
                    <Link to="/products"><button className="btn btn-solid btn-lg" style={{ marginTop: 8 }}>Start Shopping</button></Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page">

            <div className="page-header">
                <p className="page-eyebrow">Account</p>
                <h1 className="page-title">My Orders</h1>
                <p className="page-sub">{ORDERS.length} orders placed</p>
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
            {ORDERS.map((order) => (
                <Link to={`/orders/${order.id}`} >
                    <div className="order-card" key={order.id} id={`order-${order.id}`}>

                        <div className="order-card-header">
                            <div>
                                <p className="order-card-id">Order #{order.id}</p>
                                <p className="order-card-date">{order.date}</p>
                            </div>
                            <span className={`order-status status-${order.status}`}>
                                {order.statusLabel}
                            </span>
                        </div>

                        <div className="order-card-body">
                            {/* Item thumbnails */}
                            <div className="order-items-preview">
                                {order.items.slice(0, 3).map((item, i) => (
                                    <div className="order-item-thumb" key={i} title={item.name}>
                                        <ItemIcon />
                                    </div>
                                ))}
                                {order.itemCount > 3 && (
                                    <div className="order-item-more">+{order.itemCount - 3}</div>
                                )}
                            </div>

                            <div className="order-card-meta">
                                <p className="order-total">{order.total}</p>
                                <p className="order-item-count">{order.itemCount} item{order.itemCount > 1 ? "s" : ""}</p>
                            </div>
                        </div>

                        <div className="order-card-actions">
                            <Link to={`/orders/${order.id}`} className="btn btn-outline btn-sm" id={`view-order-${order.id}`}>
                                View Details
                            </Link>
                            {order.status === "delivered" && (
                                <button className="btn btn-ghost btn-sm" id={`reorder-${order.id}`}>
                                    Reorder
                                </button>
                            )}
                            {order.status === "shipped" && (
                                <button className="btn btn-ghost btn-sm" id={`track-${order.id}`}>
                                    Track Package
                                </button>
                            )}
                        </div>

                    </div>
                </Link>
            ))}

        </div>
    );
};

export default OrderList;
