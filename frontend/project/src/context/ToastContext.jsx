import React, { createContext, useContext, useState } from 'react';
import ToastContainer from '../components/common/ToastContainer';

const ToastContext = createContext(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    // Support both object and string+type format
    let newToast;
    
    if (typeof toast === 'string') {
      const message = toast;
      const type = arguments[1] || 'info';
      const id = Date.now().toString();
      newToast = { id, message, type };
    } else {
      // Assume it's already a toast object with id, message, and type
      newToast = toast;
    }
    
    setToasts(prev => [...prev, newToast]);
    
    // Automatically remove toast after 5 seconds
    setTimeout(() => {
      removeToast(newToast.id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
