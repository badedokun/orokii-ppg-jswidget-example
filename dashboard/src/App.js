import React, { useState, useEffect } from 'react';
import { Settings, Home, CreditCard, LogOut, MapPin, Phone, Mail, Copy, X } from 'lucide-react';
import { ethers } from 'ethers';
//import * as bitcoin from 'bitcoinjs-lib';
//import * as ecc from 'tiny-secp256k1';
//import BIP32Factory from 'bip32';
import CryptoJS from 'crypto-js';
//import  ECPairFactory  from 'ecpair';
//import { entropyToMnemonic as bip39 } from 'bip39';
import { Keypair } from '@solana/web3.js';

// Initialize the ECC library
//bitcoin.initEccLib(ecc);

//const ECPair = ECPairFactory(ecc);

const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center space-x-2">
    <span>{message}</span>
    <button onClick={onClose} className="text-white hover:text-gray-300">
      <X size={16} />
    </button>
  </div>
);

// const generateMnemonic = async () => {
//   const entropy = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
//   const mnemonic = bip39(entropy);
//   return mnemonic;
// };

// class BitcoinService {
//   constructor() {}

//   static async createWallet() {
//     try {
//       const mnemonic = await generateMnemonic();
//       // Generate the seed from the mnemonic
//       const seed = CryptoJS.HmacSHA512(mnemonic, 'mnemonic').toString(CryptoJS.enc.Hex);
//       const seedBuffer = Buffer.from(seed, 'hex');
//       const bip32 = BIP32Factory(ecc);
//       const root = bip32.fromSeed(seedBuffer);

//       // Derive the account node
//       const accountNode = root.derivePath(`m/44'/0'/0'`);
//       const network = bitcoin.networks.bitcoin;

//       // Derive the first child node
//       const childNode = accountNode.derive(0);
//       const keyPair = ECPair.fromWIF(childNode.toWIF());

//       const privateKey = keyPair.privateKey ? (keyPair.privateKey).toString('hex') : '';
//       const { address } = bitcoin.payments.p2wpkh({
//         pubkey: Buffer.from(keyPair.publicKey), // Convert Uint8Array to Buffer
//         network,
//       });

