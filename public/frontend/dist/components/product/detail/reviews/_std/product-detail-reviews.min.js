"use strict";

class ProductDetailReviews extends Component {
  constructor(el) {
    super(el);
    this.loginBtn = this.$find('[data-login]');
    this.addEventListeners();
  }

  addEventListeners() {
    this.loginBtn && this.loginBtn.addEventListener('click', e => {
      e.preventDefault();
      EventBus.getInstance().dispatchEvent('showBasePopup', 'login-popup');
    });
  }

}
//# sourceMappingURL=product-detail-reviews.min.js.map
