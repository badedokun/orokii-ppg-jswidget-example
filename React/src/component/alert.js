import React, { useState, useEffect } from 'react';

const Alert = ({ 
  show, 
  type = 'info', 
  message, 
  duration = 3000, 
  onClose,
  showImage = false,
  image = '',
  imageAlt = '',
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(show);
  
  useEffect(() => {
    setIsVisible(show);
    
    let timer;
    if (show && duration) {
      timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [show, duration, onClose]);

  // Don't render anything if not visible
  if (!isVisible) return null;
  
  // Determine background and text colors based on type
  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-100 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      case 'info':
      default:
        return 'bg-blue-100 border-blue-200 text-blue-800';
    }
  };
  
  // Determine position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'top-right':
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} w-96 ${getStyles()} border rounded-lg p-4 z-50 animate-slide-in`}>
      <div className="flex items-center">
        {showImage && image && (
          <img
            src={image}
            alt={imageAlt}
            className="w-12 h-12 mr-4 object-cover rounded"
          />
        )}
        <div className="flex-1">
          {typeof message === 'string' ? (
            <p className="font-semibold">{message}</p>
          ) : (
            message
          )}
        </div>
        {onClose && (
          <button 
            className="ml-2 text-gray-500 hover:text-gray-700" 
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;