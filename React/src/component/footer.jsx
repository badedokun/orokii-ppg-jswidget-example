

import React from 'react';
import {Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
export const Footer = ({ categories = [] }) => {


    return (
        <footer className="bg-black text-gray-300 mt-auto mx-[16px]">
        <div className="container mx-auto px-4 py-12">
          {/* Newsletter Signup */}
          <div className="border-b border-gray-700 pb-8 mb-8">
            <div className="max-w-xl mx-auto text-center">
              <h3 className="text-2xl font-semibold text-white mb-4">Stay Updated</h3>
              <p className="mb-6">Subscribe to our newsletter for exclusive deals and updates</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                <button className="px-6 py-2 bg-[#E27F03] hover:bg-black text-white rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">About OrokiiStore</h4>
              <p className="mb-4">Your one-stop destination for quality tech products and accessories.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['About Us', 'Contact', 'FAQs', 'Shipping Policy', 'Return Policy', 'Terms of Service'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <a href="#" className="hover:text-white transition-colors">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>56 Wellington Road, East Brunswick, New Jersey</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span>support@orokiiPay.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} OrokiiPay E-Store. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    );
}

