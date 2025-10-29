import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Item, ItemFormData } from '../types/item.type';


interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ItemFormData) => void;
  editItem?: Item | null;
}

export const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editItem,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState<ItemFormData>({
    title: '',
    subtitle: '',
  });
  const [errors, setErrors] = useState<Partial<ItemFormData>>({});

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClosing(false);
    } else if (isMounted) {
      setIsClosing(true);
      const timer = setTimeout(() => setIsMounted(false), 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMounted]);

  useEffect(() => {
    if (editItem) {
      setFormData({
        title: editItem.title,
        subtitle: editItem.subtitle,
      });
    } else {
      setFormData({ title: '', subtitle: '' });
    }
    setErrors({});
  }, [editItem, isOpen]);

  const validate = (): boolean => {
    const newErrors: Partial<ItemFormData> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (!formData.subtitle.trim()) {
      newErrors.subtitle = 'Subtitle is required';
    } else if (formData.subtitle.length < 3) {
      newErrors.subtitle = 'Subtitle must be at least 3 characters';
    } else if (formData.subtitle.length > 200) {
      newErrors.subtitle = 'Subtitle must be less than 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-1000 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`} />
      <div
        className={`relative bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-200 ease-out ${
          isClosing ? 'opacity-0 scale-95 translate-y-1' : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {editItem ? 'Edit Item' : 'Create New Item'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1 hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter a descriptive title"
              maxLength={100}
            />
            {errors.title && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                {errors.title}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.title.length}/100 characters
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subtitle <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.subtitle ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter a subtitle"
              maxLength={200}
            />
            {errors.subtitle && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                 {errors.subtitle}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.subtitle.length}/200 characters
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
            >
              {editItem ? 'Update Item' : 'Create Item'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};