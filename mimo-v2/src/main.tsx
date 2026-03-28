import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./app/app"
import "./app/globals.css"

// Vite environment type declarations
/// <reference types="./types/vite-env" />

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
