"use strict";

class HeaderUser extends Component {
  constructor(el) {
    super(el);
    this.loginOpener = this.$find('[data-login-opener]');
    this.navOpener = this.$find('[data-usernav-opener]');
    this.dropdown = this.$find('[data-dropdown]');
    this.addEventListeners();
  }

  openLogin() {
    EventBus.getInstance().dispatchEvent('showBasePopup', 'login-popup');
  }

  toggleDropdown() {
    this.dropdown.classList.toggle('is-opened');
    this.opener.classList.toggle('is-active');
  }

  hideDropdown() {
    this.dropdown.classList.remove('is-opened');
    this.opener.classList.remove('is-active');
  }

  addEventListeners() {
    this.loginOpener && this.loginOpener.addEventListener('click', () => this.openLogin());

    if (this.dropdown) {
      this.navOpener && this.navOpener.addEventListener('click', () => this.toggleDropdown());
      document.addEventListener('click', e => {
        if (!this.$el.contains(e.target)) {
          this.hideDropdown();
        }
      });
    }
  }

}
//# sourceMappingURL=header-user.min.js.map
