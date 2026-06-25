import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import "../style/shop.css";
import { useAuth } from "../../auth/hooks/useAuth";

const PRODUCTS = {
  1: {
    id: 1,
    name: "Classic Timepiece",
    category: "Accessories",
    price: "$249",
    originalPrice: "$320",
    tag: "Best Seller",
    rating: 5,
    reviews: 142,
    desc: "A timeless statement piece crafted from premium stainless steel with a sapphire-coated crystal face. Designed for those who value precision and elegance in equal measure.",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Stainless Steel",
    sku: "LX-001-SS",
    stock: "In Stock",
  },
  2: {
    id: 2,
    name: "Urban Runner",
    category: "Footwear",
    price: "$189",
    originalPrice: null,
    tag: "New",
    rating: 4,
    reviews: 87,
    desc: "Built for city streets, the Urban Runner combines performance foam cushioning with a sleek, minimal silhouette. Breathable mesh upper keeps you moving in comfort.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    material: "Mesh & Foam",
    sku: "LX-002-UR",
    stock: "In Stock",
  },
  3: {
    id: 3,
    name: "Sport Elite",
    category: "Footwear",
    price: "$219",
    originalPrice: null,
    tag: "Limited",
    rating: 5,
    reviews: 56,
    desc: "Limited-edition athletic shoe featuring carbon fibre reinforced soles and a race-inspired design. Only 500 pairs worldwide.",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    material: "Carbon Fibre / Knit",
    sku: "LX-003-SE",
    stock: "Only 12 left",
  },
  4: {
    id: 4,
    name: "Leather Tote",
    category: "Bags",
    price: "$159",
    originalPrice: "$220",
    tag: "Sale",
    rating: 5,
    reviews: 213,
    desc: 'Full-grain Italian leather tote with an open top, interior zip pocket, and detachable key clip. Fits a 15" laptop with room to spare.',
    sizes: ["One Size"],
    material: "Italian Leather",
    sku: "LX-004-LT",
    stock: "In Stock",
  },
  5: {
    id: 5,
    name: "Linen Blazer",
    category: "Men",
    price: "$329",
    originalPrice: null,
    tag: "New",
    rating: 4,
    reviews: 39,
    desc: "A relaxed yet refined single-breasted blazer cut from 100% Belgian linen. Perfect for summer occasions.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    material: "100% Belgian Linen",
    sku: "LX-005-LB",
    stock: "In Stock",
  },
  6: {
    id: 6,
    name: "Silk Midi Dress",
    category: "Women",
    price: "$279",
    originalPrice: null,
    tag: "Trending",
    rating: 5,
    reviews: 178,
    desc: "Effortless drape in pure mulberry silk. Midi length, adjustable spaghetti straps, and a subtle bias cut for a figure-flattering silhouette.",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "100% Mulberry Silk",
    sku: "LX-006-SM",
    stock: "In Stock",
  },
  7: {
    id: 7,
    name: "Canvas Backpack",
    category: "Bags",
    price: "$135",
    originalPrice: null,
    tag: "",
    rating: 4,
    reviews: 95,
    desc: "Waxed cotton canvas with leather trim. Padded laptop sleeve, multiple internal pockets, and solid brass hardware.",
    sizes: ["One Size"],
    material: "Waxed Cotton Canvas",
    sku: "LX-007-CB",
    stock: "In Stock",
  },
  8: {
    id: 8,
    name: "Wool Overcoat",
    category: "Men",
    price: "$499",
    originalPrice: null,
    tag: "New",
    rating: 5,
    reviews: 61,
    desc: "Double-breasted overcoat in Italian boiled wool. Structured shoulders and a clean, minimalist silhouette that works from boardroom to weekend.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    material: "Italian Boiled Wool",
    sku: "LX-008-WO",
    stock: "In Stock",
  },
};

const BagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const ProductDetails = () => {
  const { id } = useParams();
  const product = PRODUCTS[id] || PRODUCTS[1];

  const { isVerified } = useAuth();

  if (!isVerified) {
    return <Navigate to={"/auth/verify"} />;
  }

  return (
    <div className="page">
      {/* Breadcrumb */}
      <p className="product-breadcrumb">
        <Link to="/products">Shop</Link>
        {" / "}
        <Link to="/products">{product.category}</Link>
        {" / "}
        {product.name}
      </p>

      <div className="product-layout">
        {/* Gallery placeholder */}
        <div className="product-gallery" id="product-gallery">
          <BagIcon className="product-gallery-icon" />
        </div>

        {/* Info */}
        <div className="product-info">
          {product.tag && (
            <span
              className="tag tag-dark"
              style={{ marginBottom: 12, display: "inline-block" }}
            >
              {product.tag}
            </span>
          )}

          <h1 className="product-name">{product.name}</h1>

          <div className="product-rating">
            <span className="product-stars">
              {"★".repeat(product.rating)}
              {"☆".repeat(5 - product.rating)}
            </span>
            <span className="product-reviews">({product.reviews} reviews)</span>
          </div>

          <div className="product-price">
            {product.price}
            {product.originalPrice && (
              <span
                style={{
                  fontSize: "1rem",
                  color: "#aaa",
                  textDecoration: "line-through",
                  marginLeft: 12,
                  fontWeight: 400,
                }}
              >
                {product.originalPrice}
              </span>
            )}
          </div>

          <p className="product-desc">{product.desc}</p>

          {/* Size */}
          <div className="product-options">
            <p className="product-option-label">Size</p>
            <div className="product-size-grid">
              {product.sizes.map((s) => (
                <button key={s} className="size-chip" id={`size-${s}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="product-options">
            <p className="product-option-label">Quantity</p>
            <div className="product-qty">
              <button
                className="qty-btn"
                id="qty-decrease"
                aria-label="Decrease"
              >
                −
              </button>
              <span className="qty-val">1</span>
              <button
                className="qty-btn"
                id="qty-increase"
                aria-label="Increase"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="product-actions">
            <button
              className="btn btn-solid btn-lg"
              id="add-to-cart-btn"
              style={{ flex: 1 }}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-outline btn-lg"
              id="wishlist-btn"
              aria-label="Wishlist"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Meta */}
          <div className="product-meta">
            <div className="product-meta-row">
              <span className="product-meta-key">SKU</span>
              <span className="product-meta-val">{product.sku}</span>
            </div>
            <div className="product-meta-row">
              <span className="product-meta-key">Material</span>
              <span className="product-meta-val">{product.material}</span>
            </div>
            <div className="product-meta-row">
              <span className="product-meta-key">Category</span>
              <span className="product-meta-val">{product.category}</span>
            </div>
            <div className="product-meta-row">
              <span className="product-meta-key">Availability</span>
              <span
                className="product-meta-val"
                style={{
                  color: product.stock.startsWith("Only")
                    ? "#e67e22"
                    : "#27ae60",
                }}
              >
                {product.stock}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
