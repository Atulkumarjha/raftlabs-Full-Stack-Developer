"use client";

import { useCart } from "@/context/cart.context";
import Link from "next/link";

export default function CartSummary() {
  const { state, dispatch } = useCart();

  const total = state.items.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0,
  );

  if (state.items.length === 0) {
    return <p className="text-[#39ff14] opacity-70">Cart is empty</p>;
  }

  return (
    <div className="border-2 border-[#39ff14] rounded p-4 bg-black shadow-[0_0_10px_rgba(57,255,20,0.3)]">
      <h2 className="font-bold mb-2 text-[#39ff14]">Cart</h2>

      {state.items.map((item: any) => (
        <div key={item.id} className="flex justify-between items-center text-sm mb-2 text-[#39ff14]">
          <span className="flex-1">{item.name}</span>
          <div className="flex items-center gap-2">
            <button
              className="w-6 h-6 flex items-center justify-center border border-[#39ff14] rounded text-[#39ff14] hover:bg-[#39ff14] hover:text-black transition-colors"
              onClick={() =>
                dispatch({ type: "DECREMENT_ITEM", payload: item.id })
              }
            >
              -
            </button>
            <span className="w-5 text-center">{item.quantity}</span>
            <button
              className="w-6 h-6 flex items-center justify-center border border-[#39ff14] rounded text-[#39ff14] hover:bg-[#39ff14] hover:text-black transition-colors"
              onClick={() =>
                dispatch({ type: "ADD_ITEM", payload: item })
              }
            >
              +
            </button>
            <span className="w-16 text-right">₹{item.price * item.quantity}</span>
          </div>
        </div>
      ))}

      <hr className="my-2 border-[#39ff14] opacity-50" />
      <p className="font-bold text-[#39ff14]">Total: ₹{total}</p>
      <Link href="/checkout">
        <button className="mt-3 w-full bg-[#39ff14] text-black py-2 rounded font-semibold hover:shadow-[0_0_15px_#39ff14] transition-shadow">
          Checkout
        </button>
      </Link>
    </div>
  );
}
