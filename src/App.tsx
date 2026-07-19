import React, { useState, useEffect, useRef } from 'react';
import { MenuItem as MenuItemComponent } from './components/MenuItem';
import { MenuCategory } from './components/MenuCategory';
import { ReservationForm } from './components/ReservationForm';
import { Cart } from './components/Cart';
import { useMenuData } from './hooks/useMenuData';
import { useCart } from './hooks/useCart';
import { useApp } from './context/AppContext';
import { MenuItem, Reservation, MenuCategory as MenuCategoryType } from './types/menu';
import { formatDate, formatTime } from './utils/formatters';
import './styles/global.scss';

export const App: React.FC = () => {
  const { t, language, setLanguage, theme, setTheme } = useApp();
  const { menu, loading, error } = useMenuData();
  const { items, addItem, removeItem, updateQuantity, clearCart, getTotal } = useCart();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryType>('BBQ');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [scrolled, setScrolled] = useState(false);
  
  const menuRef = useRef<HTMLElement>(null);

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

  const handleAddToCart = (menuItem: MenuItem) => {
    addItem(menuItem);
  };

  const handleReservationSubmit = (reservation: Reservation) => {
    setReservations(prev => [...prev, reservation]);
  };

  const filteredMenu = menu.filter(item => item.category === selectedCategory);
  const categories: MenuCategoryType[] = ['BBQ', 'PIZZA', 'BURGERS', 'PIES', 'DRINKS', 'DESSERTS'];

  const stats = [
    { icon: '🍽️', value: '100+', label: t('dishes') },
    { icon: '🏆', value: '15', label: t('years') },
    { icon: '👨‍🍳', value: '12', label: t('chefs') },
    { icon: '⭐', value: '4.9', label: t('rating') },
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
              <button 
                className="theme-toggle"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button 
                className="lang-toggle"
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              >
                {language === 'en' ? 'عربي' : 'EN'}
              </button>
              <button className="btn btn-outline" onClick={() => setIsReservationOpen(true)}>
                <span className="btn-icon">📅</span> {t('reserve')}
              </button>
              <button className="btn btn-gold" onClick={() => setIsCartOpen(true)}>
                <span className="btn-icon">🛒</span>
                {t('cart')} ({items.reduce((total, item) => total + item.quantity, 0)})
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
        </section>

        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, index) => (
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
              <span className="section-badge">{t('whyChooseUs')}</span>
              <h2 className="section-title">{t('experienceTitle')}</h2>
              <p className="section-subtitle">{t('experienceSubtitle')}</p>
            </div>
            <div className="features-grid">
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

        <section id="menu" className="menu-section" ref={menuRef}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge">{t('ourMenu')}</span>
              <h2 className="section-title">{t('menuTitle')}</h2>
              <p className="section-subtitle">{t('menuSubtitle')}</p>
            </div>
            
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

            {loading && (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>{t('loading')}</p>
              </div>
            )}

            {error && (
              <div className="error">{error}</div>
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
                <p>{t('noItems')}</p>
              </div>
            )}
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-card">
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
