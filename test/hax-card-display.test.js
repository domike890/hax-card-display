import { html, fixture, expect } from '@open-wc/testing';
import "../hax-card-display.js";

describe("HaxCardDisplay test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <hax-card-display
        title="title"
      ></hax-card-display>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
