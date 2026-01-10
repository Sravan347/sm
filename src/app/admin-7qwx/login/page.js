"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [redirect, setRedirect] = useState("/admin-7qwx/smDashboard");

  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const r = sp.get("redirect");
      if (r) setRedirect(r);
    } catch (err) {
      // ignore
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        router.push(redirect);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1D1D1F] text-[#F2F2F7] font-sans overflow-hidden">
      {/* Hide any navigation bars that might be showing */}
      <style jsx global>{`
        nav,
        header,
        .navbar {
          display: none !important;
        }

        /* Hide any global background text */
        body::before,
        body::after {
          content: none !important;
        }
      `}</style>

      <div className="flex flex-col lg:flex-row h-screen max-h-screen">
        {/* Left Side - Full Width Image */}
        <div className="lg:w-1/2 relative overflow-hidden order-2 lg:order-1">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1487956382158-bb926046304a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />

          {/* Content */}
          <div className="relative h-full flex flex-col p-6 lg:p-8 z-10">
            {/* Logo/Brand - Fixed to not look like checkbox */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5AC8FA]/20 to-[#5AC8FA]/5 border border-[#5AC8FA]/30 flex items-center justify-center backdrop-blur-sm shadow-lg group-hover:scale-105 transition-transform duration-200">
                  <svg
                    className="w-5 h-5 text-[#5AC8FA]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  {/* Decorative dot */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#32D74B] rounded-full border border-[#2C2C2E]"></div>
                </div>
              </div>
              <div>
                <span className="font-semibold text-lg tracking-tight block">
                  Space Motivate
                </span>
                <span className="text-xs text-gray-400">
                  Architectural Portal
                </span>
              </div>
            </div>

            {/* Main Text Content */}
            <div className="mt-auto space-y-4">
              <h1 className="text-3xl lg:text-4xl font-thin tracking-tight leading-tight">
                Architectural
                <br />
                <span className="font-medium bg-gradient-to-r from-[#5AC8FA] to-[#32D74B] bg-clip-text text-transparent">
                  Admin Portal
                </span>
              </h1>
              <p className="text-gray-300 text-sm lg:text-base max-w-md leading-relaxed">
                Secure access to your dashboard with precision engineering and
                elegant design.
              </p>

              {/* Feature List */}
              <div className="space-y-2 mt-4">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <svg
                    className="w-4 h-4 text-[#32D74B]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Precision engineering</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <svg
                    className="w-4 h-4 text-[#32D74B]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Enterprise security</span>
                </div>
              </div>
            </div>

            {/* Bottom Text - Fixed URL */}
            <div className="mt-8 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-400 mb-1">
                Modern architecture — Designed for purpose
              </p>
              <p className="text-xs text-gray-500">localhost:3000/admin-7qwx</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-4 lg:p-6 order-1 lg:order-2">
          <div className="w-full max-w-sm">
            {/* Login Card */}
            <div className="bg-[#2C2C2E]/95 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-2xl border border-white/10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#5AC8FA]/15 to-[#5AC8FA]/5 border border-[#5AC8FA]/25 flex items-center justify-center mx-auto backdrop-blur-sm">
                    <svg
                      className="w-8 h-8 text-[#5AC8FA]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    {/* Status indicator */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#32D74B] rounded-full border-2 border-[#2C2C2E] flex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-light tracking-tight mb-1">
                  Welcome Back
                </h2>
                <p className="text-gray-400 text-sm">
                  Sign in to your admin account
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2 tracking-wide">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#1D1D1F] rounded-lg border border-white/10 focus:border-[#5AC8FA]/50 focus:ring-1 focus:ring-[#5AC8FA]/30 outline-none transition-all duration-200 text-[#F2F2F7] placeholder-gray-500 text-sm"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2 tracking-wide">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#1D1D1F] rounded-lg border border-white/10 focus:border-[#5AC8FA]/50 focus:ring-1 focus:ring-[#5AC8FA]/30 outline-none transition-all duration-200 text-[#F2F2F7] placeholder-gray-500 text-sm"
                  />
                </div>

                {/* Remember Me Checkbox - Fixed styling */}
                <div className="flex items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 bg-[#1D1D1F] border border-white/20 rounded focus:ring-[#5AC8FA]/30 focus:ring-2 checked:bg-[#5AC8FA] checked:border-[#5AC8FA] appearance-none"
                    />
                    <svg
                      className="absolute left-0 top-0 w-4 h-4 pointer-events-none opacity-0 checked:opacity-100 transition-opacity duration-200"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <label
                    htmlFor="remember"
                    className="ml-2 text-xs text-gray-300 cursor-pointer"
                  >
                    Keep me signed in
                  </label>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#5AC8FA] to-[#5AC8FA]/90 hover:from-[#5AC8FA]/90 hover:to-[#5AC8FA] disabled:opacity-50 text-[#1D1D1F] font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center text-sm"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                {/* Security Note */}
                <div className="bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-lg p-4 mt-6">
                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 text-[#5AC8FA] mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="text-xs font-medium text-gray-300 mb-1">
                        Security Notice
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        For security, please log out and close your browser
                        after each session. Access is monitored and logged.
                      </p>
                    </div>
                  </div>
                </div>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-white/10">
                <div className="text-center">
                  <p className="text-xs text-gray-400">
                    Need help?{" "}
                    <span className="text-[#5AC8FA] cursor-pointer hover:text-[#5AC8FA]/80 transition-colors">
                      Contact support
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    © {new Date().getFullYear()} Admin Portal v2.0
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile-only note */}
            <div className="lg:hidden mt-4 text-center">
              <p className="text-xs text-gray-400">
                Swipe left to view architecture background
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
