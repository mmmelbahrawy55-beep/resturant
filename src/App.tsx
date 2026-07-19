import React, { useState, useEffect, useRef } from 'react';
import { MenuItem as MenuItemComponent } from './components/MenuItem';
import { MenuCategory } from './components/MenuCategory';
import { ReservationForm } from './components/ReservationForm';
import { Cart } from './components/Cart';
import { useMenuData } from './hooks/useMenuData';
import { useCart } from './hooks/useCart';
import { MenuItem, Reservation, MenuCategory as MenuCategoryType } from './types/menu';
import { formatDate, formatTime } from './utils/formatters';
import './styles/global.scss';

const STATS = [
  { icon: '🍽️', value: '100+', label: 'Signature Dishes' },
  { icon: '🏆', value: '15', label: 'Years of Excellence' },
  { icon: '👨‍🍳', value: '12', label: 'Master Chefs' },
  { icon: '⭐', value: '4.9', label: 'Customer Rating' },
];

const FEATURES = [
  { icon: '🔥', title: 'Live Grill Station', desc: 'Watch our chefs craft your meal over open flames' },
  { icon: '🌿', title: 'Farm Fresh', desc: 'Locally sourced ingredients for authentic flavor' },
  { icon: '🍷', title: 'Premium Selection', desc: 'Curated wines and craft beverages' },
  { icon: '🎵', title: 'Live Music', desc: 'Enjoy live jazz every Friday & Saturday' },
];

export const App: React.FC = () => {
  const { menu, loading, error } = useMenuData();
  const { items, addItem, removeItem, updateQuantity, clearCart, getTotal } = useCart();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryType>('BBQ');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  
  const menuRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      import('./types/menu').then(module => {
        setReservations(module.SAMPLE_RESERVATIONS);
      });
    } catch (error) {
      console.error('Failed to load sample reservations:', error);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [menu]);

  const handleAddToCart = (menuItem: MenuItem) => {
    addItem(menuItem);
  };

  const handleReservationSubmit = (reservation: Reservation) => {
    setReservations(prev => [...prev, reservation]);
  };

  const filteredMenu = menu.filter(item => item.category === selectedCategory);
  const categories: MenuCategoryType[] = ['BBQ', 'PIZZA', 'BURGERS', 'PIES', 'DRINKS', 'DESSERTS'];

  return (
    <div className="app">
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <div className="logo-area">
              <div className="logo-icon">G</div>
              <div>
                <h1 className="logo">The Gourmet <span>Bar</span></h1>
                <p className="tagline">Premium Dining Experience</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn btn-outline" onClick={() => setIsReservationOpen(true)}>
                <span className="btn-icon">📅</span> Reserve
              </button>
              <button className="btn btn-gold" onClick={() => setIsCartOpen(true)}>
                <span className="btn-icon">🛒</span>
                Cart ({items.reduce((total, item) => total + item.quantity, 0)})
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <div className="hero-bg">
            <div className="hero-particles">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="particle" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }} />
              ))}
            </div>
          </div>
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">✦ EST. 2010 ✦</div>
              <h2 className="hero-title">
                Where Every Bite<br />
                <span className="gold-text">Tells a Story</span>
              </h2>
              <p className="hero-subtitle">
                Experience culinary artistry with our premium selection of BBQ grills, 
                artisanal pizzas, gourmet burgers, and handcrafted pies.
              </p>
              <div className="hero-actions">
                <button className="btn btn-gold btn-lg" onClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                  Explore Menu
                </button>
                <button className="btn btn-ghost btn-lg" onClick={() => setIsReservationOpen(true)}>
                  Book a Table
                </button>
              </div>
              <div className="hero-scroll-indicator">
                <div className="scroll-line"></div>
                <span>Scroll Down</span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section" ref={statsRef}>
          <div className="container">
            <div className="stats-grid">
              {STATS.map((stat, index) => (
                <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Why Choose Us</span>
              <h2 className="section-title">An Unforgettable Experience</h2>
              <p className="section-subtitle">Every detail is crafted to perfection</p>
            </div>
            <div className="features-grid">
              {FEATURES.map((feature, index) => (
                <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="menu-section" ref={menuRef}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Our Menu</span>
              <h2 className="section-title">Gourmet Collection</h2>
              <p className="section-subtitle">100+ handcrafted dishes prepared with passion</p>
            </div>
            
            <div className="menu-categories">
              {categories.map(category => {
                const count = menu.filter(item => item.category === category).length;
                return (
                  <MenuCategory
                    key={category}
                    category={category}
                    itemsCount={count}
                    isActive={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  />
                );
              })}
            </div>

            {loading && (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>Loading our gourmet menu...</p>
              </div>
            )}

            {error && (
              <div className="error">Error: {error}</div>
            )}

            <div className="menu-grid">
              {filteredMenu.map((item, index) => (
                <div key={item.id} className="menu-item-wrapper" style={{ animationDelay: `${index * 0.05}s` }}>
                  <MenuItemComponent
                    item={item}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>

            {filteredMenu.length === 0 && !loading && (
              <div className="empty-state">
                <p>No items in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-card">
              <div className="cta-content">
                <span className="cta-badge">Special Offer</span>
                <h2>Book Your Table Today</h2>
                <p>Reserve your spot and enjoy a complimentary appetizer with every booking.</p>
                <button className="btn btn-gold btn-lg" onClick={() => setIsReservationOpen(true)}>
                  Make Reservation
                </button>
              </div>
              <div className="cta-image">
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop" alt="Fine Dining" />
              </div>
            </div>
          </div>
        </section>

        {reservations.length > 0 && (
          <section className="reservations-section">
            <div className="container">
              <div className="section-header">
                <span className="section-badge">Reservations</span>
                <h2 className="section-title">Your Bookings</h2>
              </div>
              <div className="reservations-grid">
                {reservations.map(reservation => (
                  <div key={reservation.id} className="reservation-card">
                    <div className="reservation-info">
                      <h3>{reservation.name}</h3>
                      <p>{formatDate(reservation.date)} at {formatTime(reservation.time)}</p>
                      <p>{reservation.guests} guests</p>
                    </div>
                    <div className={`reservation-status ${reservation.status.toLowerCase()}`}>{reservation.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">G</div>
                <h3>The Gourmet Bar</h3>
              </div>
              <p>Premium dining experience since 2010. Where culinary artistry meets warm hospitality.</p>
              <div className="social-links">
                <a href="#" className="social-link">FB</a>
                <a href="#" className="social-link">IG</a>
                <a href="#" className="social-link">TW</a>
              </div>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#menu">Our Menu</a></li>
                <li><a href="#" onClick={() => setIsReservationOpen(true)}>Reservations</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>📍 123 Gourmet Avenue, Food City</p>
              <p>📞 (123) 456-7890</p>
              <p>✉️ orders@gourmetbar.com</p>
              <p className="hours">🕐 Sun-Thu: 11AM-11PM | Fri-Sat: 11PM-1AM</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 The Gourmet Bar. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {isCartOpen && (
        <Cart
          items={items}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      {isReservationOpen && (
        <ReservationForm
          onSubmit={handleReservationSubmit}
          onClose={() => setIsReservationOpen(false)}
        />
      )}
    </div>
  );
};