//       if (!address) {
//         throw new Error('Failed to generate wallet address');
//       }
//       return {
//         address: address,
//         privateKey: privateKey,
//         mnemonic: mnemonic
//       };
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }
// }

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');
  const [toast, setToast] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState({
    cards: true,
    crypto: false,
    apm: false,
    ach: false
  });

  const [generatedWallets, setGeneratedWallets] = useState({
    ETHEREUM: {
      visible: false,
      address: '',
      privateKey: '',
      seedPhrase: ''
    },
    BTC: {
      visible: false,
      address: '',
      privateKey: '',
      seedPhrase: ''
    },
    Solana: {
      visible: false,
      address: '',
      privateKey: '',
      seedPhrase: ''
    }
  });

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const generateEthereumWallet = async () => {
    try {
      setIsGenerating(true);
      const wallet = ethers.Wallet.createRandom();

      setGeneratedWallets(prev => ({
        ...prev,
        ETHEREUM: {
          ...prev.ETHEREUM,
          visible: true,
          address: wallet.address,
          privateKey: wallet.privateKey,
          seedPhrase: wallet.mnemonic.phrase
        }
      }));

      setToast("Ethereum wallet generated successfully!");
    } catch (error) {
      setToast("Error generating wallet: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateBitcoinWallet = async () => {
    try {
      setIsGenerating(true);
      const { address, privateKey, mnemonic } = await BitcoinService.createWallet();

      setGeneratedWallets(prev => ({
        ...prev,
        BTC: {
          ...prev.BTC,
          visible: true,
          address: address,
          privateKey: privateKey,
          seedPhrase: mnemonic
        }
      }));

      setToast("Bitcoin wallet generated successfully!");
    } catch (error) {
      setToast("Error generating wallet: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSolanaWallet = async () => {
    try {
      setIsGenerating(true);
      const keypair = Keypair.generate();

      setGeneratedWallets(prev => ({
        ...prev,
        Solana: {
          ...prev.Solana,
          visible: true,
          address: keypair.publicKey.toString(),
          privateKey: keypair.secretKey.toString('hex'),
          seedPhrase: '' // Solana does not use seed phrases
        }
      }));

      setToast("Solana wallet generated successfully!");
    } catch (error) {
      setToast("Error generating wallet: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleWalletBox = (chain) => {
    setGeneratedWallets(prev => ({
      ...prev,
      [chain]: {
        ...prev[chain],
        visible: !prev[chain].visible
      }
    }));
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setToast(`${fieldName} copied to clipboard`);
  };

  const LoginPage = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-96 bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">Welcome Back</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={() => setIsLoggedIn(true)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="fixed left-0 w-64 h-full bg-black p-5">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 px-4 py-2 rounded-lg cursor-not-allowed opacity-50">
            <Home size={20} className="text-gray-400" />
            <span className="text-gray-400">Dashboard</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-lg cursor-not-allowed opacity-50">
            <CreditCard size={20} className="text-gray-400" />
            <span className="text-gray-400">Transactions</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600">
            <Settings size={20} className="text-white" />
            <span className="text-white">Settings</span>
          </div>
          <div
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
            onClick={() => setIsLoggedIn(false)}
          >
            <LogOut size={20} className="text-gray-400" />
            <span className="text-gray-400">Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-64">
        {/* Top Nav */}
        <div className="bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Merchant Details</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Fixway</span>
              <div className="w-10 h-10 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="p-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Company Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Display Name</h3>
                <p className="text-gray-900 mt-1">Fixway</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Company Name</h3>
                <p className="text-gray-900 mt-1">Fixway LTD.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Company ID</h3>
                <p className="text-gray-900 mt-1">ORP123456</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">API Keys</h2>
            <div className="space-y-4">
              <div className="max-w-lg">
                <input
                  type="text"
                  readOnly
                  value="sk_live_xxxx_xxxx_xxxx_xxxx"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                  Generate New Key
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Accepted Payment Methods</h2>
            <div className="grid grid-cols-2 gap-4 max-w-lg">
              {Object.entries(paymentMethods).map(([method, checked]) => (
                <div key={method} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setPaymentMethods(prev => ({...prev, [method]: e.target.checked}))
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-gray-700 capitalize">{method}</label>
                </div>
              ))}
            </div>
          </div>

          <CryptoSection />
        </div>

        {/* Footer */}
        <div className="bg-black text-white mt-12 p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">About Company</h4>
              <p className="text-gray-400 mb-4">
                Your trusted payment solutions provider.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {['About Us', 'Contact', 'FAQs', 'Terms of Service'].map(link => (
                  <li key={link} className="hover:text-blue-500 cursor-pointer">{link}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                {['Payments', 'Integration', 'Solutions', 'Support'].map(category => (
                  <li key={category} className="hover:text-blue-500 cursor-pointer">{category}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>56 Wellington Road, East Brunswick, New Jersey</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span>support@orokiipay.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="text-center text-gray-400">
              © 2025 Orokiipay. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CryptoSection = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900">Crypto Payment Addresses</h2>
      <h2 className="text-sm font-medium text-gray-500 text-[#E27F03] mt-2">Enter the crypto address to receive your customer payments.</h2>
      <p className="text-xs font-medium text-[#E27F03] my-2">If you do not have a crypto address you can click on the generate button to create a crypto wallet.</p>
      <p className="text-xs font-medium text-[#E27F03] mt-2 mb-6">Please note that orokiipay does not save any privatekeys or seed phrases if you create a wallet here please copy and save your keys securely.</p>
      <div className="space-y-6 max-w-lg">
        {Object.keys(generatedWallets).map((chain) => (
          <div key={chain} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{chain} Address</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${chain} address`}
              value={generatedWallets[chain].address}
              readOnly
            />
            <div className="flex space-x-2">
              <button className="px-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
                Save
              </button>
              <button
                className="px-6 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-md flex items-center space-x-2"
                onClick={() => {
                  if (chain === 'ETHEREUM') {
                    generateEthereumWallet();
                  } else if (chain === 'BTC') {
                    generateBitcoinWallet();
                  } else if (chain === 'Solana') {
                    generateSolanaWallet();
                  } else {
                    toggleWalletBox(chain);
                  }
                }}
                disabled={isGenerating}
              >
                {isGenerating && chain === 'ETHEREUM' ? (
                  <span>Generating...</span>
                ) : (
                  <span>Generate</span>
                )}
              </button>
            </div>

            {generatedWallets[chain].visible && (
              <div className="mt-2 p-4 border rounded-md shadow-md bg-gray-50 relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => toggleWalletBox(chain)}
                >
                  <X size={20} />
                </button>

                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Public Address</label>
                    <div className="flex items-center">
                      <input
                        readOnly
                        value={generatedWallets[chain].address}
                        className="flex-1 p-2 border rounded-md bg-white"
                      />
                      <button
                        onClick={() => copyToClipboard(generatedWallets[chain].address, "Public Address")}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <Copy size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Private Key</label>
                    <div className="flex items-center">
                      <input
                        readOnly
                        value={generatedWallets[chain].privateKey}
                        className="flex-1 p-2 border rounded-md bg-white"
                      />
                      <button
                        onClick={() => copyToClipboard(generatedWallets[chain].privateKey, "Private Key")}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <Copy size={20} />
                      </button>
                    </div>
                  </div>

                  {chain !== 'Solana' && (
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Seed Phrase</label>
                      <div className="flex items-center">
                        <textarea
                          readOnly
                          value={generatedWallets[chain].seedPhrase}
                          className="flex-1 p-2 border rounded-md bg-white resize-none h-20"
                        />
                        <button
                          onClick={() => copyToClipboard(generatedWallets[chain].seedPhrase, "Seed Phrase")}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <Copy size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {isLoggedIn ? <Dashboard /> : <LoginPage />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
};

export default App;
