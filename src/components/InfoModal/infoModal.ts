import "./style.css";

export class InfoModal {
  private container: HTMLElement;
  private background: HTMLElement;
  private timer: ReturnType<typeof setTimeout> | null = null;

  private title: string;
  private message: string;
  private closeCallback: () => void;
  private isError: boolean;
  private duration: number;

  constructor(
    title: string,
    message: string,
    closeCallback: () => void = () => {},
    isError: boolean = false,
    duration: number = 3000
  ) {
    this.title = title;
    this.message = message;
    this.closeCallback = closeCallback;
    this.isError = isError;
    this.duration = duration;

    this.background = document.createElement("div");
    this.container = document.createElement("div");

    this.render();
  }

  private render() {
    this.background.className = "info-modal-background";
    this.container.className = "info-modal-container";

    const icon = document.createElement("img");
    icon.className = "info-modal-icon";
    icon.src = this.isError
      ? "/assets/icons/icon-error-red.svg"
      : "/assets/icons/icon-success-blue.svg";

    const textContainer = document.createElement("div");
    textContainer.className = "info-modal-text-container";

    const titleEl = document.createElement("h1");
    titleEl.className = "info-modal-title";
    titleEl.innerText = this.title;

    const textEl = document.createElement("p");
    textEl.className = "info-modal-text";
    textEl.innerText = this.message;

    textContainer.append(titleEl, textEl);
    this.container.append(icon, textContainer);
    this.background.appendChild(this.container);
  }

  public show() {
    document.body.appendChild(this.background);

    setTimeout(() => {
      this.container.classList.add("fade-out");
      setTimeout(() => {
        this.close();
      }, 500);
    }, this.duration);
  }

  public close() {
    this.background.remove();
    this.closeCallback();
  }
}
