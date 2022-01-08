"use strict";

class AppNavigationBase extends Component {
  constructor(el) {
    super(el);
    this.closer = this.$find('[data-closer]');
    this.subNavOpeners = this.$findAll('[data-opener]');
    this.addEventListeners();
  }

  openNav() {
    this.$el.classList.add('is-opened');
    document.body.classList.add('is-not-overflowed');
  }

  closeNav() {
    this.$el.classList.remove('is-opened');
    document.body.classList.remove('is-not-overflowed');
  }

  toggleSubNav(opener) {
    opener.classList.toggle('is-opened');
    opener.nextElementSibling.classList.toggle('is-opened');
  }

  addEventListeners() {
    this.closer.addEventListener('click', () => this.closeNav());
    this.subNavOpeners.forEach(opener => opener.addEventListener('click', () => this.toggleSubNav(opener)));
    EventBus.getInstance().addEventListener('mainNavigationOpen', () => this.openNav());
    document.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) {
        this.closeNav();
      }
    });
  }

}
//# sourceMappingURL=navigation.min.js.map
