import "./style.css"

export function usuariosCadastrados(): string {
  return `
    <section>
      <h1>Usuários Cadastrados</h1>
      <p>Lista de todos os usuários registrados no sistema.</p>

      <table class="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ana Souza</td>
            <td>
              <button class="action-button">Ver Livros</button>
              <button class="action-button">Editar</button>
              <button class="action-button">Excluir</button>
            </td>
          </tr>
          <tr>
            <td>João Pereira</td>
            <td>
              <button class="action-button">Ver Livros</button>
              <button class="action-button">Editar</button>
              <button class="action-button">Excluir</button>
            </td>
          </tr>
          <!-- Adicione mais usuários conforme necessário -->
        </tbody>
      </table>
    </section>
  `;
}
