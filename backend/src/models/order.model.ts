export type OrderStatus =
  | "RECEIVED"
  | "PREPARING"
  | "OUT_FOR_DELIVERY"

export interface OrderItem {
  menuItemId: string
  quantity: number
}

export interface CustomerDetails {
  name: string
  address: string
  phone: string
}

export interface Order {
  id: string
  items: OrderItem[]
  customer: CustomerDetails
  status: OrderStatus
  createdAt: Date
}

export const orders: Order[] = []
