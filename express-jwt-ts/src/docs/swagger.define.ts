import { version } from "moment";

export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "APP API documentation",
    version: "0.0.1",
    lisence: {},
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
    },
  ],
};
