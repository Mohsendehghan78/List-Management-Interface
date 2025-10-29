import { useState } from 'react';
import { Plus } from 'lucide-react';
import { ItemList } from './components/ItemList';
import { ItemModal } from './components/ItemModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { useItems } from './hooks/useItems';
import type { Item, ItemFormData } from './types/item.type';

function App() {
  const { items, addItem, updateItem, deleteItem } = useItems();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; item: Item | null }>({
    isOpen: false,
    item: null,
  });

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      setDeleteConfirm({ isOpen: true, item });
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm.item) {
      deleteItem(deleteConfirm.item.id);
      setDeleteConfirm({ isOpen: false, item: null });
    }
  };

  const handleSubmit = (formData: ItemFormData) => {
    if (editingItem) {
      updateItem(editingItem.id, formData);
    } else {
      addItem(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              List Management
            </h1>
            <p className="text-gray-600 text-lg">
              Organize and manage your items efficiently
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-semibold text-blue-600">{items.length}</span>
                <span>Total Items</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 font-semibold"
          >
            <Plus size={20} />
            Create New Item
          </button>
        </div>
        <ItemList
          items={items}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
        <ItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          editItem={editingItem}
        />
        <DeleteConfirmModal
          isOpen={deleteConfirm.isOpen}
          onClose={() => setDeleteConfirm({ isOpen: false, item: null })}
          onConfirm={handleDeleteConfirm}
          itemTitle={deleteConfirm.item?.title || ''}
        />
      </div>
    </div>
  );
}

export default App;