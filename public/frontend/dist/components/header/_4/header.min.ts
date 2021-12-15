"use strict";

class AppHeader extends Component {
  constructor(el) {
    super(el);
    this.searchOpener = this.$find('[data-search-opener]');
    this.loginOpener = this.$find('[data-login-opener]');
    this.navOpener = this.$find('[data-nav-opener]');
    this.headerOffset = this.$el.offsetTop - window.scrollY;
    this.lastScroll = 0;
    this.addEventListeners();
  }

  openSearch() {
    EventBus.getInstance().dispatchEvent('showQuickSearchModal');
  }

  openLogin() {
    EventBus.getInstance().dispatchEvent('showBasePopup', 'login-popup');
  }

  hidingOnScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > this.headerOffset + this.$el.offsetHeight) {
      this.$el.classList.add('is-sticked');
      this.$el.classList[currentScroll > this.lastScroll ? 'add' : 'remove']('is-up');
    } else {
      this.$el.classList.remove('is-sticked');
      this.$el.classList.remove('is-up');
    }

    this.lastScroll = currentScroll;
  }

  addEventListeners() {
    this.searchOpener && this.searchOpener.addEventListener('click', () => this.openSearch());
    this.loginOpener && this.loginOpener.addEventListener('click', () => this.openLogin());
    this.navOpener.addEventListener('click', e => {
      e.stopPropagation();
      EventBus.getInstance().dispatchEvent('mainNavigationOpen');
    });
    window.addEventListener('scroll', () => this.hidingOnScroll(), {
      passive: true
    });
  }

}
//# sourceMappingURL=header.min.js.map
