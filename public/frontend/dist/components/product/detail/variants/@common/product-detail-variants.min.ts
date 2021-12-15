"use strict";

class ProductDetailVariantsBase extends Component {
  constructor(el) {
    super(el);
    this.buttons = this.$findAll('[data-variant-id]');
    this.addEventListeners();
  }

  changeVariant(variantId) {
    const selectedVariant = window.variantData.find(variant => variant.id === +variantId);
    if (selectedVariant === undefined) return;
    EventBus.getInstance().dispatchEvent('productVariantChanged', selectedVariant);
  }

  onVariantChange(el) {
    this.changeVariant(el.dataset.variantId);
  }

  onProductVariantChanged({
    detail: variant
  }) {
    for (const button of this.buttons) {
      button.classList.remove('is-active');

      if (button.dataset.variantId.toString() === variant.id.toString()) {
        button.classList.add('is-active');
      }
    }
  }

  addEventListeners() {
    this.buttons.forEach(button => button.addEventListener('click', () => this.onVariantChange(button)));
    EventBus.getInstance().addEventListener('productVariantChanged', e => this.onProductVariantChanged(e));
  }

}
//# sourceMappingURL=product-detail-variants.min.js.map
