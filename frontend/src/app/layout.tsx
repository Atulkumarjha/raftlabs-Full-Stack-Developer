import "./globals.css";
import { CartProvider } from "@/context/cart.context";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="bg-black border-b-2 border-[#39ff14] p-4 sticky top-0 z-50 shadow-[0_2px_10px_rgba(57,255,20,0.3)]">
          <Link href="/">
            <h1 className="text-2xl font-bold text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.8)] hover:drop-shadow-[0_0_12px_rgba(57,255,20,1)] transition-all cursor-pointer">
              Food Delivery
            </h1>
          </Link>
        </header>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}