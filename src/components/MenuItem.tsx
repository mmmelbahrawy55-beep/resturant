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
      PIZZA: '#ef4444',
      BURGERS: '#16a34a',
      PIES: '#f59e0b',
      DRINKS: '#3b82f6',
      DESSERTS: '#a21caf',
    };
    return colors[category];
  };

  return (
    <div className="menu-item">
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
      <div className="menu-item-content">
        <h3 className="menu-item-name">{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>
        {item.allergens && item.allergens.length > 0 && (
          <div className="menu-item-allergens">
            Allergens: {item.allergens.join(', ')}
          </div>
        )}
      </div>
      <div className="menu-item-footer">
        <div className="menu-item-price">{formatPrice(item.price)}</div>
        <button
          className="menu-item-add-btn"
          onClick={() => onAddToCart(item)}
          disabled={!item.available}
        >
          {item.available ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};
