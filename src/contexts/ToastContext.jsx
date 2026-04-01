import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  function showToast(message, type = "success") {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* UI */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50">
          <div
            className={`px-4 py-3 rounded-lg text-white shadow-lg ${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                ? "bg-red-500"
                : toast.type === "Update"
                ? "bg-sky-500"
                : ""
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export default function useToast() {
  return useContext(ToastContext);
}