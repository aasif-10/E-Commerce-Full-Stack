import { Link, Navigate } from "react-router-dom";
import "../style/shop.css";
import { useAuth } from "../../auth/hooks/useAuth";
import { useEffect, useState } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "Classic Timepiece",
    category: "Accessories",
    price: "$249",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Urban Runner",
    category: "Footwear",
    price: "$189",
    tag: "New",
  },
  {
    id: 3,
    name: "Sport Elite",
    category: "Footwear",
    price: "$219",
    tag: "Limited",
  },
  { id: 4, name: "Leather Tote", category: "Bags", price: "$159", tag: "Sale" },
  { id: 5, name: "Linen Blazer", category: "Men", price: "$329", tag: "New" },
  {
    id: 6,
    name: "Silk Midi Dress",
    category: "Women",
    price: "$279",
    tag: "Trending",
  },
  { id: 7, name: "Canvas Backpack", category: "Bags", price: "$135", tag: "" },
  { id: 8, name: "Wool Overcoat", category: "Men", price: "$499", tag: "New" },
];

const FILTERS = ["All", "Men", "Women", "Footwear", "Bags", "Accessories"];

const ProductIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const ProductList = () => {
  const { isVerified, handleGetMe, loading } = useAuth();
  const [initialCheck, setInitialCheck] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await handleGetMe();
      } finally {
        setInitialCheck(false);
      }
    };
    checkUser();
  }, []);

  if (loading || initialCheck) {
    return (
      <div className="page" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
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
        <p className="page-sub">{PRODUCTS.length} items available</p>
      </div>

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
        {PRODUCTS.map((p) => (
          <Link
            to={`/products/${p.id}`}
            key={p.id}
            style={{ textDecoration: "none" }}
          >
            <div className="pcard" id={`pcard-${p.id}`}>
              <div className="pcard-img-wrap">
                <ProductIcon className="pcard-placeholder" />
                {p.tag && (
                  <span className="pcard-tag tag tag-dark">{p.tag}</span>
                )}
              </div>
              <div className="pcard-body">
                <p className="pcard-name">{p.name}</p>
                <p className="pcard-category">{p.category}</p>
                <div className="pcard-footer">
                  <span className="pcard-price">{p.price}</span>
                  <button
                    className="pcard-add"
                    id={`add-to-cart-${p.id}`}
                    onClick={(e) => e.preventDefault()}
                    aria-label="Add to cart"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
