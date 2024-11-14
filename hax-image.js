import { LitElement, html, css } from "lit";

export class HaxImage extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.alternte = '';
    this.secondary = '';
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
        alternte: { type: String },
        secondary: { type: String },
    };
  }

  static get styles() {
    return [css`
    

    .image {
    display: inline-flex;
    }

    .image div {
    max-width: 200px;
    height: 240px;
    font-size: 16px;
    font-weight: bold;
    }

    .image img {
    display: block;
    width: 240px;
    height: 240px;
    }
    .image:hover{
        opacity: .3;
    }
    `];
  }

  render() {
    return html`
    <div class="image">
        <img src="${this.source}" alt="${this.alternte}"/>
        <div>${this.title} <br>Secondary creator:${this.secondary}</div>
    </div>
    `;
  }
  static get tag() {
    return "hax-image";
  }
}
customElements.define(HaxImage.tag, HaxImage);