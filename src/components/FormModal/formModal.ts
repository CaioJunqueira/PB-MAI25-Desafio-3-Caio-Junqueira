import "./style.css";

export class FormModal {
  private title: string;
  private onConfirm: () => void;
  private onCancel: () => void;
  private closing = false;

  public modalElement: HTMLElement;
  private wrapperElement: HTMLElement;

  constructor(
    title: string,
    contentHtml: string,
    onConfirm: () => void,
    onCancel: () => void
  ) {
    this.title = title;
    this.onConfirm = onConfirm;
    this.onCancel = onCancel;

    this.modalElement = document.createElement("div");
    this.modalElement.className = "form-modal-background";

    this.modalElement.innerHTML = `
      <div class="form-modal-wrapper">
        <div class="form-modal-container">
          <div class="form-modal-header">${this.title}</div>
          <div class="form-modal-main-content-wrapper">
            <div class="modal-main-content">
              ${contentHtml}
            </div>
          </div>
          <div class="form-modal-footer">
            <button class="form-modal-btn-cancelar">Cancelar</button>
            <button class="form-modal-btn-confirmar">Confirmar</button>
          </div>
        </div>
      </div>
    `;

    this.wrapperElement = this.modalElement.querySelector(
      ".form-modal-wrapper"
    ) as HTMLElement;


    this.modalElement
      .querySelector(".form-modal-btn-cancelar")!
      .addEventListener("click", () => this.handleClose(this.onCancel));

    this.modalElement
      .querySelector(".form-modal-btn-confirmar")!
      .addEventListener("click", () => this.handleClose(this.onConfirm));
  }

  public show(): void {
    document.body.appendChild(this.modalElement);
  }

  private handleClose(callback: () => void): void {
    if (this.closing) return;
    this.closing = true;

    callback();

    this.wrapperElement.classList.add("closing");

    setTimeout(() => {
      document.body.removeChild(this.modalElement);
    }, 500);
  }
}
