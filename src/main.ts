import "@fontsource/inter/400.css"; //regular
import "@fontsource/inter/500.css"; //medium
import "@fontsource/inter/600.css"; //semi bold
import "@fontsource/inter/700.css"; //bold

import "./styles/globalStyle.css";
import "./styles/colors.css";
import { renderRoute } from "./router";
import { createHeader } from "./components/Header/header";

const app = document.querySelector<HTMLDivElement>("#app")!;

createHeader();

app.innerHTML = `
  <main id="page-content"></main>
`;

renderRoute();

window.addEventListener("hashchange", renderRoute);
