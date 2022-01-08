"use strict";

class ProductDetailUpsell extends Component {
  constructor(el) {
    super(el);
    this.opener = this.$find('[data-opener]');
    this.opener.addEventListener('click', () => this.toggleContent());
  }

  toggleContent() {
    this.$el.classList.toggle('is-active');
  }

}
//# sourceMappingURL=product-detail-upsell.min.js.map
