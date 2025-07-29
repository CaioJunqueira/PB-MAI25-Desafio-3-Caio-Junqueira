import { createFormSection } from "../../components/FormSection/formSection";

import "./style.css";

export function cadastrarUsuarios(): string {
  const form = `
      <form id="cadastro-usuarios-form">
      <div class="input-group">
        <label for="titulo">Nome do usuário</label>
        <input type="text" id="titulo" name="titulo" placeholder="Digite o nome do usuário" class="input" required />
      </div>

      <button type="submit" class="register-button">Cadastrar Usuário</button>
    </form>
  `;

  return createFormSection("Cadastrar novo usuário", form);
}
