import "./style.css"

export function acervoDeLivros(): string {
  return `
    <section>
      <h1>Bem-vindo à biblioteca!</h1>
      <p>Acervo de livros.</p>

      <table class="book-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Ano</th>
            <th>Disponibilidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dom Casmurro</td>
            <td>Machado de Assis</td>
            <td>1899</td>
            <td>Disponível</td>
            <td>
              <button class="action-button">Emprestar</button>
              <button class="action-button">Editar</button>
              <button class="action-button">Excluir</button>
            </td>
          </tr>
          <tr>
            <td>A Revolução dos Bichos</td>
            <td>George Orwell</td>
            <td>1945</td>
            <td>Emprestado</td>
            <td>
              <button class="action-button">Devolver</button>
              <button class="action-button">Editar</button>
              <button class="action-button">Excluir</button>
            </td>
          </tr>
          <!-- Adicione mais linhas conforme necessário -->
        </tbody>
      </table>
    </section>
  `;
}

