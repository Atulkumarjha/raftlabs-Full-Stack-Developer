import { Request, Response } from "express";
import { orders, Order } from "../models/order.model";
import crypto from "crypto";
import { getIO } from "../socket/socket";

export const createOrder = (req: Request, res: Response) => {
  const { items, customer } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Items are required" });
  }

  if (!customer || !customer.name || !customer.address || !customer.phone) {
    return res.status(400).json({ message: "Customer details are required" });
  }

  const newOrder: Order = {
    id: crypto.randomUUID(),
    items,
    customer,
    status: "RECEIVED",
    createdAt: new Date(),
  };

  orders.push(newOrder)

  // Only emit socket events if socket.io is initialized
  try {
    const io = getIO()

    setTimeout(() => {
      newOrder.status = "PREPARING"
      io.emit("orderStatusUpdated", {
        orderId: newOrder.id,
        status: newOrder.status,
      })
    }, 5000)

    setTimeout(() => {
      newOrder.status = "OUT_FOR_DELIVERY"
      io.emit("orderStatusUpdated", {
        orderId: newOrder.id,
        status: newOrder.status,
      })
    }, 10000)
  } catch (error) {
    // Socket.io not initialized (e.g., in test environment)
    // Status updates will be handled manually via API
  }

  res.status(201).json(newOrder)
};

export const getOrderById = (req: Request, res: Response) => {
  const { id } = req.params

  const order = orders.find((o) => o.id === id)

  if (!order) {
    return res.status(404).json({ message: "Order not found" })
  }

  res.status(200).json(order)
}

export const updateOrderStatus = (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body

  const validStatuses = ["RECEIVED", "PREPARING", "OUT_FOR_DELIVERY"]

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid order status" })
  }

  const order = orders.find((o) => o.id === id)

  if (!order) {
    return res.status(404).json({ message: "Order not found" })
  }

  order.status = status
  res.status(200).json(order)
}
