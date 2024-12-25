'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
    const fadeInLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
      };
    
      const fadeInRight = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
      };
    
      const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
      };
  return (
    <header className="border-b border-gray-800">
        <motion.div
          className="max-w-7xl mx-auto px-4 py-4"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
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
              <p className="text-xs ml-2 mt-7">
                By{" "}
                <Link
                  href="https://niketchawla.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Niket Chawla
                </Link>
              </p>
            </div>

            {/* Add the development-only button */}
            {process.env.NEXT_PUBLIC_ENV === 'development' && (
              <Link
                href="/our-members-panel"
                className="px-4 py-2 bg-[#2b9676] hover:bg-[#14a77b] rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Our Members
              </Link>
            )}
          </div>
        </motion.div>
      </header>
  )
}

export default Header
