import React, { useState } from 'react';
import { MenuItem } from '../types/menu';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/formatters';

interface QuickViewProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onClose: () => void;
}

export const QuickView: React.FC<QuickViewProps> = ({ item, onAddToCart, onClose }) => {
  const { t } = useApp();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(item);
    }
    onClose();
  };

  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div className="quickview-modal" onClick={e => e.stopPropagation()}>
        <button className="quickview-close" onClick={onClose}>×</button>
        <div className="quickview-image">
          <img src={item.image} alt={item.name} />
          <div className="quickview-badges">
            {item.isPopular && <span className="badge popular">★ {t('popular')}</span>}
            {item.isNew && <span className="badge new">✦ {t('new')}</span>}
            {item.isSeasonal && <span className="badge seasonal">◆ {t('seasonal')}</span>}
          </div>
        </div>
        <div className="quickview-content">
          <h2>{item.name}</h2>
          <p className="quickview-desc">{item.description}</p>
          {item.allergens && item.allergens.length > 0 && (
            <div className="quickview-allergens">
              <span className="allergens-label">Allergens:</span>
              {item.allergens.map(a => <span key={a} className="allergen-tag">{a}</span>)}
            </div>
          )}
          <div className="quickview-tags">
            {item.isVegetarian && <span className="badge vegetarian">{t('veg')}</span>}
            {item.isSpicy && <span className="badge spicy">🌶 {t('spicy')}</span>}
          </div>
          <div className="quickview-footer">
            <div className="quickview-price">{formatPrice(item.price)}</div>
            <div className="quickview-controls">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="btn btn-gold" onClick={handleAdd} disabled={!item.available}>
                {item.available ? t('addToCart') : t('unavailable')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
