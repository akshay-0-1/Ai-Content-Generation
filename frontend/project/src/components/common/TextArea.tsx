import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helper, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            dark:bg-gray-700 dark:border-gray-600 dark:text-white
            ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
            ${className}
          `}
          {...props}
        />
        
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        
        {helper && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helper}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;