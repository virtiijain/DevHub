import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DevHub API Documentation",
      version: "4.0.0",
      description: "API documentation for DevHub MERN backend",
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080",
        description: "DevHub Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };
