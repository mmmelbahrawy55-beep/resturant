import React from 'react';
import { CartItem } from '../types/menu';
import { formatPrice } from '../utils/formatters';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem, onClose }) => {
  const getSubtotal = () => items.reduce((total, item) => total + item.price * item.quantity, 0);
  const getTax = (subtotal: number) => subtotal * 0.08; // 8% tax
  const getTotal = (subtotal: number, tax: number) => subtotal + tax;

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <button className="menu-btn" onClick={onClose}>Browse Menu</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    {item.notes && <p className="cart-item-notes">Note: {item.notes}</p>}
                  </div>
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="cart-item-quantity">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="cart-item-remove"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="cart-item-price">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal:</span>
                <span>{formatPrice(getSubtotal())}</span>
              </div>
              <div className="cart-summary-row">
                <span>Tax (8%):</span>
                <span>{formatPrice(getTax(getSubtotal()))}</span>
              </div>
              <div className="cart-summary-row total">
                <span>Total:</span>
                <span>{formatPrice(getTotal(getSubtotal(), getTax(getSubtotal())))}</span>
              </div>
            </div>
            
            <div className="cart-actions">
              <button className="clear-cart-btn" onClick={() => items.forEach(item => onRemoveItem(item.id))}>Clear Cart</button>
              <button className="checkout-btn">Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
