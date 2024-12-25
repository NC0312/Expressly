'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from './components/AuthProvider';
import { createUserDocument, checkUsernameAvailability } from './firebase/utils';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
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

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { signup, login, resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(''); // Clear any existing success message
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        router.push('/feed');
      } else {
        const isUsernameAvailable = await checkUsernameAvailability(formData.userName);
        if (!isUsernameAvailable) {
          setError('Username is already taken');
          setLoading(false);
          return;
        }

        const userCredential = await signup(formData.email, formData.password);

        await createUserDocument(userCredential.user.uid, {
          name: formData.name,
          userName: formData.userName,
          email: formData.email,
        });

        router.push('/feed');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }
    try {
      await resetPassword(formData.email);
      setSuccess('Password reset email sent. Check your inbox.');
      setError(''); // Clear any existing errors
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.message);
      setSuccess(''); // Clear any existing success message
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-grow flex">
        {/* Banner */}
        {/* <div className="hidden md:flex md:w-1/2 bg-[#373643] items-center justify-center"> */}
        <motion.div
          className="hidden md:flex md:w-1/2 bg-[#373643] items-center justify-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* <h2 className="text-4xl font-bold text-white">Welcome to Expressly</h2> */}
          <img src='/expressly-logo.png' />
        </motion.div>
        {/* </div> */}

        {/* Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            variants={{ fadeInUp }}
            className="w-full max-w-md bg-[#1e1e1e] rounded-xl border border-gray-800 p-8"
          >
            <motion.h2
              layout
              className="text-2xl font-bold text-center mb-6"
            >
              {isLogin ? 'Check In!!' : 'Join Expressly'}
            </motion.h2>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-3 text-sm text-red-400 bg-red-900/20 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-3 text-sm text-green-400 bg-green-900/20 rounded-lg"
              >
                {success}
              </motion.div>
            )}

            <motion.form
              layout
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 bg-[#252525] border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#17CC97] focus:border-[#17CC97]"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 bg-[#252525] border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#17CC97] focus:border-[#17CC97]"
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-[#252525] border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#17CC97] focus:border-[#17CC97]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-3 py-2 bg-[#252525] border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#17CC97] focus:border-[#17CC97]"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-3 py-2 bg-[#252525] border border-gray-800 rounded-lg focus:ring-2 focus:ring-[#17CC97] focus:border-[#17CC97] pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-[#17CC97] hover:text-[#14a77b]"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-lg font-medium 
                  ${loading
                    ? 'bg-[#17CC97]/50 cursor-not-allowed'
                    : 'bg-[#2b9676] hover:bg-[#14a77b]'
                  } transition-colors duration-200`}
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </motion.button>
            </motion.form>

            <motion.div layout className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccess(''); // Clear success message when switching
                }}
                className="text-sm text-[#17CC97] hover:text-[#14a77b]"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

