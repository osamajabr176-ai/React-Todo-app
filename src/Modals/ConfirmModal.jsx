import React from "react";

function ConfirmModal({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm bg-opacity-50 z-50" onClick={onCancel}>
      
      <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center animate-scaleIn" onClick={(e) => e.stopPropagation()} >
        
        <h2 className="text-lg text-black font-semibold mb-4">
          {message || "Are you sure?"}
        </h2>

        <div className="flex justify-center gap-4">
          
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
          >
            نعم طبعا
          </button>

          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            الغاء
          </button>

        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;