import "./style.css";

export class DescriptionModal {
  private children: string;
  private closeModal: () => void;
  private pannel: boolean;
  private modalBackground: HTMLElement;
  private modalWrapper: HTMLElement;
  private modalContainer: HTMLElement;
  private closing = false;

  constructor(children: string, closeModal: () => void, pannel: boolean = false) {
    this.children = children;
    this.closeModal = closeModal;
    this.pannel = pannel;

    this.modalBackground = document.createElement("div");
    this.modalBackground.className = "modal-background";

    this.modalWrapper = document.createElement("div");
    this.modalWrapper.className = "modal-wrapper";

    this.modalContainer = document.createElement("div");
    this.modalContainer.className = "modal-container";

    const header = document.createElement("div");
    header.className = "modal-header";

    const title = document.createElement("div");
    title.className = "modal-title";
    title.textContent = "Livros emprestados";

    const closeButton = document.createElement("button");
    closeButton.className = "modal-close-button";
    closeButton.innerHTML = `<img src="/assets/icons/close-icon-gray.svg" class="close-icon" alt="Fechar"/>`;
    closeButton.addEventListener("click", () => this.handleClose());

    header.appendChild(title);
    header.appendChild(closeButton);

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "modal-main-content-wrapper";

    const content = document.createElement("div");
    content.className = "modal-main-content";
    if (this.pannel) content.classList.add("pannel");

    const description = document.createElement("div");
    description.className = "modal-description-text";
    description.innerHTML = this.children;

    content.appendChild(description);
    contentWrapper.appendChild(content);

    this.modalContainer.appendChild(header);
    this.modalContainer.appendChild(contentWrapper);

    this.modalWrapper.appendChild(this.modalContainer);
    this.modalBackground.appendChild(this.modalWrapper);
  }

  public show(): void {
    document.body.appendChild(this.modalBackground);
  }

  private handleClose(): void {
    if (this.closing) return;
    this.closing = true;
    this.modalWrapper.classList.add("closing");

    setTimeout(() => {
      document.body.removeChild(this.modalBackground);
      this.closeModal();
    }, 500);
  }
}
