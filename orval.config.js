import { defineConfig } from "orval";
export default defineConfig({
  api: {
    input: "./api.yaml",
    output: {
      mode: "tags-split",
      target: "src/shared/api/generated/api.ts",
      schemas: "src/shared/api/generated/model",
      client: "react-query",
      mock: true,
      override: {
        mutator: {
          path: "src/shared/api/axios-instance.ts",
          name: "axiosInstance",
        },
      },
    },
  },
});