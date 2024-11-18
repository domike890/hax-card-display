/**
 * Copyright 2024 
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./hax-image.js";
import "./hax-info.js";
/**
 * `hax-card-display`
 * 
 * @demo index.html
 * @element hax-card-display
 */
export class HaxCardDisplay extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "hax-card-display";
  }
  constructor() {
    super();
    this.showResults = false;
    this.value = '';
    this.title = '';
    this.description = '';
    this.logo = '';
    this.theme = '';
    this.creationDate = '';
    this.lastUpdated = '';
    this.header = '';
    this.loading = false;
    this.items = [];
    this.logoImage = `https://haxtheweb.org/files/hax%20(1).png`;
    this.renderItems = [];
    this.icon = '';
  }

  // Lit reactive properties
  static get properties() {
    return {
      header: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array, },
      value: { type: String },
      showResults: { type: Boolean},
      renderItems: { type: Array},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: auto;
        padding: var(--ddd-spacing-4);
        text-align: center;
      }
      h5 {
        display: inline-flex;
      }
      #input {
        font-family: Verdana, Geneva, Tahoma, sans-serif();
      }
      input{
        width: 400px;
        height: 40px;
      }
      button{
        width: 64px;
        height: 44px;
        color: var(--ddd-theme-default-coalyGray);
      }
      .overview{
        text-align: center;
        margin: var(--ddd-spacing-m-8);
      }
      a:link {
        color: var(--ddd-theme-defaut-slateMaxLight);
        text-decoration: none;
      }
      a:visited {
        color: var(--ddd-theme-defaut-slateMaxLight);
        text-decoration: none;
      }
      site-info {
        margin: auto;
        display: none;
        text-align: center;
      }
      .results {
        text-align: center;
      }
      page-item {
        margin: 20px;
        text-align: center;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <!--search bar-->
        <h5>${this.header}</h5>
        <input type='text' id="input" placeholder="Enter URL here" @input='${this.inputChanged}'/>
        <button class="button" @click = ${this.toggleResultsDisplay}>Analyze</button>
      </div>

  <!--displays the overview box-->
      ${this.showResults ? html `
      <div> 
        <div class='overview'>
        <hax-info 
          name=${this.title}
          description=${this.description}
          logo=${this.logoImage}
          theme=${this.theme}
          creationDate=${this.formattedCreationDate}
          lastUpdated=${this.formattedLastUpdated}
        >
        <span> 
          <simple-icon icon=${this.icon}></simple-icon>
        </span>
        </hax-info>
        </div>
        <div class="results">
          ${this.renderItems || []}
        </div>
      </div>
      ` : ''}
      
    `;
  }

  toggleResultsDisplay() {
    this.showResults = true;
    this.requestUpdate(); 
    this.updateResults(this.value);
  }

    get formattedCreationDate() {
      return this.creationDate ? new Date(this.creationDate * 1000).toLocaleDateString() : '';
    }
  
    get formattedLastUpdated() {
      return this.lastUpdated ? new Date(this.lastUpdated * 1000).toLocaleDateString() : '';
    }
  
  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }

  //updating the value when typed in
  updated(changedProperties) {
    if (changedProperties.has('value') && this.value) {
      if (!this.value.indexOf('site.json' > -1)) {
        this.value += 'site.json';
      }
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
      console.error("No items found.");
    }
    //debugging:
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  //updating results based on search
  updateResults(value) {
    const siteInfo = this.shadowRoot.querySelector('hax-info');
    if (siteInfo) siteInfo.style.display = 'block';

    this.loading = true;

    //testing if site.json is in the value
    if (!this.value.includes('site.json')) {
      fetch(`${this.value}/site.json`).then(d => d.ok ? d.json(): {}).then(data => {
        if (data) {
          this.items = [];
          this.items = data.items;
          this.title = data.title;
          this.icon = data.metadata.theme.variables.icon;
          this.description = data.description;
          this.logo = data.metadata.site.logoImage;
          this.theme = data.metadata.theme.variables.hexCode || '';
          this.creationDate = data.metadata.site.created || '';
          this.lastUpdated = data.metadata.site.updated || '';
  
          this.renderItems = (data.items || []).map((item) => {
            return html `
            <a href="${this.value}/${item.slug}" target="_blank">
              <hax-image
                source="${this.value}/${item.metadata.images[0]}"
                otherValue="${this.value}/"
                heading="${item.title}"
                lastUpdated="${item.metadata.updated}"
                description="${item.description}"
                indexLink="${this.value}/${item.location}"
                additionalinfo="${item.metadata.videos?.[0]}"
              ></hax-image>
            </a>
            `
          });
        } else {
          console.error("Data format issue");
          this.items = [];
        }
        this.loading = false;
        this.requestUpdate(); 
      });
    } else {
      fetch(`${this.value}`).then(d => d.ok ? d.json(): {}).then(data => {
        console.log(data);
        this.value = this.value.replace(/\/site\.json$/, '');
        if (data) {
          this.items = [];
          this.items = data.items;
          console.log("hax: ", this.items)
          this.title = data.title || '';
          this.icon = data.metadata.theme.variables.icon || '';
          this.description = data.description || '';
          this.logo = data.metadata.site.logoImage || '';
          this.theme = data.metadata.theme.variables.hexCode || '';
          this.creationDate = data.metadata.site.created || '';
          this.lastUpdated = data.metadata.site.updated || '';
  
          this.renderItems = (data.items || []).map((item) => {
            return html `
            <a href="${this.value}/${item.slug}" target="_blank">
              <hax-image
                source="${this.value}/${item.metadata.images}"
                heading="${item.title}"
                lastUpdated="${item.metadata.updated}"
                description="${item.description}"
                indexLink="${this.value}/${item.location}"
                additionalinfo="${item.metadata.videos?.[0]?.href}"
              ></hax-image>
            </a>
            `
          });
        } else {
          console.error("Data format issue");
          this.items = [];
        }
        this.loading = false;
        this.requestUpdate(); 
      });
    }
    //fetching the data
    
  }
  /**
   * haxProperties integration via file reference
   */
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(HaxCardDisplay.tag, HaxCardDisplay);