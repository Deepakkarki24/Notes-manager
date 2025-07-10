import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { UserProvider } from "./context/UserContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { NoteProvider } from "./context/NoteContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <NoteProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </NoteProvider>
    </UserProvider>
  </BrowserRouter>
);
