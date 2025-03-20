import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { getOrokiiAccessToken } from '../utils/access_token';
import Alert from './alert';


const CheckoutModal = ({ isOpen, onClose, totalAmount, onComplete }) => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('info');

  useEffect(() => {
    const handleOrokiipayError = (event) => {
      console.log('Orokiipay Error:', event.detail);
      // Show alert error in your UI
      setAlertType('error');
      setAlertMessage(event.detail?.message || 'Payment processing failed');
      setShowSuccessAlert(true);
    };
    
    const handleOrokiipaySuccess = (event) => {
      console.log('Orokiipay Success:', event.detail);
      
      // Determine the type of success event
      if (event.detail?.type === "close-payment") {
        // User closed the payment widget
        onClose();
      } else {
        // Payment was successful
        setAlertType('success');
        setAlertMessage('Payment processed successfully! Thank you for your order.');
        setShowSuccessAlert(true);
        
        // Wait for the alert to show before calling onComplete
        setTimeout(() => {
          onComplete();
        }, 3000);
      }
    };
    
    document.addEventListener('orokiipay:error', handleOrokiipayError);
    document.addEventListener('orokiipay:success', handleOrokiipaySuccess);
    
    return () => {
      document.removeEventListener('orokiipay:error', handleOrokiipayError);
      document.removeEventListener('orokiipay:success', handleOrokiipaySuccess);
    };
  }, [onClose, onComplete]);

  useEffect(() => {
    if (!isOpen) return;

    const paymentData = {
      "totalAmount":parseFloat(totalAmount),
      "merchantId": "64b5f2fd-d97f-4797-91d7-d63fb2b5ed9c",
      "clientId": "4121062054",
      "shippingFee": 37.00,
      "discount": 5.28,
      "tax":0.005,
      "merchants": [
        { "merchantId": "87766786", "amount": "60", "tax": "5" },
        { "merchantId": "87766786", "amount": "60", "tax": "5" },
        { "merchantId": "87766786", "amount": "60", "tax": "5" },
      ],
      "userACHToken": { "userTokenId": "c3e453aa-c917-4ca0-ad0d-8a3d9492cc86", "userPaymentOptionId": "132005098" },
      "userCardToken": { "userTokenId": "78f6c3cd-d05e-40e6-8f3f-274031cc5135", "userPaymentOptionId": "132047678" }
    };

    // Create a script element
    const script = document.createElement('script');
    
    // Set the script source to the correct bundle.js URL
    script.src = './bundle.js';
    script.async = true;
    
    // Append the script to the document body
    document.body.appendChild(script);
    
    // Initialize the widget after the script has loaded
    script.onload = async () => {
      try {
        // Use the correct selector - remove the hash symbol
        const container = containerRef.current;
        if (window.OrokiipayWidget && container) {
          console.log("Initializing OrokiipayWidget");
    
          const widget = await window.OrokiipayWidget.createWidget(paymentData, getOrokiiAccessToken);
          console.log("Orokiipay widget created");
          container.appendChild(widget);
          setIsLoading(false);
          console.log("Orokiipay widget initialized");
        } else {
          console.warn('OrokiipayWidget is not defined or container not found.');
          setAlertType('error');
          setAlertMessage('OrokiipayWidget is not defined or container not found.');
          setShowSuccessAlert(true);
          setIsLoading(false);
        }
      } catch (err) {
        setAlertType('error');
        setAlertMessage(`Error initializing widget: ${err.message}`);
        setShowSuccessAlert(true);
        setIsLoading(false);
      }
    };
    
    script.onerror = () => {
      setAlertType('error');
      setAlertMessage('Failed to load the OrokiipayWidget script.');
      setShowSuccessAlert(true);
      setIsLoading(false);
    };

    // Cleanup: Remove the script element when the component unmounts
    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [isOpen, totalAmount]); // Add isOpen and totalAmount as dependencies

  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            aria-hidden="true"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              role="dialog"
              aria-modal="true"
              className="relative bg-white rounded-lg w-full max-w-4xl max-h-screen flex flex-col shadow-xl"
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
              
              <div className="flex-1 overflow-y-auto p-4">
                {isLoading && (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                  </div>
                )}
                
                <Alert
                  show={showSuccessAlert}
                  type={alertType}
                  message={alertMessage}
                  duration={3000}
                  onClose={() => setShowSuccessAlert(false)}
                  position="top-center"
                />
                
                <div
                  ref={containerRef}
                  id="widget-container"
                  className="my-4"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutModal;