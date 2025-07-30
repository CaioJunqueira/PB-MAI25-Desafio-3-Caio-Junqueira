import api from "../../services/axios";
import "./style.css";

export function acervoDeLivros(): string {
  // Estrutura inicial da tabela com coluna ID adicionada
  const table = `
    <section>
      <h1 class="title">Bem-vindo à biblioteca!</h1>
      <p class="description">Conheça nosso acervo de livros.</p>

      <table id="livros-table" class="book-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Ano</th>
            <th>Disponibilidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody id="livros-tbody">
          <tr>
            <td colspan="6" style="text-align:center;">Carregando livros...</td>
          </tr>
        </tbody>
      </table>
    </section>
  `;

  // Depois que o DOM é renderizado, buscamos os dados da API
  setTimeout(async () => {
    const tbody = document.getElementById("livros-tbody");

    if (tbody) {
      try {
        // Chama a API
        const response = await api.get("/api/livros");
        const livros = response.data;

        // Se não houver livros cadastrados
        if (!livros || livros.length === 0) {
          tbody.innerHTML = `
            <tr>
              <td colspan="6" style="text-align:center;">Nenhum livro cadastrado.</td>
            </tr>`;
          return;
        }

        // Monta as linhas da tabela dinamicamente
        tbody.innerHTML = livros
          .map(
            (livro: any) => `
            <tr>
              <td>${livro.id}</td>
              <td>${livro.titulo}</td>
              <td>${livro.autor}</td>
              <td>${livro.anoPublicacao}</td>
              <td>${livro.disponivel ? "Disponível" : "Emprestado"}</td>
              <td class="action-buttons">
                ${
                  livro.disponivel
                    ? `
                    <button class="action-button emprestar" data-id="${livro.id}">
                      <img src="assets/icons/book-icon.svg" class="button-icon" alt="" />
                      Emprestar
                    </button>
                  `
                    : `
                    <button class="action-button devolver" data-id="${livro.id}">
                      <img src="assets/icons/book-icon.svg" class="button-icon" alt="" />
                      Devolver
                    </button>
                  `
                }
                <button class="action-button editar" data-id="${livro.id}">
                  <img src="assets/icons/edit-icon.svg" class="button-icon edit" alt="" />
                  Editar
                </button>
                <button class="action-button excluir" data-id="${livro.id}">
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
            <td colspan="6" style="text-align:center; color: red;">Erro ao carregar livros.</td>
          </tr>`;
      }
    }
  }, 0);

  return table;
}
