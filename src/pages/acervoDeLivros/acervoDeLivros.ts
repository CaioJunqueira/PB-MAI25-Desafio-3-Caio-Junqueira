import api from "../../services/axios";
import { ConfirmModal } from "../../components/ConfirmModal/confirmModal";
import { FormModal } from "../../components/FormModal/formModal";
import { InfoModal } from "../../components/InfoModal/infoModal"; // ⬅️ Adicionado
import "./style.css";

export function acervoDeLivros(): string {
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

  setTimeout(async () => {
    const tbody = document.getElementById("livros-tbody");

    if (tbody) {
      try {
        const response = await api.get("/api/livros");
        const livros = response.data;

        if (!livros || livros.length === 0) {
          tbody.innerHTML = `
            <tr>
              <td colspan="6" style="text-align:center;">Nenhum livro cadastrado.</td>
            </tr>`;
          return;
        }

        tbody.innerHTML = livros.map((livro: any) => `
          <tr data-id="${livro.id}">
            <td>${livro.id}</td>
            <td class="livro-titulo">${livro.titulo}</td>
            <td class="livro-autor">${livro.autor}</td>
            <td class="livro-ano">${livro.anoPublicacao}</td>
            <td class="livro-disponivel">${livro.disponivel ? "Disponível" : "Emprestado"}</td>
            <td class="action-buttons">
              ${livro.disponivel
                ? `<button class="action-button emprestar">
                    <img src="assets/icons/book-icon.svg" class="button-icon" alt="" />
                    Emprestar
                  </button>`
                : `<button class="action-button devolver">
                    <img src="assets/icons/book-icon.svg" class="button-icon" alt="" />
                    Devolver
                  </button>`}
              <button class="action-button editar">
                <img src="assets/icons/edit-icon.svg" class="button-icon edit" alt="" />
                Editar
              </button>
              <button class="action-button excluir">
                <img src="assets/icons/delete-icon.svg" class="button-icon delete" alt="" />
                Excluir
              </button>
            </td>
          </tr>`).join("");

        tbody.addEventListener("click", async (e) => {
          const target = e.target as HTMLElement;
          const btn = target.closest("button");
          if (!btn) return;

          const tr = btn.closest("tr") as HTMLTableRowElement;
          const id = tr?.dataset.id;
          if (!id) return;

          const tituloLivro = tr.querySelector(".livro-titulo")?.textContent || "Desconhecido";

          // Excluir
          if (btn.classList.contains("excluir")) {
            const modal = new ConfirmModal(
              "Excluir livro",
              `Tem certeza que deseja excluir o livro "${tituloLivro}"?`,
              async () => {
                try {
                  await api.delete(`/api/livros/${id}`);
                  tr.remove();
                  new InfoModal("Sucesso", "Livro excluído com sucesso!", () => {}, false).show();
                } catch (error) {
                  console.error(error);
                  new InfoModal("Erro", "Erro ao excluir livro.", () => {}, true).show();
                }
              },
              () => {}
            );
            modal.show();
            return;
          }

          // Editar
          if (btn.classList.contains("editar")) {
            try {
              const { data: livro } = await api.get(`/api/livros/${id}`);
              const content = `
                <form id="edit-livro-form">
                  <label>Título do livro</label>
                  <input type="text" id="titulo" class="input" value="${livro.titulo}" required />
                  <label>Autor do livro</label>
                  <input type="text" id="autor" class="input" value="${livro.autor}" required />
                  <label>Ano de publicação</label>
                  <input type="number" id="ano" class="input" value="${livro.anoPublicacao}" required />
                </form>
              `;

              const modal = new FormModal(
                `Edição de dados do livro`,
                content,
                async () => {
                  const titulo = (document.getElementById("titulo") as HTMLInputElement).value;
                  const autor = (document.getElementById("autor") as HTMLInputElement).value;
                  const ano = parseInt((document.getElementById("ano") as HTMLInputElement).value);

                  await api.put(`/api/livros/${id}`, { titulo, autor, anoPublicacao: ano });

                  tr.querySelector(".livro-titulo")!.textContent = titulo;
                  tr.querySelector(".livro-autor")!.textContent = autor;
                  tr.querySelector(".livro-ano")!.textContent = ano.toString();
                  new InfoModal("Sucesso", "Livro atualizado com sucesso!", () => {}, false).show();
                },
                () => {}
              );
              modal.show();
            } catch (error) {
              console.error(error);
              new InfoModal("Erro", "Erro ao buscar livro.", () => {}, true).show();
            }
            return;
          }

          // Emprestar
          if (btn.classList.contains("emprestar")) {
            try {
              const { data: usuarios } = await api.get("/api/usuarios");
              const options = usuarios
                .map((usuario: any) => `<option value="${usuario.id}">${usuario.nome}</option>`)
                .join("");

              const content = `
                <form id="emprestar-livro-form">
                  <label for="usuarioId">Selecione o usuário</label>
                  <select id="usuarioId" class="input form" required>
                    <option value="">Escolha um usuário</option>
                    ${options}
                  </select>
                </form>`;

              const modal = new FormModal(
                "Empréstimo de livro",
                content,
                async () => {
                  const usuarioId = (document.getElementById("usuarioId") as HTMLSelectElement).value;
                  if (!usuarioId) {
                    new InfoModal("Erro", "Selecione um usuário para o empréstimo.", () => {}, true).show();
                    return;
                  }

                  await api.post(`/api/livros/${id}/emprestar/${usuarioId}`);
                  tr.querySelector(".livro-disponivel")!.textContent = "Emprestado";

                  tr.querySelector(".emprestar")!.outerHTML = `
                    <button class="action-button devolver">
                      <img src="assets/icons/book-icon.svg" class="button-icon" alt="" />
                      Devolver
                    </button>`;

                  new InfoModal("Sucesso", "Livro emprestado com sucesso!", () => {}, false).show();
                },
                () => {}
              );
              modal.show();
            } catch (error) {
              console.error(error);
              new InfoModal("Erro", "Erro ao buscar usuários.", () => {}, true).show();
            }
            return;
          }

          // Devolver
          if (btn.classList.contains("devolver")) {
            const modal = new ConfirmModal(
              "Devolver livro",
              `Deseja realmente devolver o livro "${tituloLivro}"?`,
              async () => {
                try {
                  await api.post(`/api/livros/${id}/devolver`);
                  tr.querySelector(".livro-disponivel")!.textContent = "Disponível";

                  tr.querySelector(".devolver")!.outerHTML = `
                    <button class="action-button emprestar">
                      <img src="assets/icons/book-icon.svg" class="button-icon" alt="" />
                      Emprestar
                    </button>`;

                  new InfoModal("Sucesso", "Livro devolvido com sucesso!", () => {}, false).show();
                } catch (error) {
                  console.error(error);
                  new InfoModal("Erro", "Erro ao devolver livro.", () => {}, true).show();
                }
              },
              () => {}
            );
            modal.show();
            return;
          }
        });
      } catch (error) {
        console.error(error);
        tbody.innerHTML = `
          <tr>
            <td colspan="6" style="text-align:center; color:red;">Erro ao carregar livros.</td>
          </tr>`;
      }
    }
  }, 0);

  return table;
}
