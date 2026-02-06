import { API_URL } from "@/config/api"

export const fetchOrderById = async (id: string) => {
  const res = await fetch(`${API_URL}/api/orders/${id}`)

  if (!res.ok) {
    throw new Error("Order not found")
  }

  return res.json()
}

export const placeOrder = async (orderData: {
  items: { menuItemId: string; quantity: number }[]
  customer: { name: string; address: string; phone: string }
}) => {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })

  if (!res.ok) {
    throw new Error("Failed to place order")
  }

  return res.json()
}
