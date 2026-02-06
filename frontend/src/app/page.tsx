"use client";

import { useEffect, useState } from "react";
import MenuCard from "@/components/MenuCard";
import { fetchMenu, MenuItem } from "@/services/menu.service";
import CartSummary from "@/components/CartSummary";

export default function Home() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu()
      .then(setMenu)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-4 text-[#39ff14]">Loading menu...</p>;
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
