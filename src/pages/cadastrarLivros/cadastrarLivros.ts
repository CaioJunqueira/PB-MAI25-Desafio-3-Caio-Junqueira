import { createFormSection } from "../../components/FormSection/formSection";

import "./style.css";

export function cadastrarLivros(): string {
  const form = `
    <form id="cadastro-livros-form">
      <div class="input-group">
        <label for="titulo">Título do Livro</label>
        <input type="text" id="titulo" name="titulo" placeholder="Digite o título do livro" class="input" required />
      </div>
    </div>

      <div class="input-group">
        <label for="autor">Autor do Livro</label>
        <input type="text" id="autor" name="autor" placeholder="Digite o autor do livro" class="input" required />
      </div>

      <div class="input-group">
        <label for="anoPublicacao">Ano de Publicação</label>
        <input type="text" id="anoPublicacao" name="anoPublicacao" placeholder="Digite o ano de publicação" class="input" required />
      </div>

      <button type="submit" class="register-button">Cadastrar Livro</button>
    </form>
  `;

  return createFormSection("Cadastrar novo livro", form);
}
