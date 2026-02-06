import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Food Delivery API",
            version: "1.0.0",
            description: "API Documentation for Food Delivery REST APIs"
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "Development server"
            },
        ],
        tags: [
            {
                name: "Menu",
                description: "Menu management endpoints"
            },
            {
                name: "Orders",
                description: "Order management endpoints"
            }
        ]
    },
    apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
}

export const swaggerSpec = swaggerJsdoc(options)