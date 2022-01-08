"use strict";

class InputUpDownBase extends Component {
  constructor(el) {
    super(el);
    this.input = this.$find('input');
    this.min = +this.$el.dataset.min;
    this.max = +this.$el.dataset.max;
    this.incrementEl = this.$find('[data-increment]');
    this.decrementEl = this.$find('[data-decrement]');
    this.changeEvent = new Event('change', {
      'bubbles': true
    });
    this.addEventListeners();
  }

  incrementValue() {
    this.input.value++;
    this.checkBoundaries();
    this.input.dispatchEvent(this.changeEvent);
  }

  decrementValue() {
    this.input.value--;
    this.checkBoundaries();
    this.input.dispatchEvent(this.changeEvent);
  }

  checkBoundaries() {
    if (this.input.value > this.max) {
      this.input.value = this.max;
    } else if (this.input.value < this.min) {
      this.input.value = this.min;
    }
  }

  checkKey(e) {
    if (e.which > 59 || e.which < 48) {
      e.preventDefault();
    }
  }

  addEventListeners() {
    this.incrementEl.addEventListener('click', () => this.incrementValue());
    this.decrementEl.addEventListener('click', () => this.decrementValue());
    this.input.addEventListener('input', () => this.checkBoundaries());
    this.input.addEventListener('keypress', e => this.checkKey(e));
  }

}
//# sourceMappingURL=input-up-down.min.js.map
