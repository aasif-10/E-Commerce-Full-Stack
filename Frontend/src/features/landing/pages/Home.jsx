import { useNavigate } from "react-router-dom";
import "../style/landing.css";


const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth/login")
  }

  const handleRegister = () => {
    navigate("/auth/register")
  }
  return (
    <div className="lp-root">

      {/* ───────────── NAV ───────────── */}
      <nav className="lp-nav">
        <a href="#" className="lp-logo">
          <span className="lp-logo-mark">●</span>LUXE
        </a>

        <ul className="lp-nav-links">
          <li><a href="#collections">Collections</a></li>
          <li><a href="#featured">Featured</a></li>
          <li><a href="#about">About</a></li>
        </ul>

        <div className="lp-nav-actions">
          <button onClick={handleLogin} className="lp-btn-ghost" id="nav-login-btn">Login</button>
          <button onClick={handleRegister} className="lp-btn-solid" id="nav-signup-btn">Sign Up</button>
        </div>
      </nav>

      {/* ───────────── HERO ───────────── */}
      <section className="lp-hero" id="hero">
        <div className="lp-hero-content">
          <p className="lp-hero-eyebrow">New Season · 2026</p>
          <h1 className="lp-hero-title">
            Style is not<br />
            a luxury,<br />
            <em>it's a choice.</em>
          </h1>
          <p className="lp-hero-sub">
            Curated essentials for the modern wardrobe. Minimalist by design, bold by nature.
          </p>
          <div className="lp-hero-cta">
            <button className="lp-btn-solid lp-btn-lg" id="hero-shop-btn">Shop Now</button>
            <button className="lp-btn-outline lp-btn-lg" id="hero-explore-btn">Explore Looks</button>
          </div>
        </div>

        <div className="lp-hero-visual">
          <div className="lp-hero-card lp-hero-card--back">
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&auto=format&fit=crop"
              alt="Fashion look"
              className="lp-hero-img"
            />
          </div>
          <div className="lp-hero-card lp-hero-card--front">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop"
              alt="Model in outfit"
              className="lp-hero-img"
            />
            <div className="lp-hero-badge">
              <span className="lp-badge-label">Trending</span>
              <span className="lp-badge-value">#1 Pick</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── STATS ───────────── */}
      <section className="lp-stats">
        <div className="lp-stat">
          <span className="lp-stat-num">12K+</span>
          <span className="lp-stat-label">Products</span>
        </div>
        <div className="lp-stat-divider" />
        <div className="lp-stat">
          <span className="lp-stat-num">98%</span>
          <span className="lp-stat-label">Satisfaction</span>
        </div>
        <div className="lp-stat-divider" />
        <div className="lp-stat">
          <span className="lp-stat-num">150+</span>
          <span className="lp-stat-label">Brands</span>
        </div>
        <div className="lp-stat-divider" />
        <div className="lp-stat">
          <span className="lp-stat-num">Free</span>
          <span className="lp-stat-label">Shipping Over ₹50</span>
        </div>
      </section>

      {/* ───────────── COLLECTIONS ───────────── */}
      <section className="lp-section" id="collections">
        <div className="lp-section-header">
          <h2 className="lp-section-title">Shop by Collection</h2>
          <a href="#" className="lp-link-arrow" id="view-all-collections">View all →</a>
        </div>

        <div className="lp-collections-grid">
          <div className="lp-collection-card lp-collection-card--wide" id="collection-women">
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop"
              alt="Women's Collection"
              className="lp-collection-img"
            />
            <div className="lp-collection-overlay">
              <span className="lp-collection-tag">Women</span>
              <h3 className="lp-collection-name">Summer Essentials</h3>
              <a href="#" className="lp-collection-cta">Shop →</a>
            </div>
          </div>

          <div className="lp-collection-card" id="collection-men">
            <img
              src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400&auto=format&fit=crop"
              alt="Men's Collection"
              className="lp-collection-img"
            />
            <div className="lp-collection-overlay">
              <span className="lp-collection-tag">Men</span>
              <h3 className="lp-collection-name">Sharp & Minimal</h3>
              <a href="#" className="lp-collection-cta">Shop →</a>
            </div>
          </div>

          <div className="lp-collection-card" id="collection-accessories">
            <img
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop"
              alt="Accessories Collection"
              className="lp-collection-img"
            />
            <div className="lp-collection-overlay">
              <span className="lp-collection-tag">Accessories</span>
              <h3 className="lp-collection-name">The Finishing Touch</h3>
              <a href="#" className="lp-collection-cta">Shop →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── FEATURED PRODUCTS ───────────── */}
      <section className="lp-section lp-section--dark" id="featured">
        <div className="lp-section-header">
          <h2 className="lp-section-title">Featured Products</h2>
          <a href="#" className="lp-link-arrow" id="view-all-products">View all →</a>
        </div>

        <div className="lp-products-grid">

          {[
            {
              id: "prod-1",
              img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop",
              tag: "Best Seller",
              name: "Classic Timepiece",
              price: "₹249",
            },
            {
              id: "prod-2",
              img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop",
              tag: "New",
              name: "Urban Runner",
              price: "₹189",
            },
            {
              id: "prod-3",
              img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop",
              tag: "Limited",
              name: "Sport Elite",
              price: "₹219",
            },
            {
              id: "prod-4",
              img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop",
              tag: "Sale",
              name: "Leather Tote",
              price: "₹159",
            },
          ].map((p) => (
            <div className="lp-product-card" id={p.id} key={p.id}>
              <div className="lp-product-img-wrap">
                <img src={p.img} alt={p.name} className="lp-product-img" />
                <span className="lp-product-tag">{p.tag}</span>
                <button className="lp-product-quick-add" id={`quick-add-${p.id}`}>
                  + Add to Cart
                </button>
              </div>
              <div className="lp-product-info">
                <h3 className="lp-product-name">{p.name}</h3>
                <span className="lp-product-price">{p.price}</span>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ───────────── BANNER ───────────── */}
      <section className="lp-banner" id="about">
        <div className="lp-banner-content">
          <p className="lp-banner-eyebrow">Our Promise</p>
          <h2 className="lp-banner-title">
            Crafted for those<br />who refuse the ordinary.
          </h2>
          <p className="lp-banner-body">
            Every product is hand-selected for quality, comfort, and lasting style.
            We believe great design should be accessible — without compromise.
          </p>
          <button className="lp-btn-solid lp-btn-lg" id="banner-learn-btn">Learn More</button>
        </div>
        <div className="lp-banner-visual">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&auto=format&fit=crop"
            alt="Brand story"
            className="lp-banner-img"
          />
        </div>
      </section>

      {/* ───────────── TESTIMONIALS ───────────── */}
      <section className="lp-section">
        <div className="lp-section-header lp-section-header--center">
          <h2 className="lp-section-title">What Customers Say</h2>
        </div>

        <div className="lp-testimonials-grid">
          {[
            {
              id: "review-1",
              name: "Sarah M.",
              role: "Fashion Blogger",
              text: "The quality is unmatched. Every piece I've ordered has exceeded my expectations. LUXE is my go-to for timeless style.",
              rating: 5,
            },
            {
              id: "review-2",
              name: "James K.",
              role: "Creative Director",
              text: "Clean, minimal, and incredibly well-made. Exactly what I look for in a brand. Fast shipping was a bonus.",
              rating: 5,
            },
            {
              id: "review-3",
              name: "Priya L.",
              role: "Entrepreneur",
              text: "From checkout to delivery — flawless experience. The packaging alone felt luxurious. Will be back for more.",
              rating: 5,
            },
          ].map((r) => (
            <div className="lp-testimonial-card" id={r.id} key={r.id}>
              <div className="lp-testimonial-stars">
                {"★".repeat(r.rating)}
              </div>
              <p className="lp-testimonial-text">"{r.text}"</p>
              <div className="lp-testimonial-author">
                <span className="lp-testimonial-name">{r.name}</span>
                <span className="lp-testimonial-role">{r.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── NEWSLETTER ───────────── */}
      <section className="lp-newsletter">
        <div className="lp-newsletter-inner">
          <h2 className="lp-newsletter-title">Stay in the Loop</h2>
          <p className="lp-newsletter-sub">
            Get early access to new collections and exclusive deals.
          </p>
          <form className="lp-newsletter-form" id="newsletter-form">
            <input
              className="lp-newsletter-input"
              id="newsletter-email"
              type="email"
              placeholder="your@email.com"
            />
            <button className="lp-btn-solid" id="newsletter-submit-btn" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ───────────── FOOTER ───────────── */}
      <footer className="lp-footer">
        <div className="lp-footer-top">
          <div className="lp-footer-brand">
            <a href="#" className="lp-logo">
              <span className="lp-logo-mark">●</span>LUXE
            </a>
            <p className="lp-footer-tagline">Modern style, delivered.</p>
          </div>

          <div className="lp-footer-links-group">
            <span className="lp-footer-heading">Shop</span>
            <a href="#">Women</a>
            <a href="#">Men</a>
            <a href="#">Accessories</a>
            <a href="#">Sale</a>
          </div>

          <div className="lp-footer-links-group">
            <span className="lp-footer-heading">Company</span>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
            <a href="#">Contact</a>
          </div>

          <div className="lp-footer-links-group">
            <span className="lp-footer-heading">Support</span>
            <a href="#">FAQ</a>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">Size Guide</a>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <span>© 2026 LUXE. All rights reserved.</span>
          <div className="lp-footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
