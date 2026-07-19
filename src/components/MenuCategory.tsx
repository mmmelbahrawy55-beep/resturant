import React from 'react';
import { MenuCategory } from '../types/menu';

interface MenuCategoryProps {
  category: MenuCategory;
  label: string;
  itemsCount: number;
  isActive: boolean;
  onClick: () => void;
}

const categoryEmojis: Record<MenuCategory, string> = {
  BBQ: '🔥',
  PIZZA: '🍕',
  BURGERS: '🍔',
  PIES: '🥧',
  DRINKS: '🥤',
  DESSERTS: '🍰',
};

export const MenuCategory: React.FC<MenuCategoryProps> = ({ 
  category, 
  label,
  itemsCount, 
  isActive, 
  onClick 
}) => {
  return (
    <button
      className={`menu-category ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className="menu-category-emoji">{categoryEmojis[category]}</span>
      <span className="menu-category-label">{label}</span>
      <span className="menu-category-count">{itemsCount}</span>
    </button>
  );
};
