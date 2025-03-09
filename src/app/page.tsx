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
    name: "All",
    items: [], // This will be populated dynamically
  },
  {
    name: "Biriyani & Rice",
    items: [
      {
        name: "Kacchi Biriyani",
        price: "৳450",
        description: "Traditional Dhaka-style mutton kacchi biriyani",
        image: "https://images.pexels.com/photos/7353380/pexels-photo-7353380.jpeg",
        category: "Biriyani & Rice",
      },
      {
        name: "Bhuna Khichuri",
        price: "৳280",
        description: "Classic Bengali yellow rice with vegetables",
        image: "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg",
        category: "Biriyani & Rice",
      },
    ],
  },
  {
    name: "Curries",
    items: [
      {
        name: "Beef Bhuna",
        price: "৳320",
        description: "Slow-cooked beef in aromatic spices",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
        category: "Curries",
      },
      {
        name: "Ilish Paturi",
        price: "৳420",
        description: "Hilsa fish wrapped in banana leaf",
        image: "https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg",
        category: "Curries",
      },
      {
        name: "Chicken Roast",
        price: "৳280",
        description: "Traditional Bengali-style roasted chicken",
        image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
        category: "Curries",
      },
      {
        name: "Mutton Rezala",
        price: "৳380",
        description: "Creamy mutton curry with yogurt and nuts",
        image: "https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg",
        category: "Curries",
      },
    ],
  },
  {
    name: "Appetizers",
    items: [
      {
        name: "Shami Kabab",
        price: "৳220",
        description: "Minced meat patties with spices",
        image: "https://images.pexels.com/photos/6941025/pexels-photo-6941025.jpeg",
        category: "Appetizers",
      },
      {
        name: "Chicken Chap",
        price: "৳250",
        description: "Grilled chicken in special spice blend",
        image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
        category: "Appetizers",
      },
      {
        name: "Dhakai Fuchka",
        price: "৳150",
        description: "Crispy shells filled with spicy mixture",
        image: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg",
        category: "Appetizers",
      },
    ],
  },
  {
    name: "Desserts",
    items: [
      {
        name: "Mishti Doi",
        price: "৳120",
        description: "Sweet yogurt in earthen pot",
        image: "https://images.pexels.com/photos/4040691/pexels-photo-4040691.jpeg",
        category: "Desserts",
      },
      {
        name: "Roshmalai",
        price: "৳150",
        description: "Soft cottage cheese dumplings in sweet milk",
        image: "https://images.pexels.com/photos/14705134/pexels-photo-14705134.jpeg",
        category: "Desserts",
      },
    ],
  },
  {
    name: "Drinks",
    items: [
      {
        name: "Masala Chai",
        price: "৳60",
        description: "Spiced milk tea",
        image: "https://images.pexels.com/photos/5946976/pexels-photo-5946976.jpeg",
        category: "Drinks",
      },
    ],
  },
];

// Populate the "All" category with all items
menuCategories[0].items = menuCategories.slice(1).flatMap((category) => category.items);

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
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
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      onError={(e) => {
                        const fallbackImages = [
                          "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
                          "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg",
                          "https://images.pexels.com/photos/7353380/pexels-photo-7353380.jpeg",
                        ];
                        // Try a different fallback image
                        e.currentTarget.src = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
                      }}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIB4gHh4eIB0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600 mt-2">{item.description}</p>
                      </div>
                      <span className="text-xl font-bold text-red-600">{item.price}</span>
                    </div>
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
