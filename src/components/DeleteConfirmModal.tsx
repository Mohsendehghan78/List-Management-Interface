import React, { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemTitle: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemTitle,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-1000 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`relative bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-200 ease-out ${
          isClosing
            ? "opacity-0 scale-95 translate-y-1"
            : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Confirm Deletion
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-2">
            Are you sure you want to delete this item?
          </p>
          <div className="bg-gray-50 rounded-lg p-3 mb-6 border border-gray-200">
            <p className="font-semibold text-gray-800">"{itemTitle}"</p>
          </div>
          <p className="text-sm text-gray-500">This action cannot be undone.</p>
        </div>

        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white py-2.5 px-4 rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40"
          >
            Delete Item
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
