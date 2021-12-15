"use strict";

class ProductDetailSpecs extends Component {
  constructor(el) {
    super(el);
    this.codeHolderElement = this.$find('[data-code-holder]');
    this.codeElements = this.$findAll('.code');
    this.guaranteeHolderElement = this.$find('[data-guarantee-holder]');
    this.guaranteeElements = this.$findAll('.guarantee');
    EventBus.getInstance().addEventListener('productVariantChanged', e => this.onVariantChange(e.detail));
  }

  onVariantChange(variant) {
    this.updateCode(variant);
    this.updateGuarantee(variant);
  }

  updateCode(variant) {
    if (variant.code) {
      this.codeHolderElement.innerText = variant.code;
      this.codeElements.forEach(el => {
        el.classList.remove('u-hidden');
      });
    } else {
      this.codeHolderElement.innerText = '';
      this.codeElements.forEach(el => {
        el.classList.add('u-hidden');
      });
    }
  }

  updateGuarantee(variant) {
    if (variant.guarantee) {
      this.guaranteeHolderElement.innerText = variant.guarantee;
      this.guaranteeElements.forEach(el => {
        el.classList.remove('u-hidden');
      });
    } else {
      this.guaranteeHolderElement.innerText = '';
      this.guaranteeElements.forEach(el => {
        el.classList.add('u-hidden');
      });
    }
  }

}
//# sourceMappingURL=product-detail-specs.min.js.map
