import request from "supertest"
import app from "../src/app"

describe("GET /api/orders/:id", () => {
  it("should return an order by id", async () => {
    const createRes = await request(app)
      .post("/api/orders")
      .send({
        items: [{ menuItemId: "1", quantity: 1 }],
        customer: {
          name: "Atul",
          address: "Delhi",
          phone: "9999999999",
        },
      })

    const orderId = createRes.body.id

    const res = await request(app).get(`/api/orders/${orderId}`)

    expect(res.status).toBe(200)
    expect(res.body.id).toBe(orderId)
  })

  it("should return 404 for invalid order id", async () => {
    const res = await request(app).get("/api/orders/invalid-id")
    expect(res.status).toBe(404)
  })
})

describe("PUT /api/orders/:id/status", () => {
  it("should update order status", async () => {
    const createRes = await request(app)
      .post("/api/orders")
      .send({
        items: [{ menuItemId: "1", quantity: 1 }],
        customer: {
          name: "Atul",
          address: "Delhi",
          phone: "9999999999",
        },
      })

    const orderId = createRes.body.id

    const res = await request(app)
      .put(`/api/orders/${orderId}/status`)
      .send({ status: "PREPARING" })

    expect(res.status).toBe(200)
    expect(res.body.status).toBe("PREPARING")
  })

  it("should reject invalid status", async () => {
    const res = await request(app)
      .put("/api/orders/invalid-id/status")
      .send({ status: "INVALID_STATUS" })

    expect(res.status).toBe(400)
  })
})
