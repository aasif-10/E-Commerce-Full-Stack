import { Link, Navigate } from "react-router-dom";
import "../style/shop.css";
import { useAuth } from "../../auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { useCart } from "../../cart/hooks/useCart";
import ProductCard from "../components/ProductCard";

const PRODUCTS = [
  {
    id: 1,
    name: "Classic Timepiece",
    description: "A timeless addition to any wardrobe.",
    category: "Accessories",
    price: "₹249",
    stock: 15,
    tag: "Best Seller",
  },
];

const FILTERS = ["All", "Men", "Women", "Footwear", "Bags", "Accessories"];

const ProductList = () => {
  const { isVerified, handleGetMe, loading, setLoading } = useAuth();
  const [initialCheck, setInitialCheck] = useState(true);

  const { products, error, handleGetProducts, handleAddToCart } = useProduct();
  const { handleGetCartItems } = useCart();

  const AddToCart = async (productId, quantity) => {
    try {
      await handleAddToCart(productId, quantity);
      await handleGetCartItems();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        await handleGetMe();
        await handleGetProducts();
      } finally {
        setInitialCheck(false);
      }
    };
    checkUser();
  }, []);

  if (loading || initialCheck) {
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

  if (!isVerified) {
    return <Navigate to={"/auth/verify"} />;
  }

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <p className="page-eyebrow">Explore</p>
        <h1 className="page-title">All Products</h1>
        <p className="page-sub">{products.length} items available</p>
      </div>

      {error && (
        <div
          className="error-banner"
          style={{
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid #f87171",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p style={{ margin: 0, fontWeight: 500 }}>{error}</p>
        </div>
      )}

      {/* Toolbar */}
      <div className="products-toolbar">
        <div className="products-search-wrap">
          <svg
            className="products-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            id="products-search"
            className="input products-search"
            type="search"
            placeholder="Search products…"
          />
        </div>

        <div className="products-filter-row">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-chip${f === "All" ? " active" : ""}`}
              id={`filter-${f.toLowerCase()}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="products-grid">
        {products.map((p) => (
          <ProductCard p={p} key={p._id} AddToCart={AddToCart}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
