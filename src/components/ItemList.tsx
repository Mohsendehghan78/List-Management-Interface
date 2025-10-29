import React from 'react';
import type { Item } from '../types/item.type';
import { ItemCard } from './ItemCard';
import { Package } from 'lucide-react';

interface ItemListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

export const ItemList: React.FC<ItemListProps> = ({ items, onEdit, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
          <Package size={40} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No items yet</h3>
        <p className="text-gray-500">Create your first item to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  );
};