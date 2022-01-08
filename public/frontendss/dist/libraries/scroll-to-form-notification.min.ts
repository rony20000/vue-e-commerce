"use strict";

class ScrollToFormNotification {
  constructor(formSelector) {
    this.formNotification = document.querySelector(formSelector + ' [data-notification]');
    this.formInvalidItem = document.querySelector(formSelector + ' .is-invalid');
    this.scrollToElement();
  }

  getItem() {
    if (this.formNotification) {
      return this.formNotification;
    }

    if (this.formInvalidItem) {
      return this.formInvalidItem;
    }

    return null;
  }

  scrollToElement() {
    const el = this.getItem();
    el && el.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }

}
//# sourceMappingURL=scroll-to-form-notification.min.js.map
