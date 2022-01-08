"use strict";

class ValueDisplay extends Component {
  constructor(el) {
    super(el);
    this.label = this.$find('[data-label]');
    this.img = this.$find('[data-picture]');
    this.color = this.$find('[data-color]');
    this.attribute = Number.parseInt(this.$el.dataset.attribute);
    this.addEventListeners();
  }

  findAttributeValue({
    attribute,
    value
  }) {
    if (Util.hasProperty(attributeData, attribute)) {
      const attributeObject = attributeData[attribute];
      return attributeObject[value];
    }

    return undefined;
  }

  resetView() {
    this.color.classList.add('u-hidden');
    this.color.style.background = '';
    this.img.classList.add('u-hidden');
    this.img.dataset.src = '';
    this.label.classList.add('u-hidden');
    this.label.innerText = '';
  }

  onAttributeSet(eventData) {
    if (eventData.attribute !== this.attribute) {
      return;
    }

    this.resetView();
    const data = this.findAttributeValue(eventData);

    if (data === undefined) {
      return;
    }

    if (data.label && data.label.length) {
      this.label.innerText = data.label;
      this.label.classList.remove('u-hidden');
    }

    if (data.img && data.img.length) {
      this.img.setAttribute('src', data.img);
      this.img.classList.remove('u-hidden');
    } else if (data.color && data.color.length) {
      this.color.style.background = '#' + data.color;
      this.color.classList.remove('u-hidden');
    }
  }

  onClick() {
    EventBus.getInstance().dispatchEvent('showBasePopup', 'attribute-select-' + this.attribute);
  }

  addEventListeners() {
    EventBus.getInstance().addEventListener('attributeChanged', e => this.onAttributeSet(e.detail));
    this.$el.addEventListener('click', () => this.onClick());
  }

}
//# sourceMappingURL=value-display.min.js.map
