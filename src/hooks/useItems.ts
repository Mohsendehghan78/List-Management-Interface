import { useEffect, useState } from 'react';
import type { Item, ItemFormData } from '../types/item.type';

export const useItems = () => {
  const STORAGE_KEY = 'savvytech_items';

  const [items, setItems] = useState<Item[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed: Array<Omit<Item, 'createdAt' | 'updatedAt'> & { createdAt: string; updatedAt?: string }> = JSON.parse(raw);
      return parsed.map((it) => ({
        ...it,
        createdAt: new Date(it.createdAt),
        updatedAt: it.updatedAt ? new Date(it.updatedAt) : undefined,
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const serializable = items.map((it) => ({
        ...it,
        createdAt: it.createdAt.toISOString(),
        updatedAt: it.updatedAt ? it.updatedAt.toISOString() : undefined,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
    } catch {
      // ignore write errors
    }
  }, [items]);

  const addItem = (formData: ItemFormData) => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      title: formData.title,
      subtitle: formData.subtitle,
      createdAt: new Date(),
    };
    setItems((prev) => [newItem, ...prev]);
  };

  const updateItem = (id: string, formData: ItemFormData) => {
    setItems((prev) => prev.map(item =>
      item.id === id
        ? { ...item, ...formData, updatedAt: new Date() }
        : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter(item => item.id !== id));
  };

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
  };
};