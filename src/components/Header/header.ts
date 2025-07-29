import "./style.css";

export function createHeader() {
  // Cria o HTML do header
  const headerHTML = `
    <header class="header">
      <h1 class="header-logo">MyLibrary</h1>
      <nav class="header-nav">
        <a href="#acervo-de-livros" class="nav-link">Acervo de livros</a>
        <a href="#cadastrar-livros" class="nav-link">Cadastrar livros</a>
        <a href="#usuarios-cadastrados" class="nav-link">Usuários cadastrados</a>
        <a href="#cadastrar-usuarios" class="nav-link">Cadastrar usuários</a>
      </nav>
    </header>
  `;

  // Insere o HTML no topo do body
  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  // Lógica para ativar o link atual com base no hash da URL
  const currentHash = window.location.hash;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentHash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Atualiza os links quando mudar de hash
  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === newHash);
    });
  });
}
