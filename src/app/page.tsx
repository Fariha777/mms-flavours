"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { ChevronRightIcon, CalendarIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Navbar from "@/components/Navbar";

const menuCategories = [
  {
    name: "Biriyani & Rice",
    items: [
      { name: "Kacchi Biriyani", price: "৳450", description: "Traditional Dhaka-style mutton kacchi biriyani" },
      { name: "Bhuna Khichuri", price: "৳280", description: "Classic Bengali yellow rice with vegetables" },
    ],
  },
  {
    name: "Curries",
    items: [
      { name: "Beef Bhuna", price: "৳320", description: "Slow-cooked beef in aromatic spices" },
      { name: "Ilish Paturi", price: "৳420", description: "Hilsa fish wrapped in banana leaf" },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Mishti Doi", price: "৳120", description: "Sweet yogurt in earthen pot" },
      { name: "Roshmalai", price: "৳150", description: "Soft cottage cheese dumplings in sweet milk" },
    ],
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Biriyani & Rice");
  const restaurantLocation = [23.8103, 90.4125]; // Dhaka coordinates

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/bangladeshi-food-platter.jpg"
            alt="Traditional Bangladeshi Kacchi Biryani"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        </div>
        <Navbar />
        <div className="relative h-full flex items-center">
          <div className="max-w-4xl px-8 md:px-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Taste of
              <br />
              <span className="text-red-500">Bangladesh</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 mb-8 max-w-2xl"
            >
              Experience the authentic flavors of Dhaka's finest Kacchi Biryani, aromatic curries, and traditional Bengali
              sweets
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/reservations"
                className="inline-flex items-center px-8 py-3 bg-red-600 text-white rounded-full text-lg font-medium hover:bg-red-700 transition-colors"
              >
                Book a Table
                <ChevronRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <a
                href="#menu"
                className="inline-flex items-center px-8 py-3 bg-white/10 text-white backdrop-blur-sm rounded-full text-lg font-medium hover:bg-white/20 transition-colors"
              >
                View Menu
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h2>
            <p className="text-lg text-gray-600">Savor the authentic taste of Bangladesh</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {menuCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-6 py-2 rounded-full text-lg transition-colors ${
                  activeCategory === category.name ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {menuCategories
              .find((cat) => cat.name === activeCategory)
              ?.items.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                    </div>
                    <span className="text-xl font-bold text-red-600">{item.price}</span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Us</h2>
            <p className="text-lg text-gray-600">Experience the warmth of Bengali hospitality</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPinIcon className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600 mt-1">123 Gulshan Avenue, Dhaka 1212, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <PhoneIcon className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Contact</h3>
                  <p className="text-gray-600 mt-1">+880 1234-567890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CalendarIcon className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Hours</h3>
                  <p className="text-gray-600 mt-1">
                    Lunch: 12:00 PM - 3:30 PM
                    <br />
                    Dinner: 6:30 PM - 10:30 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
              <MapContainer center={restaurantLocation} zoom={15} className="h-full w-full" scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={restaurantLocation}>
                  <Popup>
                    <b>Our Restaurant</b>
                    <br />
                    123 Gulshan Avenue, Dhaka
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
