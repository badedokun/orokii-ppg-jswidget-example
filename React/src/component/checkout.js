import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
export function cleanNumber(input) {
  // Convert to a number first to handle scientific notation or floating point issues
  const num = Number(input);

  // Use toFixed() to round to 2 decimal places, then convert back to a number 
  // to remove unnecessary trailing zeros
  return Number(num.toFixed(2)).toString();
}
const CheckoutModal = ({ isOpen, onClose, totalAmount, onComplete }) => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [widgetValue, setWidgetValue] = useState(null);
  useEffect(() => {
    // Save the original body style
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isOpen) {
      // Get the scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Apply padding to prevent content shift when scrollbar disappears
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen]);

  useEffect(() => {
    let scriptElement = null;

    const initializeWidget = () => {
      if (window.OrokiipayWidget && containerRef.current) {
        try {
          const paymentData = {
            "totalAmount": cleanNumber(totalAmount),
            "merchants": [{ "merchantId": "87766786", "amount": "60", "tax": "5" },
            { "merchantId": "87766786", "amount": "60", "tax": "5" },
            { "merchantId": "87766786", "amount": "60", "tax": "5" },],
            //"userACHToken": { "userTokenId": "c3e453aa-c917-4ca0-ad0d-8a3d9492cc86", "userPaymentOptionId": "132005098", },
            //"userCardToken": { "userTokenId": "78f6c3cd-d05e-40e6-8f3f-274031cc5135", "userPaymentOptionId": "132047678", }
          }

          // Clear previous widget content
          while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
          }

          const widget = window.OrokiipayWidget.createWidget(paymentData);
          containerRef.current.appendChild(widget);
          setIsLoading(false);
        } catch (err) {
          setError('Failed to initialize payment widget');
          setIsLoading(false);
        }
      }
    };

    if (isOpen) {
      scriptElement = document.createElement('script');
      scriptElement.src = 'https://ayoseun.github.io/k-pay/bundle.js';
      scriptElement.async = true;

      scriptElement.onload = initializeWidget;
      scriptElement.onerror = () => {
        setError('Failed to load payment script');
        setIsLoading(false);
      };

      document.body.appendChild(scriptElement);
    }




    return () => {
      if (scriptElement && document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }

    };
  }, [isOpen, totalAmount]);

  if (!isOpen) return null;
  const handleWidgetUpdate = (event) => {
    setWidgetValue(event.detail.value);
    console.log(widgetValue)
    if (widgetValue && widgetValue === true) {
      onClose();
      onComplete()
    }
  };
  window.addEventListener('orokii-widget-payment-status', handleWidgetUpdate);



  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className=" fixed inset-0 z-50 flex items-center justify-center">
        <div
          role="dialog"
          aria-modal="true"
          className="relative bg-white rounded-lg w-full max-w-[950px] max-h-[90vh] flex flex-col shadow-xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Checkout</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex justify-center items-center h-[500px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            )}

            {error && (
              <div className="p-4 text-red-500 text-center">
                {error}
              </div>
            )}

            <div
              ref={containerRef}
              id="widget-container"
              className="my-6"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;