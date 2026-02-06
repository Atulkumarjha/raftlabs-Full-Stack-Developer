"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { fetchOrderById } from "@/services/order.service"
import { io } from "socket.io-client"

const socket = io("http://localhost:3001")

const STATUS_LABELS: Record<string, string> = {
  RECEIVED: "Order Received",
  PREPARING: "Preparing Your Food",
  OUT_FOR_DELIVERY: "Out for Delivery",
}

export default function OrderStatusPage() {
  const { id } = useParams()
  const [status, setStatus] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [countdown, setCountdown] = useState<number>(5)

  useEffect(() => {
    if (!id) return

    fetchOrderById(id as string)
      .then((order) => {
        setStatus(order.status)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  useEffect(() => {
    socket.on("orderStatusUpdated", (data) => {
      if (data.orderId === id) {
        setStatus(data.status)
        setCountdown(5) // Reset countdown when status changes
      }
    })

    return () => {
      socket.off("orderStatusUpdated")
    }
  }, [id])

  useEffect(() => {
    // Only run countdown for RECEIVED and PREPARING statuses
    if (status === "RECEIVED" || status === "PREPARING") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            return 5 // Reset to 5 when it reaches 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [status])

  if (loading) {
    return <p className="p-6 text-[#39ff14]">Loading order...</p>
  }

  return (
    <main className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4 text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]">Order Status</h1>

      <div className="border-2 border-[#39ff14] rounded p-6 bg-black shadow-[0_0_15px_rgba(57,255,20,0.4)]">
        <p className="text-lg font-semibold mb-2 text-[#39ff14]">
          {STATUS_LABELS[status] || status}
        </p>

        {(status === "RECEIVED" || status === "PREPARING") && (
          <p className="text-sm text-[#39ff14] opacity-80 mb-2">
            Status update in: {countdown}s
          </p>
        )}

        <p className="text-sm text-[#39ff14] opacity-70">
          Order ID: {id}
        </p>
      </div>
    </main>
  )
}
