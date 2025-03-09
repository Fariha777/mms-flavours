"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";
import { ClipboardDocumentListIcon, UsersIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import ReservationList from "./ReservationList";
import AdminMenuForm from "./AdminMenuForm";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface TabButtonProps {
  selected: boolean;
}

export default function AdminPage() {
  const [categories] = useState({
    Reservations: [],
    Menu: [],
    Users: [],
  });

  return (
    <div className="min-h-screen bg-[#FBF7F4]">
      <div className="relative">
        {/* Background Image */}
        <div className="h-[200px] relative">
          <Image src="/images/hero-bg.jpg" alt="Bangladeshi Food" fill className="object-cover brightness-50" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
          <Navbar />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-lg text-white/90">Manage your restaurant operations</p>
            </div>
          </div>
        </div>

        <div className="relative -mt-10 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Traditional Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                }}
              />
            </div>

            <div className="relative">
              <div className="w-full max-w-4xl mx-auto px-2 sm:px-0">
                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl bg-white p-1 shadow-lg">
                    {Object.keys(categories).map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }: TabButtonProps) =>
                          classNames(
                            "w-full rounded-lg py-3 text-sm font-medium leading-5",
                            "ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
                            selected ? "bg-red-600 text-white shadow" : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                          )
                        }
                      >
                        <div className="flex items-center justify-center space-x-2">
                          {category === "Reservations" && <ClipboardDocumentListIcon className="w-5 h-5" />}
                          {category === "Menu" && <Square3Stack3DIcon className="w-5 h-5" />}
                          {category === "Users" && <UsersIcon className="w-5 h-5" />}
                          <span>{category}</span>
                        </div>
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-6">
                    <Tab.Panel>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl p-6 shadow-lg"
                      >
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Reservations</h3>
                        <ReservationList />
                      </motion.div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl p-6 shadow-lg"
                      >
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Menu Management</h3>
                        <AdminMenuForm />
                      </motion.div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl p-6 shadow-lg"
                      >
                        <h3 className="text-lg font-medium text-gray-900 mb-4">User Management</h3>
                        <p className="text-gray-600">Coming soon...</p>
                      </motion.div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
