import api from "../../services/axios";
import { ConfirmModal } from "../../components/ConfirmModal/confirmModal";
import { FormModal } from "../../components/FormModal/formModal";
import { DescriptionModal } from "../../components/DescriptionModal/descriptionModal";
import { InfoModal } from "../../components/InfoModal/infoModal";
import "./style.css";

export function usuariosCadastrados(): string {
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

  setTimeout(async () => {
    const tbody = document.getElementById("usuarios-tbody");

    if (tbody) {
      try {
        const response = await api.get("/api/usuarios");
        const usuarios = response.data;

        if (!usuarios || usuarios.length === 0) {
          tbody.innerHTML = `
            <tr>
              <td colspan="3" style="text-align:center;">Nenhum usuário cadastrado.</td>
            </tr>`;
          return;
        }

        tbody.innerHTML = usuarios
          .map(
            (usuario: any) => `
              <tr data-id="${usuario.id}" data-nome="${usuario.nome}">
                <td>${usuario.id}</td>
                <td class="usuario-nome">${usuario.nome}</td>
                <td class="action-buttons">
                  <button class="action-button ver-livros">
                    <img src="assets/icons/book-icon.svg" class="button-icon" alt="" />
                    Ver livros
                  </button>
                  <button class="action-button editar">
                    <img src="assets/icons/edit-icon.svg" class="button-icon edit" alt="" />
                    Editar
                  </button>
                  <button class="action-button excluir">
                    <img src="assets/icons/delete-icon.svg" class="button-icon delete" alt="" />
                    Excluir
                  </button>
                </td>
              </tr>
            `
          )
          .join("");

        // Delegação de eventos
        tbody.addEventListener("click", async (e) => {
          const target = e.target as HTMLElement;
          const btn = target.closest("button");
          if (!btn) return;

          const tr = btn.closest("tr") as HTMLTableRowElement;
          const id = tr.dataset.id;
          const nome = tr.dataset.nome;

          if (!id || !nome) return;

          // Ver livros emprestados
          if (btn.classList.contains("ver-livros")) {
            try {
              const { data: livros } = await api.get(`/api/usuarios/${id}/livros-emprestados`);

              if (!livros || livros.length === 0) {
                new InfoModal(
                  "Sem livros emprestados",
                  `📚 O usuário "${nome}" não possui livros emprestados.`,
                  () => {},
                  true
                ).show();
                return;
              }

              const conteudo = livros
                .map(
                  (livro: any) => `
                    <div class="book-item">
                      <div class="book-title">${livro.titulo}</div>
                      <div class="book-author">Autor: ${livro.autor}</div>
                      <div class="book-year">Ano: ${livro.anoPublicacao}</div>
                    </div>
                  `
                )
                .join("");

              const modal = new DescriptionModal(conteudo, () => {}, false);
              modal.show();
            } catch (error) {
              console.error(error);
              new InfoModal(
                "Usuário sem livros",
                "O usuário não possui livros emprestados.",
                () => {},
                true
              ).show();
            }
            return;
          }

          // Excluir usuário
          if (btn.classList.contains("excluir")) {
            const modal = new ConfirmModal(
              "Excluir usuário",
              `Tem certeza que deseja excluir o usuário "${nome}"?`,
              async () => {
                try {
                  await api.delete(`/api/usuarios/${id}`);
                  tr.remove();
                  new InfoModal(
                    "Usuário excluído",
                    `O usuário "${nome}" foi removido com sucesso.`,
                    () => {},
                    false
                  ).show();
                } catch (error) {
                  console.error(error);
                  new InfoModal(
                    "Erro ao excluir usuário",
                    "Ocorreu um erro ao tentar excluir o usuário.",
                    () => {},
                    true
                  ).show();
                }
              },
              () => {
                console.log("Exclusão cancelada");
              }
            );
            modal.show();
            return;
          }

          // Editar usuário
          if (btn.classList.contains("editar")) {
            try {
              const { data: usuario } = await api.get(`/api/usuarios/${id}`);

              const content = `
                <form id="edit-usuario-form">
                  <label>Nome do usuário</label>
                  <input type="text" id="nome" class="input form" value="${usuario.nome}" required />
                </form>
              `;

              const modal = new FormModal(
                `Edição de dados do usuário`,
                content,
                async () => {
                  const nomeAtualizado = (document.getElementById("nome") as HTMLInputElement).value;
                  await api.put(`/api/usuarios/${id}`, { nome: nomeAtualizado });
                  tr.querySelector(".usuario-nome")!.textContent = nomeAtualizado;
                  new InfoModal(
                    "Usuário atualizado",
                    `Nome alterado para "${nomeAtualizado}"`,
                    () => {},
                    false
                  ).show();
                },
                () => console.log("Edição cancelada")
              );

              modal.show();
            } catch (error) {
              console.error(error);
              new InfoModal(
                "Erro ao buscar usuário",
                "Não foi possível carregar os dados do usuário.",
                () => {},
                true
              ).show();
            }
            return;
          }
        });
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
