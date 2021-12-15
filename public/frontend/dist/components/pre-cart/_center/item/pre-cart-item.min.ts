"use strict";

class PreCartItem extends Component {
  constructor(el) {
    super(el);
    this.image = this.$find('[data-image]');
    this.title = this.$find('[data-title]');
    this.count = this.$find('[data-count]');
    this.price = this.$find('[data-price]');
    EventBus.getInstance().addEventListener('cartUpdated', e => this.onCartUpdated(e.detail));
  }

  onCartUpdated({
    preCart: data
  }) {
    this.image.innerHTML = data.product.image;
    this.title.innerText = data.product.title;
    this.count.innerText = data.product.count;
    this.price.innerHTML = data.product.price;
  }

}
//# sourceMappingURL=pre-cart-item.min.js.map
