import ReactDOM from "react-dom/client";
import "./App.css";
import { App } from "./App.tsx";
import "./assets/fonts/roboto/Roboto-Italic.ttf";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
