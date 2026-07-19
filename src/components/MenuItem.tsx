import React, { useState } from 'react';
import { MenuItem, MenuCategory } from '../types/menu';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/formatters';

interface MenuItemProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onQuickView?: () => void;
}

const categoryGradients: Record<MenuCategory, string> = {
  BBQ: 'linear-gradient(135deg, #dc2626, #991b1b)',
  PIZZA: 'linear-gradient(135deg, #ea580c, #c2410c)',
  BURGERS: 'linear-gradient(135deg, #16a34a, #15803d)',
  PIES: 'linear-gradient(135deg, #d97706, #b45309)',
  DRINKS: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
  DESSERTS: 'linear-gradient(135deg, #9333ea, #7e22ce)',
};

export const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart, onQuickView }) => {
  const { t } = useApp();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="menu-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {item.image && (
        <div className="menu-item-image">
          {!imageLoaded && (
            <div className="menu-item-image-placeholder" />
          )}
          <img 
            src={item.image} 
            alt={item.name} 
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
          <div className="menu-item-badges-overlay">
            {item.isPopular && (
              <span className="badge popular">★ {t('popular')}</span>
            )}
            {item.isNew && (
              <span className="badge new">✦ {t('new')}</span>
            )}
            {item.isSeasonal && (
              <span className="badge seasonal">◆ {t('seasonal')}</span>
            )}
          </div>
          <div className="menu-item-category-badge" style={{ background: categoryGradients[item.category] }}>
            {item.category}
          </div>
          {onQuickView && (
            <button className="menu-item-quickview" onClick={(e) => { e.stopPropagation(); onQuickView(); }}>
              {t('quickView')}
            </button>
          )}
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
            {item.isVegetarian && <span className="badge vegetarian">{t('veg')}</span>}
            {item.isSpicy && <span className="badge spicy">🌶 {t('spicy')}</span>}
          </div>
          <button
            className="menu-item-add-btn"
            onClick={() => onAddToCart(item)}
            disabled={!item.available}
          >
            {item.available ? t('addToCart') : t('unavailable')}
          </button>
        </div>
      </div>
    </div>
  );
};
