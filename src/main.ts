import "@fontsource/inter/400.css"; //regular
import "@fontsource/inter/500.css"; //medium
import "@fontsource/inter/600.css"; //semi bold
import "@fontsource/inter/700.css"; //bold

import "./styles/globalStyle.css";
import "./styles/colors.css";
import { renderRoute } from "./router";
import { createHeader } from "./components/Header/header";

const app = document.querySelector<HTMLDivElement>("#app")!;

createHeader(); // insere o header no body (como já está na função)

app.innerHTML = `
  <main id="page-content"></main>
`;

// Primeira renderização
renderRoute();

// Escuta mudanças na hash (navegação)
window.addEventListener("hashchange", renderRoute);
