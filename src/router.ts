import { acervoDeLivros } from "./pages/acervoDeLivros/acervoDeLivros";
import { cadastrarLivros } from "./pages/cadastrarLivros/cadastrarLivros";
import { usuariosCadastrados } from "./pages/usuariosCadastrados/usuariosCadastrados";
import { cadastrarUsuarios } from "./pages/cadastrarUsuarios/cadastrarUsuarios";

export function renderRoute() {
  const route = location.hash || "#acervo-de-livros";
  const content = document.getElementById("page-content")!;

  switch (route) {
    case "#acervo-de-livros":
      content.innerHTML = acervoDeLivros();
      break;
    case "#cadastrar-livros":
      content.innerHTML = cadastrarLivros();
      break;
    case "#usuarios-cadastrados":
      content.innerHTML = usuariosCadastrados();
      break;
    case "#cadastrar-usuarios":
      content.innerHTML = cadastrarUsuarios();
      break;
    default:
      content.innerHTML = "<p>Página não encontrada</p>";
  }
}
