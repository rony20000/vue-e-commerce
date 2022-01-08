"use strict";

class TabsIconModern extends Component {
  constructor(el) {
    super(el);
    this.switchesHolder = this.$find('[data-icon-tabs-switchers]');
    this.switches = this.switchesHolder.querySelectorAll('[data-icon-tabs-switch]');
    this.tabs = this.$findAll('[data-icon-tabs-tab]');

    this._init();
  }

  resetTabs() {
    this.switches.forEach(switchEl => switchEl.classList.remove('is-active'));
    this.tabs.forEach(tab => tab.classList.remove('is-active'));
  }

  activeTab(hash, scrollIntoView = false) {
    const activeTab = [...this.tabs].find(item => item.id === hash.substr(1));
    if (!activeTab) return;
    this.resetTabs();
    activeTab.classList.add('is-active');
    const activeSwitch = [...this.switches].find(item => item.hash === hash);
    activeSwitch && activeSwitch.classList.add('is-active');
    scrollIntoView && activeTab.scrollIntoView({
      behavior: 'smooth'
    });
  }

  onSwitchClicked(e, switchEl) {
    e.preventDefault();
    history.pushState({}, '', switchEl.hash);
    this.activeTab(switchEl.hash);
  }

  willSwitchesFit() {
    let sumWidht = 0;
    this.switches.forEach(switchEl => {
      sumWidht += switchEl.offsetWidth + parseInt(getComputedStyle(switchEl).getPropertyValue('margin-right'));
    });
    return sumWidht < this.switchesHolder.clientWidth;
  }

  resetSwitchers() {
    this.switches.forEach(switchEl => {
      switchEl.classList.remove('is-responsive');
      this.switchesHolder.appendChild(switchEl);
    });
  }

  moveSwitchers() {
    this.resetSwitchers();

    if (!this.willSwitchesFit()) {
      this.switches.forEach(switchEl => {
        const currentTab = Array.from(this.tabs).find(item => item.id === switchEl.hash.substr(1));
        switchEl.classList.add('is-responsive');
        currentTab.insertAdjacentElement('beforebegin', switchEl);
      });
    }
  }

  _init() {
    location.hash && this.activeTab(location.hash);
    this.addEventListeners();
  }

  addEventListeners() {
    this.switches.forEach(switchEl => switchEl.addEventListener('click', e => this.onSwitchClicked(e, switchEl)));
    window.addEventListener('hashchange', () => {
      this.activeTab(location.hash, true);
    }, false);
  }

}
//# sourceMappingURL=tabs.min.js.map
