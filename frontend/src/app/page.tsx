"use client";

import { useEffect, useState } from "react";
import MenuCard from "@/components/MenuCard";
import { fetchMenu, MenuItem } from "@/services/menu.service";
import CartSummary from "@/components/CartSummary";

export default function Home() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMenu = async (retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          const data = await fetchMenu();
          setMenu(data);
          setError(null);
          return;
        } catch (err) {
          if (i === retries - 1) {
            setError("Unable to load menu. Please try again.");
            console.error("Failed to fetch menu:", err);
          }
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
    };
    loadMenu().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-4 text-[#39ff14]">Loading menu...</p>;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-[#39ff14] text-black rounded font-semibold"
          onClick={() => {
            setLoading(true);
            setError(null);
            fetchMenu()
              .then(setMenu)
              .catch(() => setError("Unable to load menu. Please try again."))
              .finally(() => setLoading(false));
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-3">
        <h1 className="text-2xl font-bold mb-4 text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]">Menu</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menu.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <CartSummary />
    </main>
  );
}
