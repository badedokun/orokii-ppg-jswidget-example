import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {

  
    // Create a script element
    const script = document.createElement('script');

    // Set the script source to the remote-widgets.js file
    script.src = 'https://ayoseun.github.io/k-pay/bundle.js';
    script.async = true;

    // Append the script to the document body
   document.body.appendChild(script);
    const paymentData = {
      "totalAmount": "5000",
      "merchants": [{ "merchantId": "87766786", "amount": "60", "tax": "5" },
      { "merchantId": "87766786", "amount": "60", "tax": "5" },
      { "merchantId": "87766786", "amount": "60", "tax": "5" },],
      "userACHToken": { "userTokenId": "c3e453aa-c917-4ca0-ad0d-8a3d9492cc86", "userPaymentOptionId": "132005098", },
      "userCardToken": { "userTokenId": "78f6c3cd-d05e-40e6-8f3f-274031cc5135", "userPaymentOptionId": "132047678", }
  }
    // Initialize the widget after the script has loaded
    script.onload = () => {
      // Assuming the widget has a createWidget function
      const container = document.getElementById('widget-container');
      if (window.OrokiipayWidget) {
        const widget = window.OrokiipayWidget.createWidget(paymentData); // Pass any required parameters
        container.appendChild(widget);
      } else {
        console.error('OrokiipayWidget is not defined.');
      }
    };

    // Cleanup: Remove the script element when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []); // The empty dependency array ensures that this effect runs once on component mount

  return <div id="widget-container"></div>;
};

export default App;
