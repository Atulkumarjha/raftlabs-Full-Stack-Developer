export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
}

export const fetchMenu = async (): Promise<MenuItem[]> => {
  const res = await fetch("http://localhost:3001/api/menu")

  if (!res.ok) {
    throw new Error("Failed to fetch menu")
  }

  return res.json()
}
