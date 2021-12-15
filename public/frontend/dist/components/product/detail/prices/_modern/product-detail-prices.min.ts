"use strict";

class ProductDetailPrices extends Component {
  constructor(el) {
    super(el);
    this.priceOriginEl = this.$find('[data-price-original]');
    this.priceVatEl = this.$find('[data-price-vat]');
    this.priceNoVatEl = this.$find('[data-price-no-vat]');
    this.addEventListeners();
  }

  updatePrices(variant) {
    this.priceOriginEl.innerHTML = variant.originalPrice;
    this.priceVatEl.innerHTML = variant.priceVAT;
    this.priceNoVatEl.innerHTML = variant.price + ' ';
  }

  addEventListeners() {
    EventBus.getInstance().addEventListener('productVariantChanged', e => this.updatePrices(e.detail));
  }

}
//# sourceMappingURL=product-detail-prices.min.js.map
