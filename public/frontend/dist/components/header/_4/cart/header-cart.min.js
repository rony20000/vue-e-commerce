"use strict";

class HeaderCart extends Component {
  constructor(el) {
    super(el);
    this.dropdown = this.$find('[data-dropdown]');
    this.opener = this.$find('[data-cart-opener]');
    this.priceHolder = this.$find('[data-price-holder]');
    this.countHolder = this.$find('[data-count-holder]');
    this.addEventListeners();
  }

  toggleDropdown() {
    this.dropdown.classList.toggle('is-opened');
  }

  updateCart({
    cartTotalPrice,
    cartTotalCount
  }) {
    this.priceHolder.innerHTML = cartTotalPrice;
    this.countHolder.innerText = cartTotalCount;
  }

  addEventListeners() {
    this.dropdown && this.opener.addEventListener('click', () => this.toggleDropdown());
    EventBus.getInstance().addEventListener('cartUpdated', e => this.updateCart(e.detail));
    document.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) {
        this.dropdown.classList.remove('is-opened');
      }
    });
  }

}
//# sourceMappingURL=header-cart.min.js.map
