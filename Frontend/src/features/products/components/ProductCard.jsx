import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

const ProductIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

const ProductCard = ({ p, AddToCart }) => {
    const [quantity, setQuantity] = useState(0);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState("");
    const { loading } = useAuth();

    const handleIncrease = (e) => {
        e.preventDefault()
        setQuantity(quantity + 1);
        setError("");
    }

    const handleDecrease = (e) => {
        e.preventDefault()
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
        setError("");
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        if (quantity === 0) return;

        try {
            setIsAdding(true);
            setError("");
            await AddToCart(p._id, quantity);
            setQuantity(0);
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to add to cart";
            setError(msg);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <Link
            to={`/products/${p._id}`}
            key={p.id}
            style={{ textDecoration: "none" }}
        >
            <div className="pcard" id={`pcard-${p.id}`}>
                <div className="pcard-img-wrap">
                    {/* <ProductIcon className="pcard-placeholder" /> */}
                    <img src={p.imageUrl} alt={p.name} className="pcard-img" />
                    {p.tag && (
                        <span className="pcard-tag tag tag-dark">{p.tag}</span>
                    )}
                </div>
                <div className="pcard-body">
                    <p className="pcard-name">{p.name}</p>
                    <p className="pcard-category">{p.category}</p>

                    <div className="pcard-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", flexWrap: "wrap", gap: "8px" }}>
                        <span className="pcard-price">₹{p.price}</span>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "6px",
                                    overflow: "hidden",
                                    backgroundColor: "#f9fafb"
                                }}
                            >
                                <button
                                    onClick={handleDecrease}
                                    style={{ background: "none", border: "none", padding: "6px", cursor: quantity > 0 ? "pointer" : "not-allowed", display: "flex", alignItems: "center", color: quantity > 0 ? "#374151" : "#d1d5db" }}
                                    disabled={quantity <= 0}
                                    aria-label="Decrease"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </button>
                                <span style={{ minWidth: "24px", textAlign: "center", fontSize: "14px", fontWeight: "500", color: "#111827" }}>{quantity}</span>
                                <button
                                    onClick={handleIncrease}
                                    style={{ background: "none", border: "none", padding: "6px", cursor: "pointer", display: "flex", alignItems: "center", color: "#374151" }}
                                    aria-label="Increase"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </button>
                            </div>
                            <button
                                className="pcard-add btn btn-solid"
                                id={`add-to-cart-${p._id}`}
                                onClick={handleAdd}
                                disabled={isAdding || quantity === 0}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "36px",
                                    height: "36px",
                                    padding: "0",
                                    borderRadius: "6px",
                                    opacity: (isAdding || quantity === 0) ? 0.7 : 1,
                                    cursor: (isAdding || quantity === 0) ? "not-allowed" : "pointer",
                                }}
                                aria-label="Add to cart"
                            >
                                {isAdding ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                        <line x1="3" y1="6" x2="21" y2="6" />
                                        <line x1="12" y1="10" x2="12" y2="16" />
                                        <line x1="9" y1="13" x2="15" y2="13" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <p style={{ color: "#b91c1c", fontSize: "12px", margin: "8px 0 0 0", textAlign: "right", width: "100%" }}>
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default ProductCard