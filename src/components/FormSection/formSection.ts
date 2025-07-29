import "./style.css";

export function createFormSection(title: string, formHtml: string): string {
  return `
    <section class="form-container">
      <h2>${title}</h2>
      ${formHtml}
    </section>
  `;
}
