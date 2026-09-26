import { defineConfig } from "orval";

export default defineConfig({
  cars: {
    input: {
      target: "https://avans.blob.core.windows.net/cars-api/openapi.yaml",
    },
    output: {
      target: "src/api/generated/cars.ts",
      schemas: "src/api/generated/model",
      client: "react-query",
      httpClient: "fetch",
      // Use the "servers" url from the spec as base url
      baseUrl: { getBaseUrlFromSpecification: true },
      clean: true,
    },
  },
});
