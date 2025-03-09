"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Image from "next/image";

interface Reservation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  specialRequests?: string;
  payment?: {
    amount: number;
    method: string;
    bkashNumber: string;
    transactionId: string;
    status: string;
  };
}

export default function MyReservationsPage() {
  const { data: session } = useSession();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserReservations();
    }
  }, [session]);

  const fetchUserReservations = async () => {
    try {
      const res = await fetch(`/api/reservations?email=${session?.user?.email}`);
      if (!res.ok) throw new Error("Failed to fetch reservations");
      const data = await res.json();
      setReservations(data);
    } catch (error) {
      toast.error("Failed to load your reservations");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F4]">
      <div className="relative">
        {/* Background Image */}
        <div className="h-[200px] relative">
          <Image
            src="/images/hero-bg.jpg"
            alt="Restaurant Background"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
          <Navbar />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">My Reservations</h1>
              <p className="text-lg text-white/90">View and manage your bookings</p>
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
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Guests
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Payment
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reservations.map((reservation) => (
                          <tr key={reservation._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{new Date(reservation.date).toLocaleDateString()}</div>
                              <div className="text-sm text-gray-500">{reservation.time}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.guests}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                ${
                                  reservation.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : reservation.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {reservation.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">Amount: ৳{reservation.payment?.amount || 0}</div>
                              <div className="text-sm text-gray-500">
                                {reservation.payment?.status === "confirmed" ? (
                                  <span className="text-green-600">Payment Confirmed</span>
                                ) : (
                                  <span className="text-yellow-600">Payment Pending</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
