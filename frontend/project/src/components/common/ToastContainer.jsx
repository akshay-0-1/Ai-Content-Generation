import React from 'react';
import { useToast } from '../../context/ToastContext';
import { 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X 
} from 'lucide-react';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center justify-between p-4 rounded shadow-lg min-w-[280px] max-w-sm
            ${toast.type === 'success' ? 'bg-emerald-500 text-white' : ''}
            ${toast.type === 'error' ? 'bg-red-500 text-white' : ''}
            ${toast.type === 'warning' ? 'bg-amber-500 text-white' : ''}
            ${toast.type === 'info' ? 'bg-blue-500 text-white' : ''}
            transform transition-all duration-300 ease-in-out animate-slideIn
          `}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && <CheckCircle size={18} />}
            {toast.type === 'error' && <AlertCircle size={18} />}
            {toast.type === 'warning' && <AlertTriangle size={18} />}
            {toast.type === 'info' && <Info size={18} />}
            <p className="font-medium">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-white opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
