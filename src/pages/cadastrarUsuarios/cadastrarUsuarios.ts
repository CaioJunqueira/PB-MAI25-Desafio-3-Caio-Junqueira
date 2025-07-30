import { createFormSection } from "../../components/FormSection/formSection";
import api from "../../services/axios";
import "./style.css";

export function cadastrarUsuarios(): string {
  const form = `
    <form id="cadastro-usuarios-form">
      <div class="input-group">
        <label for="nome">Nome do usuário</label>
        <input type="text" id="nome" name="nome" placeholder="Digite o nome do usuário" class="input" required />
      </div>
      <button type="submit" class="register-button">Cadastrar Usuário</button>
    </form>
  `;

  const container = createFormSection("Cadastrar novo usuário", form);

  setTimeout(() => {
    const formElement = document.getElementById("cadastro-usuarios-form") as HTMLFormElement;

    if (formElement) {
      formElement.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nomeInput = (document.getElementById("nome") as HTMLInputElement).value.trim();

        if (!nomeInput) {
          alert("⚠️ Informe o nome do usuário antes de cadastrar!");
          return;
        }

        try {
          const response = await api.post("/api/usuarios", {
            nome: nomeInput,
          });

          alert("✅ Usuário cadastrado com sucesso!");
          formElement.reset();
          console.log("Resposta da API:", response.data);
        } catch (error) {
          console.error(error);
          alert("❌ Erro ao cadastrar usuário. Tente novamente.");
        }
      });
    }
  }, 0);

  return container;
}
