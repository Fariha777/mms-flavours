"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className={`text-2xl font-bold transition-colors flex items-center space-x-2 ${
                  isScrolled ? "text-red-600" : "text-white"
                }`}
              >
                <span>MMS Flavours</span>
              </Link>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link
                href="/#menu"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                  isScrolled ? "text-gray-900 hover:text-red-600" : "text-white/90 hover:text-white"
                }`}
              >
                Menu
              </Link>
              <Link
                href="/reservations"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                  isScrolled ? "text-gray-900 hover:text-red-600" : "text-white/90 hover:text-white"
                }`}
              >
                Reservations
              </Link>
              {session?.user && (
                <Link
                  href="/my-reservations"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                    isScrolled ? "text-gray-900 hover:text-red-600" : "text-white/90 hover:text-white"
                  }`}
                >
                  My Reservations
                </Link>
              )}
              {session?.user?.role === "admin" && (
                <Link
                  href="/admin"
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                    isScrolled ? "text-gray-900 hover:text-red-600" : "text-white/90 hover:text-white"
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className={`text-sm transition-colors ${isScrolled ? "text-gray-900" : "text-white"}`}>
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled ? "text-gray-900 hover:text-red-600" : "text-white/90 hover:text-white"
                  }`}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className={`text-sm font-medium transition-colors ${
                    isScrolled ? "text-gray-900 hover:text-red-600" : "text-white/90 hover:text-white"
                  }`}
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isScrolled ? "bg-red-600 text-white hover:bg-red-700" : "bg-white text-red-600 hover:bg-red-50"
                  }`}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-md p-2 transition-colors ${
                isScrolled ? "text-gray-700 hover:bg-gray-100 hover:text-gray-900" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b">
          <div className="space-y-1 pb-3 pt-2">
            <Link
              href="/#menu"
              className="block px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="/reservations"
              className="block px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reservations
            </Link>
            {session?.user && (
              <Link
                href="/my-reservations"
                className="block px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Reservations
              </Link>
            )}
            {session?.user?.role === "admin" && (
              <Link
                href="/admin"
                className="block px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {session ? (
              <>
                <div className="px-4 py-2 text-base font-medium text-gray-900">{session.user?.name}</div>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="block px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="block px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
