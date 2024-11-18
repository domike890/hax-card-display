import { LitElement, html, css } from "lit";

export class HaxImage extends LitElement {

  constructor() {
    super();
    this.source = '';
    this.heading = '';
    this.lastUpdated = '';
    this.description = '';
    this.indexLink = '';
    this.additionalInfo = '';
    this.otherValue = '';
  }

  static get properties() {
    return {
        heading: {type: String},
        source: { type: String },
        lastUpdated: { type: String},
        description: { type: String },
        indexLink: { type: String},
        additionalInfo: { type: String},
        otherValue: {type: String},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [css`
    :host {
        display: inline-flex;
        height: auto;
        max-width: 240px;
        width: 240px;
        margin: 21px;
        font-family: var(--ddd-font-primary);
        background-color: var(--ddd-theme-default-nittanyNavy);
        font-weight: bold;
        text-align: left;
        padding: 8px;
        min-height: 270px;
    }
  

    .image div {
    max-width: 240px;
    font-size: 12px;
    background-color: var(--ddd-theme-default-nittanyNavy);
    padding: 4px;
    }
    .image:hover {
      opacity: 50%;
    }

    .image img {
    display: block;
    width: 240px;
    height: 200px;
    margin: auto;
    }
    a:link {
      color: var(--ddd-theme-defaut-slateMaxLight);
    }
    a:visited {
      color: var(--ddd-theme-defaut-slateMaxLight);
      text-decoration: none;
    }
    `];
  }
  get formattedLastUpdated() {
    return this.lastUpdated ? new Date(this.lastUpdated * 1000).toLocaleDateString() : '';
  }
  // Lit render the HTML
  render() {
    return html`
    <div class="image">
      <div class="image" ?hidden="${this.source === this.otherValue}">
          <img 
            src="${this.source}" 
            alt="${this.heading}" 
            />
      </div>
        <div>
          <h2>${this.heading}</h2>
          <p>Last Updated: ${this.formattedLastUpdated}</p>
          ${this.description}
          <a href="${this.indexLink}" target="_blank"><p>Index Link</p></a>
          ${this.additionalInfo ? html `
            <a href="${this.additionalInfo}" target="_blank">Video Link</a>
          ` : ''}
        </div>
    </div>
    `;
  }
  static get tag() {
    return "hax-image";
  }
}
customElements.define(HaxImage.tag, HaxImage);