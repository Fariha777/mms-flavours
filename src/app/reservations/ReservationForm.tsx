"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  CurrencyBangladeshiIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function ReservationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    specialRequests: "",
    bkashNumber: "",
    transactionId: "",
  });

  const [bookingAmount, setBookingAmount] = useState(0);

  // Calculate booking amount when guests change
  const calculateBookingAmount = (guests: number) => {
    const perPersonCharge = 500; // 500 BDT per person
    return guests * perPersonCharge;
  };

  const handleGuestsChange = (guests: number) => {
    setFormData({ ...formData, guests });
    setBookingAmount(calculateBookingAmount(guests));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to create reservation");
      }

      toast.success("Reservation created successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 1,
        specialRequests: "",
        bkashNumber: "",
        transactionId: "",
      });
      setStep(1);
    } catch (error) {
      toast.error("Failed to create reservation");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="01XXXXXXXXX"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              id="date"
              min={today}
              required
              className="block w-full pl-12 pr-4 py-3 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-base"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <ClockIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="time"
              id="time"
              required
              className="block w-full pl-12 pr-4 py-3 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-base"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
            Number of Guests
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <UserGroupIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="guests"
              min="1"
              max="10"
              required
              className="block w-full pl-12 pr-4 py-3 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-base"
              value={formData.guests}
              onChange={(e) => handleGuestsChange(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">
          Special Requests
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className="absolute top-3 left-4">
            <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-gray-400" />
          </div>
          <textarea
            id="specialRequests"
            rows={4}
            className="block w-full pl-12 pr-4 py-3 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-base"
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            placeholder="Any special requests or dietary requirements?"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Number of Guests</span>
            <span className="font-medium">{formData.guests}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Booking Amount (per person)</span>
            <span className="font-medium">৳500</span>
          </div>
          <div className="flex justify-between pt-3 border-t">
            <span className="text-gray-900 font-semibold">Total Amount</span>
            <span className="text-xl font-bold text-red-600">৳{bookingAmount}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border-2 border-pink-500">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Pay with bKash</h3>
          <Image src="/images/bkash-logo.png" alt="bKash Logo" width={80} height={40} />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-gray-600">Send money to our bKash merchant number:</p>
            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
              <PhoneIcon className="h-5 w-5 text-pink-500" />
              <span className="text-lg font-medium text-gray-900">01712-345678</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <label htmlFor="bkashNumber" className="block text-sm font-medium text-gray-700">
                Your bKash Number
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="bkashNumber"
                  required
                  className="block w-full pl-12 pr-4 py-3 rounded-lg border-gray-300 focus:border-pink-500 focus:ring-pink-500 text-base"
                  value={formData.bkashNumber}
                  onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                  placeholder="01XXXXXXXXX"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">
                Transaction ID
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CurrencyBangladeshiIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="transactionId"
                  required
                  className="block w-full pl-12 pr-4 py-3 rounded-lg border-gray-300 focus:border-pink-500 focus:ring-pink-500 text-base"
                  value={formData.transactionId}
                  onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                  placeholder="Enter your bKash transaction ID"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 1 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              1
            </div>
            <div className="w-20 h-1 bg-gray-200">
              <div className={`h-full transition-all duration-300 ${step === 2 ? "bg-red-600" : "bg-gray-200"}`} />
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 2 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              2
            </div>
          </div>
        </div>

        {/* Step Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">{step === 1 ? "Reservation Details" : "Payment Information"}</h2>
          <p className="mt-2 text-gray-600">
            {step === 1 ? "Please fill in your details to book a table" : "Complete your reservation with bKash payment"}
          </p>
        </div>

        {step === 1 ? renderStep1() : renderStep2()}

        <div className="flex justify-between pt-4">
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Back
            </button>
          )}
          <button
            type={step === 1 ? "button" : "submit"}
            onClick={() => step === 1 && setStep(2)}
            className={`inline-flex justify-center rounded-lg border border-transparent px-8 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
              step === 1
                ? "bg-red-600 hover:bg-red-700 focus:ring-red-500 ml-auto"
                : "bg-pink-500 hover:bg-pink-600 focus:ring-pink-500"
            }`}
          >
            {step === 1 ? "Continue to Payment" : "Confirm Reservation"}
          </button>
        </div>
      </form>
    </div>
  );
}
