"use strict";

class CartHolder extends Component {
  constructor(el) {
    super(el);
    this.initElements();
    EventBus.getInstance().addEventListener('cartUpdated', e => this.reRenderCart(e.detail));
  }

  initElements() {
    this.toConfBtn = this.$find('[data-to-config]');
    this.backBtn = this.$find('[data-back-button]');
    this.confHolder = this.$find('[data-conf-holder]');
    this.addEventListeners();
  }

  showConfTab() {
    this.confHolder.classList.add('is-active');
  }

  hideConfTab() {
    this.confHolder.classList.remove('is-active');
  }

  reRenderCart({
    cartHolder
  }) {
    const template = document.createElement('template');
    template.innerHTML = cartHolder;
    this.$el.innerHTML = template.content.firstElementChild.innerHTML;
    this.initElements();
  }

  addEventListeners() {
    this.toConfBtn && this.toConfBtn.addEventListener('click', () => this.showConfTab());
    this.backBtn && this.backBtn.addEventListener('click', () => this.hideConfTab());
  }

}
//# sourceMappingURL=cart-holder.min.js.map
