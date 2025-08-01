import { createFormSection } from "../../components/FormSection/formSection";
import api from "../../services/axios";
import { InfoModal } from "../../components/InfoModal/infoModal";
import "./style.css";

export function cadastrarLivros(): string {
  const form = `
    <form id="cadastro-livros-form">
      <div class="input-group">
        <label for="titulo">Título do Livro</label>
        <input type="text" id="titulo" name="titulo" placeholder="Digite o título do livro" class="input-books" required />
      </div>

      <div class="input-group">
        <label for="autor">Autor do Livro</label>
        <input type="text" id="autor" name="autor" placeholder="Digite o autor do livro" class="input-books" required />
      </div>

      <div class="input-group">
        <label for="anoPublicacao">Ano de Publicação</label>
        <input type="text" id="anoPublicacao" name="anoPublicacao" placeholder="Digite o ano de publicação" class="input-books" required />
      </div>

      <button type="submit" class="register-button">Cadastrar Livro</button>
    </form>
  `;

  const container = createFormSection("Cadastrar novo livro", form);

  setTimeout(() => {
    const formElement = document.getElementById("cadastro-livros-form") as HTMLFormElement;

    if (formElement) {
      formElement.addEventListener("submit", async (event) => {
        event.preventDefault();

        const titulo = (document.getElementById("titulo") as HTMLInputElement).value.trim();
        const autor = (document.getElementById("autor") as HTMLInputElement).value.trim();
        const anoPublicacao = (document.getElementById("anoPublicacao") as HTMLInputElement).value.trim();

        if (!titulo || !autor || !anoPublicacao) {
          new InfoModal(
            "Campos obrigatórios",
            "⚠️ Preencha todos os campos antes de cadastrar.",
            () => {},
            true
          ).show();
          return;
        }

        try {
          const response = await api.post("/api/livros", {
            titulo,
            autor,
            anoPublicacao,
          });

          new InfoModal(
            "Sucesso!",
            "Livro cadastrado com sucesso!",
            () => {},
            false
          ).show();

          formElement.reset();
          console.log("Livro cadastrado:", response.data);
        } catch (error) {
          console.error(error);
          new InfoModal(
            "Erro ao cadastrar",
            "Verifique os dados e tente novamente.",
            () => {},
            true
          ).show();
        }
      });
    }
  }, 0);

  return container;
}
