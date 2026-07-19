import React from 'react';
import { MenuItem, MenuCategory } from '../types/menu';
import { formatPrice } from '../utils/formatters';

interface MenuItemProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart }) => {
  const getCategoryColor = (category: MenuCategory): string => {
    const colors: Record<MenuCategory, string> = {
      BBQ: '#dc2626',
      PIZZA: '#ea580c',
      BURGERS: '#16a34a',
      PIES: '#d97706',
      DRINKS: '#2563eb',
      DESSERTS: '#9333ea',
    };
    return colors[category];
  };

  return (
    <div className="menu-item">
      {item.image && (
        <div className="menu-item-image">
          <img src={item.image} alt={item.name} loading="lazy" />
          <div className="menu-item-badges-overlay">
            {item.isPopular && <span className="badge popular">Popular</span>}
            {item.isNew && <span className="badge new">New</span>}
            {item.isSeasonal && <span className="badge seasonal">Seasonal</span>}
          </div>
          <div className="menu-item-category-badge" style={{ backgroundColor: getCategoryColor(item.category) }}>
            {item.category}
          </div>
        </div>
      )}
      {!item.image && (
        <div className="menu-item-header">
          <div className="menu-item-category" style={{ backgroundColor: getCategoryColor(item.category) }}>
            {item.category}
          </div>
          <div className="menu-item-badges">
            {item.isVegetarian && <span className="badge vegetarian">Veg</span>}
            {item.isSpicy && <span className="badge spicy">Spicy</span>}
            {item.isPopular && <span className="badge popular">Popular</span>}
            {item.isNew && <span className="badge new">New</span>}
            {item.isSeasonal && <span className="badge seasonal">Seasonal</span>}
          </div>
        </div>
      )}
      <div className="menu-item-content">
        <div className="menu-item-name-row">
          <h3 className="menu-item-name">{item.name}</h3>
          <div className="menu-item-price">{formatPrice(item.price)}</div>
        </div>
        <p className="menu-item-description">{item.description}</p>
        <div className="menu-item-footer">
          <div className="menu-item-tags">
            {item.isVegetarian && <span className="badge vegetarian">Veg</span>}
            {item.isSpicy && <span className="badge spicy">Spicy</span>}
          </div>
          <button
            className="menu-item-add-btn"
            onClick={() => onAddToCart(item)}
            disabled={!item.available}
          >
            {item.available ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};
