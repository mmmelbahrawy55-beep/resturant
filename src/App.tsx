import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MenuItem as MenuItemComponent } from './components/MenuItem';
import { MenuCategory } from './components/MenuCategory';
import { ReservationForm } from './components/ReservationForm';
import { Cart } from './components/Cart';
import { QuickView } from './components/QuickView';
import { useMenuData } from './hooks/useMenuData';
import { useCart } from './hooks/useCart';
import { useApp } from './context/AppContext';
import { useScrollReveal } from './hooks/useAnimations';
import { MenuItem, Reservation, MenuCategory as MenuCategoryType } from './types/menu';
import { formatDate, formatTime } from './utils/formatters';
import './styles/global.scss';

const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop', label: 'Fine Dining' },
  { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop', label: 'Grilled Perfection' },
  { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop', label: 'Artisan Pizza' },
  { url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop', label: 'Gourmet Burgers' },
  { url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop', label: 'Sweet Desserts' },
  { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop', label: 'Chef at Work' },
];

export const App: React.FC = () => {
  const { t, language, setLanguage, theme, setTheme } = useApp();
  const { menu, loading, error } = useMenuData();
  const { items, addItem, removeItem, updateQuantity, clearCart, getTotal } = useCart();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryType>('BBQ');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const menuRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const statsReveal = useScrollReveal(0.3);
  const featuresReveal = useScrollReveal(0.2);
  const menuReveal = useScrollReveal(0.1);
  const ctaReveal = useScrollReveal(0.2);
  const galleryReveal = useScrollReveal(0.2);
  const chefsReveal = useScrollReveal(0.2);

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
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (menuItem: MenuItem) => {
    addItem(menuItem);
  };

  const handleReservationSubmit = (reservation: Reservation) => {
    setReservations(prev => [...prev, reservation]);
  };

  const filteredMenu = useMemo(() => {
    let items = menu.filter(item => item.category === selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = menu.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return items;
  }, [menu, selectedCategory, searchQuery]);

  const chefsPicks = useMemo(() => 
    menu.filter(item => item.isPopular).slice(0, 6),
    [menu]
  );

  const categories: MenuCategoryType[] = ['BBQ', 'PIZZA', 'BURGERS', 'PIES', 'DRINKS', 'DESSERTS'];

  const stats = [
    { icon: '🍽️', value: 100, suffix: '+', label: t('dishes') },
    { icon: '🏆', value: 15, suffix: '', label: t('years') },
    { icon: '👨‍🍳', value: 12, suffix: '', label: t('chefs') },
    { icon: '⭐', value: 4.9, suffix: '', label: t('rating') },
  ];

  const features = [
    { icon: '🔥', title: t('feature1Title'), desc: t('feature1Desc') },
    { icon: '🌿', title: t('feature2Title'), desc: t('feature2Desc') },
    { icon: '🍷', title: t('feature3Title'), desc: t('feature3Desc') },
    { icon: '🎵', title: t('feature4Title'), desc: t('feature4Desc') },
  ];

  const categoryLabels: Record<MenuCategoryType, string> = {
    BBQ: t('catBBQ'),
    PIZZA: t('catPizza'),
    BURGERS: t('catBurgers'),
    PIES: t('catPies'),
    DRINKS: t('catDrinks'),
    DESSERTS: t('catDesserts'),
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`app ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <div className="logo-area">
              <div className="logo-icon">G</div>
              <div>
                <h1 className="logo">{t('logo')}</h1>
                <p className="tagline">{t('tagline')}</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button className="lang-toggle" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
                {language === 'en' ? 'عربي' : 'EN'}
              </button>
              <button className="btn btn-outline" onClick={() => setIsReservationOpen(true)}>
                <span className="btn-icon">📅</span> {t('reserve')}
              </button>
              <button className="btn btn-gold cart-btn" onClick={() => setIsCartOpen(true)}>
                <span className="btn-icon">🛒</span>
                {t('cart')}
                {items.length > 0 && (
                  <span className="cart-badge">{items.reduce((total, item) => total + item.quantity, 0)}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="hero" ref={heroRef}>
          <div className="hero-bg">
            <div className="hero-bg-image" style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop)'
            }} />
            <div className="hero-overlay" />
            <div className="hero-particles">
              {Array.from({ length: 30 }).map((_, i) => (
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
              <div className="hero-badge">{t('heroBadge')}</div>
              <h2 className="hero-title">
                {t('heroTitle1')}<br />
                <span className="gold-text">{t('heroTitle2')}</span>
              </h2>
              <p className="hero-subtitle">{t('heroSubtitle')}</p>
              <div className="hero-actions">
                <button className="btn btn-gold btn-lg" onClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                  {t('exploreMenu')}
                </button>
                <button className="btn btn-ghost btn-lg" onClick={() => setIsReservationOpen(true)}>
                  {t('bookTable')}
                </button>
              </div>
              <div className="hero-scroll-indicator">
                <div className="scroll-line"></div>
                <span>{t('scrollDown')}</span>
              </div>
            </div>
          </div>
          <div className="hero-open-badge">
            <span className="pulse-dot"></span>
            {t('openNow')}
          </div>
        </section>

        <section className="stats-section" ref={statsReveal.ref}>
          <div className="container">
            <div className={`stats-grid ${statsReveal.isVisible ? 'visible' : ''}`}>
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="features-section" ref={featuresReveal.ref}>
          <div className="container">
            <div className={`section-header ${featuresReveal.isVisible ? 'visible' : ''}`}>
              <span className="section-badge">{t('whyChooseUs')}</span>
              <h2 className="section-title">{t('experienceTitle')}</h2>
              <p className="section-subtitle">{t('experienceSubtitle')}</p>
            </div>
            <div className={`features-grid ${featuresReveal.isVisible ? 'visible' : ''}`}>
              {features.map((feature, index) => (
                <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="chefs-section" ref={chefsReveal.ref}>
          <div className="container">
            <div className={`section-header ${chefsReveal.isVisible ? 'visible' : ''}`}>
              <span className="section-badge">👨‍🍳 {t('chefsPicks')}</span>
              <h2 className="section-title">{t('chefsPicks')}</h2>
              <p className="section-subtitle">{t('chefsPicksSubtitle')}</p>
            </div>
            <div className={`chefs-grid ${chefsReveal.isVisible ? 'visible' : ''}`}>
              {chefsPicks.map((item, index) => (
                <div key={item.id} className="chefs-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="chefs-card-image">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    <div className="chefs-card-overlay">
                      <button className="btn btn-gold btn-sm" onClick={() => setQuickViewItem(item)}>
                        {t('quickView')}
                      </button>
                    </div>
                  </div>
                  <div className="chefs-card-content">
                    <h3>{item.name}</h3>
                    <p className="chefs-card-price">{language === 'ar' ? 'ر.س' : '$'}{item.price.toFixed(2)}</p>
                    <button className="btn btn-primary btn-sm" onClick={() => handleAddToCart(item)}>
                      {t('orderNow')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="menu-section" ref={(el) => { menuRef.current = el; menuReveal.ref.current = el; }}>
          <div className="container">
            <div className={`section-header ${menuReveal.isVisible ? 'visible' : ''}`}>
              <span className="section-badge">{t('ourMenu')}</span>
              <h2 className="section-title">{t('menuTitle')}</h2>
              <p className="section-subtitle">{t('menuSubtitle')}</p>
            </div>

            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>
            
            {!searchQuery && (
              <div className="menu-categories">
                {categories.map(category => {
                  const count = menu.filter(item => item.category === category).length;
                  return (
                    <MenuCategory
                      key={category}
                      category={category}
                      label={categoryLabels[category]}
                      itemsCount={count}
                      isActive={selectedCategory === category}
                      onClick={() => setSelectedCategory(category)}
                    />
                  );
                })}
              </div>
            )}

            {loading && (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>{t('loading')}</p>
              </div>
            )}

            {error && <div className="error">{error}</div>}

            <div className="menu-grid">
              {filteredMenu.map((item, index) => (
                <div key={item.id} className="menu-item-wrapper" style={{ animationDelay: `${index * 0.05}s` }}>
                  <MenuItemComponent
                    item={item}
                    onAddToCart={handleAddToCart}
                    onQuickView={() => setQuickViewItem(item)}
                  />
                </div>
              ))}
            </div>

            {filteredMenu.length === 0 && !loading && (
              <div className="empty-state">
                <div className="empty-icon">🍽️</div>
                <p>{t('noItems')}</p>
              </div>
            )}
          </div>
        </section>

        <section className="gallery-section" ref={galleryReveal.ref}>
          <div className="container">
            <div className={`section-header ${galleryReveal.isVisible ? 'visible' : ''}`}>
              <span className="section-badge">📸 {t('gallery')}</span>
              <h2 className="section-title">{t('gallery')}</h2>
              <p className="section-subtitle">{t('gallerySubtitle')}</p>
            </div>
            <div className={`gallery-grid ${galleryReveal.isVisible ? 'visible' : ''}`}>
              {GALLERY_IMAGES.map((img, index) => (
                <div key={index} className="gallery-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <img src={img.url} alt={img.label} loading="lazy" />
                  <div className="gallery-item-overlay">
                    <span>{img.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section" ref={ctaReveal.ref}>
          <div className="container">
            <div className={`cta-card ${ctaReveal.isVisible ? 'visible' : ''}`}>
              <div className="cta-content">
                <span className="cta-badge">{t('specialOffer')}</span>
                <h2>{t('ctaTitle')}</h2>
                <p>{t('ctaDesc')}</p>
                <button className="btn btn-gold btn-lg" onClick={() => setIsReservationOpen(true)}>
                  {t('makeReservation')}
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
                <span className="section-badge">{t('reservationsLink')}</span>
                <h2 className="section-title">{t('reservationsLink')}</h2>
              </div>
              <div className="reservations-grid">
                {reservations.map(reservation => (
                  <div key={reservation.id} className="reservation-card">
                    <div className="reservation-info">
                      <h3>{reservation.name}</h3>
                      <p>{formatDate(reservation.date)} at {formatTime(reservation.time)}</p>
                      <p>{reservation.guests} {language === 'ar' ? 'ضيوف' : 'guests'}</p>
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
                <h3>{t('logo')}</h3>
              </div>
              <p>{t('footerDesc')}</p>
              <div className="social-links">
                <a href="#" className="social-link">FB</a>
                <a href="#" className="social-link">IG</a>
                <a href="#" className="social-link">TW</a>
              </div>
            </div>
            <div className="footer-links">
              <h4>{t('quickLinks')}</h4>
              <ul>
                <li><a href="#menu">{t('menuLink')}</a></li>
                <li><a href="#" onClick={() => setIsReservationOpen(true)}>{t('reservationsLink')}</a></li>
                <li><a href="#">{t('aboutUs')}</a></li>
                <li><a href="#">{t('contact')}</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>{t('contactUs')}</h4>
              <p>📍 123 Gourmet Avenue, Food City</p>
              <p>📞 (123) 456-7890</p>
              <p>✉️ orders@gourmetbar.com</p>
              <p className="hours">🕐 {t('workingHours')}</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t('copyright')}</p>
            <div className="footer-bottom-links">
              <a href="#">{t('privacy')}</a>
              <a href="#">{t('terms')}</a>
            </div>
          </div>
        </div>
      </footer>

      {items.length > 0 && (
        <div className="floating-cart-bar">
          <div className="floating-cart-info">
            <span className="floating-cart-count">{items.reduce((t, i) => t + i.quantity, 0)} {language === 'ar' ? 'أصناف' : 'items'}</span>
            <span className="floating-cart-total">{language === 'ar' ? 'ر.س' : '$'}{getTotal().toFixed(2)}</span>
          </div>
          <button className="btn btn-gold" onClick={() => setIsCartOpen(true)}>
            {t('checkout')}
          </button>
        </div>
      )}

      {showBackToTop && (
        <button className="back-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}

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

      {quickViewItem && (
        <QuickView
          item={quickViewItem}
          onAddToCart={handleAddToCart}
          onClose={() => setQuickViewItem(null)}
        />
      )}
    </div>
  );
};

const StatCard: React.FC<{ stat: { icon: string; value: number; suffix: string; label: string }; index: number }> = ({ stat, index }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 2000;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * stat.value);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.value]);

  return (
    <div className="stat-card" ref={ref} style={{ animationDelay: `${index * 0.15}s` }}>
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-value">{stat.value % 1 !== 0 ? count.toFixed(1) : Math.round(count)}{stat.suffix}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
};
