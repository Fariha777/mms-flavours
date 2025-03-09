"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Hero() {
  const { data: session } = useSession();

  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
          alt="Restaurant interior"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
      </div>

      <div className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Experience Fine Dining</h1>
          <p className="mt-6 text-lg leading-8 text-gray-100">
            Indulge in exquisite flavors and impeccable service. Our carefully crafted menu brings together the finest
            ingredients and culinary expertise.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {session ? (
              <Link
                href="/reservations"
                className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Book a Table
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in to Book
              </Link>
            )}
            <Link href="#menu" className="text-lg font-semibold leading-6 text-white hover:text-gray-200">
              View Menu <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
