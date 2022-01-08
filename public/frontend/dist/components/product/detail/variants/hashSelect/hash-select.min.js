"use strict";

class HashSelect extends Component {
  constructor(el) {
    super(el);
    this.default = el.dataset.default;
    this.addEventListeners();
  }

  changeVariant(variantId) {
    const selectedVariant = window.variantData.find(variant => variant.id === +variantId);

    if (selectedVariant === undefined) {
      return false;
    }

    EventBus.getInstance().dispatchEvent('productVariantChanged', selectedVariant);
    return true;
  }

  onDocumentReady() {
    if (window.location.hash && this.changeVariant(window.location.hash.substring(1))) {
      return;
    }

    this.changeVariant(this.default) || this.changeVariant(variantData[0].id);
  }

  onProductVariantChanged({
    detail: variant
  }) {
    window.location.hash = '#' + variant.id;
  }

  addEventListeners() {
    document.addEventListener('DOMContentLoaded', () => this.onDocumentReady());
    EventBus.getInstance().addEventListener('productVariantChanged', e => this.onProductVariantChanged(e));
  }

}
//# sourceMappingURL=hash-select.min.js.map
