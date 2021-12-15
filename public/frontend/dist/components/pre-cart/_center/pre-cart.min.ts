"use strict";

class PreCart extends Component {
  constructor(el) {
    super(el);
    this.contetnWrap = this.$find('[data-content]');
    this.closers = this.$findAll('[data-close]');
    this.deliveryBarHolder = this.$find('[data-delivery-bar]');
    this.crosssellContainer = this.$find('[data-crossel-container]');
    this.crosssellList = this.$find('[data-crossell-list]');
    this.addEventListeners();
  }

  showPreCart() {
    this.$el.classList.add('is-active');
  }

  hidePreCart(e) {
    e.preventDefault();
    this.$el.classList.remove('is-active');
  }

  replaceDeliveryBar(contentHTMLString) {
    this.deliveryBarHolder.innerHTML = contentHTMLString;
  }

  onCartUpdated({
    freeDeliveryBar,
    preCart
  }) {
    this.replaceDeliveryBar(freeDeliveryBar);
    this.crosssellContainer.classList[preCart.crosssellHtml ? 'remove' : 'add']('u-hidden');
    this.crosssellList.innerHTML = preCart.crosssellHtml;
    EventBus.getInstance().dispatchEvent('hideGlobalSpinner');
    this.showPreCart();
  }

  addEventListeners() {
    this.$el.addEventListener('click', e => this.hidePreCart(e));
    this.closers.forEach(closer => closer.addEventListener('click', e => this.hidePreCart(e)));
    this.contetnWrap.addEventListener('click', e => e.stopPropagation());
    EventBus.getInstance().addEventListener('cartUpdated', e => this.onCartUpdated(e.detail));
  }

}
//# sourceMappingURL=pre-cart.min.js.map
