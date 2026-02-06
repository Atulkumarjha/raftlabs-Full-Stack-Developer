"use client"

import { useCart } from "@/context/cart.context"
import { placeOrder } from "@/services/order.service"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const router = useRouter()

  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name || !address || !phone) {
      alert("All fields are required")
      return
    }

    setLoading(true)

    try {
      const order = await placeOrder({
        items: state.items.map((item: any) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
        customer: { name, address, phone },
      })

      dispatch({ type: "CLEAR_CART" })
      router.push(`/order/${order.id}`)
    } catch (error) {
      alert("Failed to place order")
    } finally {
      setLoading(false)
    }
  }

  if (state.items.length === 0) {
    return <p className="p-4 text-[#39ff14]">Your cart is empty</p>
  }

  return (
    <main className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]">Checkout</h1>

      <input
        className="border-2 border-[#39ff14] bg-black text-[#39ff14] p-2 w-full mb-2 rounded placeholder-[#39ff14] placeholder-opacity-50 focus:outline-none focus:shadow-[0_0_10px_#39ff14]"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border-2 border-[#39ff14] bg-black text-[#39ff14] p-2 w-full mb-2 rounded placeholder-[#39ff14] placeholder-opacity-50 focus:outline-none focus:shadow-[0_0_10px_#39ff14]"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        className="border-2 border-[#39ff14] bg-black text-[#39ff14] p-2 w-full mb-4 rounded placeholder-[#39ff14] placeholder-opacity-50 focus:outline-none focus:shadow-[0_0_10px_#39ff14]"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        className="w-full bg-[#39ff14] text-black py-2 rounded font-semibold hover:shadow-[0_0_15px_#39ff14] transition-shadow disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </main>
  )
}
