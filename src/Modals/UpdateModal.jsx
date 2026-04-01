import React, { useState, useEffect } from "react";

function UpdateModal({ isOpen, onConfirm, onCancel, todo }) {
    
    const [text, setText] = useState("");
    const [desc, setDesc] = useState("");
    
    // fill inputs when modal opens
    useEffect(() => {
        if (todo) {
            setText(todo.text || "");
            setDesc(todo.desc || "");
        }
    }, [todo]);
    
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);
    
    useEffect(() => {
    const handleEsc = (e) => {
    if (e.key === "Escape") onCancel();
    };
    
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
}, [onCancel]);

function handleConfirm() {
    onConfirm({
        ...todo,
        text,
        desc,
    });
}

if (!isOpen || !todo) return null;
return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4 text-black">
          تعديل: {todo.text}
        </h2>

        {/* INPUTS */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="العنوان"
          className="w-full p-2 border rounded-lg mb-2"
        />

        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="الوصف"
          className="w-full p-2 border rounded-lg"
        />

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
          >
            حفظ
          </button>

          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;