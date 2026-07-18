import React from 'react';
import { MenuCategory } from '../types/menu';

interface MenuCategoryProps {
  category: MenuCategory;
  itemsCount: number;
  isActive: boolean;
  onClick: () => void;
}

export const MenuCategory: React.FC<MenuCategoryProps> = ({ 
  category, 
  itemsCount, 
  isActive, 
  onClick 
}) => {
  const getCategoryLabel = (category: MenuCategory): string => {
    const labels: Record<MenuCategory, string> = {
      BBQ: 'BBQ & Grills',
      PIZZA: 'Pizza',
      BURGERS: 'Burgers',
      PIES: 'Pies',
      DRINKS: 'Drinks',
      DESSERTS: 'Desserts',
    };
    return labels[category];
  };

  return (
    <button
      className={`menu-category ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className="menu-category-label">{getCategoryLabel(category)}</span>
      <span className="menu-category-count">({itemsCount})</span>
    </button>
  );
};
