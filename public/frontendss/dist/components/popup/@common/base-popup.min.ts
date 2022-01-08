"use strict";

class BasePopup extends Component {
  constructor(el) {
    super(el);
    this.id = this.$el.id;
    this.closer = this.$find('[data-pupup-base-close]');
    this.inputs = this.$findAll('input');
    this.timeout = +this.$el.dataset.timeout;
    this.cancelable = +this.$el.dataset.cancelable;
    this.canHide = true;
    this.init();
  }

  showPopup() {
    this.$el.classList.add('is-active');
  }

  hidePopup() {
    this.canHide && this.$el.classList.remove('is-active');
  }

  automaticShow() {
    setTimeout(() => this.showPopup(), this.timeout);
  }

  addListeners() {
    this.$el.addEventListener('click', () => this.cancelable && this.hidePopup());
    this.$el.firstElementChild.addEventListener('click', e => e.stopPropagation());
    this.closer && this.closer.addEventListener('click', () => this.hidePopup());
    this.inputs.forEach(input => input.addEventListener('focus', () => this.canHide = false));
    this.inputs.forEach(input => input.addEventListener('blur', () => this.canHide = true));
    document.addEventListener('keyup', e => e.key === "Escape" && this.hidePopup());
    EventBus.getInstance().addEventListener('showBasePopup', e => {
      if (this.id === e.detail) this.showPopup();
    });
    EventBus.getInstance().addEventListener('hideBasePopup', e => {
      if (this.id === e.detail) this.hidePopup();
    });
  }

  init() {
    this.addListeners();
    this.timeout && this.automaticShow();
  }

}
//# sourceMappingURL=base-popup.min.js.map
