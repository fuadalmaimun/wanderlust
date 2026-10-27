'use client';
import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export  default  function  SignInPage () {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries()) as { email: string, password: string};

        try {
            const { data, error } = await authClient.signIn.email({
                ...userData,
            });

            if (error) {
                toast.error(error.message ?? "Invalid email or password");
                return;
            }

            if (data) {
                toast.success("Signed in successfully");
                router.push('/');
                router.refresh();
            }
        } catch {
            toast.error("Could not sign in. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-serif text-[#111827] mb-2 tracking-tight">
         Welcome Back!
        </h1>
       
      </div>

      {/* Form Container */}
      <div className="w-full max-w-[460px] bg-white rounded-xl shadow-[0_10px_35px_-5px_rgba(0,0,0,0.08)] p-8 sm:p-10 border border-gray-100">
        <form onSubmit={handleSignIn}>
            <div className="space-y-5">
          

          {/* Email Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Email Address
            </label>
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} strokeWidth={1.75} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-transparent rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#1399B6] transition-all duration-200"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Password
            </label>
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} strokeWidth={1.75} />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-transparent rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#1399B6] transition-all duration-200"
              />
            </div>
          </div>

     
          

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 px-4 bg-[#1399B6] hover:bg-[#10859e] active:bg-[#0e748a] text-white font-medium text-sm rounded-lg shadow-sm transition-colors duration-200 cursor-pointer disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </div>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-gray-500">Or sign in with</span>
          </div>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={() => toast.info("Google sign-in is not configured yet.")}
          className="w-full flex justify-center items-center gap-2.5 py-2.5 px-4 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 cursor-pointer shadow-xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.33 21.36 7.39 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.33 2.64 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
            />
          </svg>
          Sign Up With Google
        </button>

        {/* Sign Up Link */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <a
            href="/signup"
            className="font-semibold text-[#1399B6] hover:underline"
          >
            Sign Up
          </a>
        </div>  
      </div>
    </div>
  );
}