'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <Image
                  src="/expressly-icon.png"
                  alt="Expressly Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold">Expressly</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Image
                src="/expressly-icon.png"
                alt="Expressly Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <h2 className="text-4xl font-bold">Expressly</h2>
            </div>
            <h3 className="text-3xl font-bold text-[#17CC97] mb-2">404</h3>
            <h4 className="text-2xl font-semibold mb-4">Page Not Found</h4>
            <p className="text-gray-400 mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <Link 
              href="/"
              className="inline-block bg-[#2b9676] hover:bg-[#14a77b] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Go Back Home
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Expressly. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

