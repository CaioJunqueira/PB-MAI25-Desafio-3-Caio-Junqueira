import "./style.css";

export function createHeader() {
  const headerHTML = `
    <header class="header">
      <h1 class="header-logo">MyLibrary</h1>
      
      <button class="menu-toggle" aria-label="Abrir menu">&#9776;</button>
      
      <nav class="header-nav">
        <a href="#acervo-de-livros" class="nav-link">Acervo de livros</a>
        <a href="#cadastrar-livros" class="nav-link">Cadastrar livros</a>
        <a href="#usuarios-cadastrados" class="nav-link">Usuários cadastrados</a>
        <a href="#cadastrar-usuarios" class="nav-link">Cadastrar usuários</a>
      </nav>
    </header>
  `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  const navLinks = document.querySelectorAll('.nav-link');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.header-nav');

  const setActiveLink = () => {
    const currentHash = window.location.hash;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === currentHash);
    });
  };

  setActiveLink();

  window.addEventListener('hashchange', setActiveLink);

  menuToggle?.addEventListener('click', () => {
    nav?.classList.toggle('show');
  });
}

