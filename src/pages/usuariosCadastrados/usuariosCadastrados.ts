import api from "../../services/axios";
import "./style.css";

export function usuariosCadastrados(): string {
  // Estrutura inicial da tabela com coluna ID adicionada
  const table = `
    <section>
      <h1 class="title">Usuários Cadastrados</h1>
      <p class="description">Lista de todos os usuários registrados no sistema.</p>

      <table id="usuarios-table" class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody id="usuarios-tbody">
          <tr>
            <td colspan="3" style="text-align:center;">Carregando usuários...</td>
          </tr>
        </tbody>
      </table>
    </section>
  `;

  // Depois que o DOM é renderizado, buscar usuários na API
  setTimeout(async () => {
    const tbody = document.getElementById("usuarios-tbody");

    if (tbody) {
      try {
        // Chamada da API
        const response = await api.get("/api/usuarios");
        const usuarios = response.data;

        // Se não houver usuários
        if (!usuarios || usuarios.length === 0) {
          tbody.innerHTML = `
            <tr>
              <td colspan="3" style="text-align:center;">Nenhum usuário cadastrado.</td>
            </tr>`;
          return;
        }

        // Monta dinamicamente as linhas da tabela
        tbody.innerHTML = usuarios
          .map(
            (usuario: any) => `
            <tr>
              <td>${usuario.id}</td>
              <td>${usuario.nome}</td>
              <td class="action-buttons">
                <button class="action-button ver-livros" data-id="${usuario.id}">
                  <img src="assets/icons/book-icon.svg" class="button-icon" alt="" />
                  Ver livros
                </button>
                <button class="action-button editar" data-id="${usuario.id}">
                  <img src="assets/icons/edit-icon.svg" class="button-icon edit" alt="" />
                  Editar
                </button>
                <button class="action-button excluir" data-id="${usuario.id}">
                  <img src="assets/icons/delete-icon.svg" class="button-icon delete" alt="" />
                  Excluir
                </button>
              </td>
            </tr>
          `
          )
          .join("");
      } catch (error) {
        console.error(error);
        tbody.innerHTML = `
          <tr>
            <td colspan="3" style="text-align:center; color:red;">Erro ao carregar usuários.</td>
          </tr>`;
      }
    }
  }, 0);

  return table;
}
