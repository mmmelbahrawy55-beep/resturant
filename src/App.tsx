import React, { useState, useEffect } from 'react';
import { MenuItem as MenuItemComponent } from './components/MenuItem';
import { MenuCategory } from './components/MenuCategory';
import { ReservationForm } from './components/ReservationForm';
import { Cart } from './components/Cart';
import { useMenuData } from './hooks/useMenuData';
import { useCart } from './hooks/useCart';
import { MenuItem, Reservation, MenuCategory as MenuCategoryType } from './types/menu';
import { formatDate, formatTime } from './utils/formatters';
import './styles/global.scss';

export const App: React.FC = () => {
  const { menu, loading, error } = useMenuData();
  const { items, addItem, removeItem, updateQuantity, clearCart, getTotal } = useCart();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryType>('BBQ');
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    try {
      import('./types/menu').then(module => {
        setReservations(module.SAMPLE_RESERVATIONS);
      });
    } catch (error) {
      console.error('Failed to load sample reservations:', error);
    }
  }, []);

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
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="logo">The Gourmet Bar</h1>
            <div className="header-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setIsReservationOpen(true)}
              >
                Reserve a Table
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setIsCartOpen(true)}
              >
                Cart ({items.reduce((total, item) => total + item.quantity, 0)})
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h2>Premium BBQ, Pizza, Burgers & Pies</h2>
              <p>Experience the perfect blend of authentic flavors with our premium selection of BBQ grills, artisanal pizzas, gourmet burgers, and classic pies.</p>
              <button 
                className="btn btn-primary"
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Our Menu
              </button>
            </div>
          </div>
        </section>

        <section id="menu" className="menu-section">
          <div className="container">
            <h2 className="section-title">Our Gourmet Menu</h2>
            
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
              <div className="loading">Loading premium menu...</div>
            )}

            {error && (
              <div className="error">Error: {error}</div>
            )}

            <div className="menu-grid">
              {filteredMenu.map(item => (
                <MenuItemComponent
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </section>

        {reservations.length > 0 && (
          <section className="reservations-section">
            <div className="container">
              <h2 className="section-title">Upcoming Reservations</h2>
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
          <div className="footer-content">
            <div className="footer-info">
              <h3>The Gourmet Bar</h3>
              <p>Premium BBQ, Pizza, Burgers & Pies</p>
            </div>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>123 Gourmet Avenue, Food City</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: orders@gourmetbar.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 The Gourmet Bar. All rights reserved.</p>
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
