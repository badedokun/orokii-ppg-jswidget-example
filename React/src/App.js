import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    fetch("https://backend-server-tvb6.onrender.com/api/users")
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  
    // Create a script element
    const script = document.createElement('script');

    // Set the script source to the remote-widgets.js file
    script.src = 'https://orokiipay-js-widget.web.app/bundle.js';
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Initialize the widget after the script has loaded
    script.onload = () => {
      // Assuming the widget has a createWidget function
      const container = document.getElementById('#widget-container');
      if (window.OrokiipayWidget) {
        const widget = window.OrokiipayWidget.createWidget("500"); // Pass any required parameters
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
