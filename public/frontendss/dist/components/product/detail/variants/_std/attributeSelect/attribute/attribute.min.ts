"use strict";

class Attribute extends Component {
  constructor(el) {
    super(el);
    this.values = [];
    this.priceTemplate = this.$el.dataset.template;
    this.decimal = this.$el.dataset.decimal;
    this.unavailable = this.$el.dataset.unavailable;
    this.$findAll('[data-value]').forEach(e => {
      this.values.push({
        el: e,
        priceEl: e.querySelector('[data-price]')
      });
    });
    this.closer = this.$el.querySelector('[data-popup-close]');
    this.id = this.$el.id;
    this.addEventListeners();
  }

  selectValue(value) {
    const data = {
      attribute: Number.parseInt(this.$el.dataset.attribute),
      value: Number.parseInt(value)
    };
    EventBus.getInstance().dispatchEvent('attributeChanged', data);
  }

  onAttributeChanged({
    attribute,
    value
  }) {
    if (attribute.toString() === this.$el.dataset.attribute.toString()) {
      this.values.forEach(({
        el: e
      }) => {
        e.classList.toggle('is-selected', e.dataset.value === value.toString());
      });
      this.closePopup();
    }
  }

  openPopup() {
    this.$el.classList.toggle('is-active', true);
  }

  closePopup() {
    this.$el.classList.toggle('is-active', false);
  }

  onAttributePricePredictionChanged(predictor) {
    this.values.forEach(e => {
      let text = '&nbsp;';
      const priceChange = predictor(Number.parseInt(this.$el.dataset.attribute), Number.parseInt(e.el.dataset.value));

      if (priceChange && priceChange.price !== undefined && !priceChange.same) {
        const parts = Math.abs(priceChange.price).toFixed(this.decimal).toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        const textToReplace = (priceChange.price >= 0 ? '+' : '-') + '&nbsp;' + parts.join(",");
        text = this.priceTemplate.replace('{$price}', textToReplace);
      } else if (!priceChange.same) {
        text = this.unavailable;
      }

      e.priceEl.innerHTML = text;
    });
  }

  addEventListeners() {
    this.values.forEach(({
      el: option
    }) => option.querySelector('[data-choose]').addEventListener('click', () => this.selectValue(option.dataset.value)));
    EventBus.getInstance().addEventListener('attributePricePredictionChanged', e => this.onAttributePricePredictionChanged(e.detail.predictor));
    EventBus.getInstance().addEventListener('attributeChanged', e => this.onAttributeChanged(e.detail));
    this.closer && this.closer.addEventListener('click', () => this.closePopup());
    document.addEventListener('keyup', e => e.key === "Escape" && this.closePopup());
    EventBus.getInstance().addEventListener('hideBasePopup', e => {
      if (this.id === e.detail) {
        this.closePopup();
      }
    });
    EventBus.getInstance().addEventListener('showBasePopup', e => {
      if (this.id === e.detail) {
        this.openPopup();
      }
    });
  }

}
//# sourceMappingURL=attribute.min.js.map
