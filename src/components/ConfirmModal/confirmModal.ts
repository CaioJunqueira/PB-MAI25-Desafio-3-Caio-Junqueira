import "./style.css";

export class ConfirmModal {
  private title: string;
  private text: string;
  private onConfirm: () => void;
  private onCancel: () => void;
  private iconPath: string;

  private modalElement: HTMLElement;
  private containerElement: HTMLElement;
  private closing = false;

  constructor(
    title: string,
    text: string,
    onConfirm: () => void,
    onCancel: () => void,
    iconPath: string = "/assets/icons/warning-orange-icon.svg"
  ) {
    this.title = title;
    this.text = text;
    this.onConfirm = onConfirm;
    this.onCancel = onCancel;
    this.iconPath = iconPath;

    
    this.modalElement = document.createElement("div");
    this.modalElement.className = "confirm-modal-background";

    this.modalElement.innerHTML = `
      <div class="confirm-modal-container">
        <img class="confirm-modal-icon" src="${this.iconPath}" alt="Alerta" />
        <div class="confirm-modal-text-container">
          <h1 class="confirm-modal-title">${this.title}</h1>
          <p class="confirm-modal-text">${this.text}</p>
        </div>
        <div class="confirm-modal-footer">
          <button class="confirm-modal-btn-cancelar">Cancelar</button>
          <button class="confirm-modal-btn-confirmar">Confirmar</button>
        </div>
      </div>
    `;

    this.containerElement = this.modalElement.querySelector(
      ".confirm-modal-container"
    ) as HTMLElement;

  
    this.modalElement
      .querySelector(".confirm-modal-btn-cancelar")!
      .addEventListener("click", () => this.handleCancel());

    this.modalElement
      .querySelector(".confirm-modal-btn-confirmar")!
      .addEventListener("click", () => this.handleConfirm());
  }

  public show(): void {
    document.body.appendChild(this.modalElement);
  }

  private handleConfirm(): void {
    this.close(() => this.onConfirm());
  }

  private handleCancel(): void {
    this.close(() => this.onCancel());
  }

  private close(callback: () => void): void {
    if (this.closing) return;
    this.closing = true;
    this.containerElement.classList.add("closing");

    setTimeout(() => {
      document.body.removeChild(this.modalElement);
      callback();
    }, 300);
  }
}
