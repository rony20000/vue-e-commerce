"use strict";

class ProductDetailStock extends Component {
  constructor(el) {
    super(el);
    this.stockHolder = this.$find('[data-stock-placeholder]');
    EventBus.getInstance().addEventListener('productVariantChanged', e => this.onVariantChange(e.detail));
  }

  onVariantChange(variant) {
    this.stockHolder.innerText = variant.availability;

    if (variant.salable) {
      this.stockHolder.classList.add('is-in');
      this.stockHolder.classList.remove('is-out');
    } else {
      this.stockHolder.classList.add('is-out');
      this.stockHolder.classList.remove('is-in');
    }
  }

}
//# sourceMappingURL=product-detail-stock.min.js.map
