"use strict";

class ProductStrip extends Component {
  constructor(el) {
    super(el);
    this.sliderEl = this.$find('[data-product-slider]');
    this.items = this.$findAll('[data-cy="product-item"]');
  }

  constructSlider() {
    const perPageCount = getComputedStyle(this.sliderEl).getPropertyValue('--slidesPerPage');

    if (parseInt(perPageCount) < this.items.length) {
      this.slider = new SimpleSlider(this.sliderEl);
    } else {
      this.slider && this.slider.destroy();
    }
  }

  attachEvents() {
    window.addEventListener('resize', () => this.constructSlider());
  }

}
//# sourceMappingURL=product-strip.min.js.map
