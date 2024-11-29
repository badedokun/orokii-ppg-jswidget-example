import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Search, ChevronLeftCircle, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Footer } from './component/footer';
import CheckoutModal from './component/checkout';

const products = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    price: 99.99,
    image: '/earbud.png',
    description: 'High-quality wireless earbuds with noise cancellation',
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    image: '/watch.png',
    description: 'Feature-rich smartwatch with health tracking',
    category: 'Wearables'
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 49.99,
    image: '/bag.png',
    description: 'Durable laptop backpack with multiple compartments',
    category: 'Accessories'
  },
  {
    id: 4,
    name: 'Coffee Maker',
    price: 79.99,
    image: '/coffee.png',
    description: 'Programmable coffee maker with thermal carafe',
    category: 'Home'
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 129.99,
    image: '/speaker.png',
    description: 'Portable bluetooth speaker with deep bass',
    category: 'Electronics'
  },
  {
    id: 6,
    name: 'Desk Lamp',
    price: 39.99,
    image: '/lamp.png',
    description: 'LED desk lamp with adjustable brightness',
    category: 'Home'
  },
];

const categories = [...new Set(products.map(product => product.category))];

const App = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [cartAdditionAlert, setCartAdditionAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Show cart addition alert
    setCartAdditionAlert(product);
    setTimeout(() => {
      setCartAdditionAlert(null);
    }, 3000);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handleCheckoutComplete = () => {
    setShowModal(false);
    setShowSuccessAlert(true);
    setCart([]); // Clear the cart
    
   // window.removeEventListener('orokii-widget-payment-status',setShowCart(!showCart));
    setTimeout(() => {
      setShowSuccessAlert(false);
      setShowCart(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container px-4 py-2">
          <div className="flex justify-between items-center">
            <div className='flex gap-x-4 '>
              <img src='/logo.svg' width={24} height={24} />
              <h1 className="text-2xl font-bold text-black">OrokiiPay E-Store</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 text-sm border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="h-5 w-5 text-gray-600 absolute left-3 top-2.5" />
              </div>
              <button
                className="relative p-2 border rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setShowCart(!showCart)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Success Alert for Checkout */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 w-96 bg-green-100 border border-green-200 rounded-lg p-4 z-50">
          <p className="text-green-800">
            Order placed successfully! Thank you for shopping with us.
          </p>
        </div>
      )}

      {/* Cart Addition Alert */}
      {cartAdditionAlert && (
        <div className="fixed top-4 right-4 w-96 bg-blue-100 border border-blue-200 rounded-lg p-4 z-50 animate-slide-in">
          <div className="flex items-center">
            <img
              src={cartAdditionAlert.image}
              alt={cartAdditionAlert.name}
              className="w-12 h-12 mr-4 object-cover rounded"
            />
            <div>
              <p className="text-blue-800 font-semibold">
                {cartAdditionAlert.name} added to cart
              </p>
              <p className="text-blue-600 text-sm">
                Quantity: 1
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add the CheckoutModal component */}
      <CheckoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        totalAmount={getTotalPrice()}
        onComplete={handleCheckoutComplete}
      />
      {/* Main Content */}
      {!showCart ? (
        <div>
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-black to-black text-white">
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Welcome to OrokiiPay E-Store
                </h1>
                <p className="text-xl mb-8">
                  Discover amazing products at unbeatable prices
                </p>

              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {categories.map(category => (
                <button
                  key={category}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                        <span className="text-xs text-gray-500">{product.category}</span>
                      </div>
                      <span className="text-2xl font-black text-black">${product.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                    <button
                      className="w-full mt-4 bg-[#024E8C] hover:bg-black text-white py-2 rounded-lg transition-colors"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className='flex gap-x-4 items-center' onClick={() => setShowCart(!showCart)}>
              <a href="#" className="hover:text-[#E27F03] transition-colors">
                <ChevronLeftCircle className="h-5 w-5 mb-3" />
              </a>
              <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1 border rounded hover:bg-gray-100 transition-colors"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          className="p-1 border rounded hover:bg-gray-100 transition-colors"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* New Footer Section */}
      <Footer categories={categories} />
    </div>
  );
};

export default App;
