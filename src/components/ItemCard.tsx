import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { Item } from '../types/item.type';
import { formatDate } from '../utils/dateFormatter';

interface ItemCardProps {
  item: Item;
  onEdit: () => void;
  onDelete: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete }) => {
  return (
    <div className="bg-white flex flex-col justify-between    rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-800 mb-1 wrap-break-word whitespace-normal">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2 wrap-break-word whitespace-normal">
            {item.subtitle}
          </p>
          <p className="text-xs text-gray-400">
            Created: {formatDate(item.createdAt)}
            {item.updatedAt && ` • Updated: ${formatDate(item.updatedAt)}`}
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
        >
          <Edit2 size={16} />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};