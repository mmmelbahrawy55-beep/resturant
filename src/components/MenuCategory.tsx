import React from 'react';
import { MenuCategory } from '../types/menu';

interface MenuCategoryProps {
  category: MenuCategory;
  itemsCount: number;
  isActive: boolean;
  onClick: () => void;
}

const categoryConfig: Record<MenuCategory, { label: string; emoji: string }> = {
  BBQ: { label: 'BBQ & Grills', emoji: '🔥' },
  PIZZA: { label: 'Pizza', emoji: '🍕' },
  BURGERS: { label: 'Burgers', emoji: '🍔' },
  PIES: { label: 'Pies & Cakes', emoji: '🥧' },
  DRINKS: { label: 'Drinks', emoji: '🥤' },
  DESSERTS: { label: 'Desserts', emoji: '🍰' },
};

export const MenuCategory: React.FC<MenuCategoryProps> = ({ 
  category, 
  itemsCount, 
  isActive, 
  onClick 
}) => {
  const config = categoryConfig[category];

  return (
    <button
      className={`menu-category ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className="menu-category-emoji">{config.emoji}</span>
      <span className="menu-category-label">{config.label}</span>
      <span className="menu-category-count">{itemsCount}</span>
    </button>
  );
};
