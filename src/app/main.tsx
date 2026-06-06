import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app/styles/global.css";
import { AppProvider } from "./providers/app-provider";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>,
);
