export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
}

import { API_URL } from "@/config/api"

export const fetchMenu = async (): Promise<MenuItem[]> => {
  const res = await fetch(`${API_URL}/api/menu`)

  if (!res.ok) {
    throw new Error("Failed to fetch menu")
  }

  return res.json()
}
