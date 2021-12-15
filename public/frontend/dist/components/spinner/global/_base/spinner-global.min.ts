"use strict";

class SpinnerGlobal extends Component {
  constructor(el) {
    super(el);
    this.addEventListeners();
  }

  showSpinner() {
    this.$el.classList.add('is-active');
  }

  hideSpinner() {
    this.$el.classList.remove('is-active');
  }

  addEventListeners() {
    EventBus.getInstance().addEventListener('showGlobalSpinner', () => this.showSpinner());
    EventBus.getInstance().addEventListener('hideGlobalSpinner', () => this.hideSpinner());
  }

}
//# sourceMappingURL=spinner-global.min.js.map
