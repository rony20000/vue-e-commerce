"use strict";

class InquiryModal extends Component {
  constructor(el) {
    super(el);
    this.contetnWrap = this.$find('[data-content]');
    this.closers = this.$findAll('[data-close]');
    this.iframeHolder = this.$find('[data-ajax-content]');
    this.addEventListeners();
  }

  showInquiryModal() {
    this.$el.classList.add('is-active');
  }

  hideInquiryModal(e) {
    e.preventDefault();
    this.$el.classList.remove('is-active');
  }

  processForm(form, url) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      this.fetchAndDisplay(url, new FormData(form));
    });
  }

  appendData(pageHTML, url) {
    const htmlData = new DOMParser().parseFromString(pageHTML, 'text/html');
    const dataElement = htmlData.querySelector('[data-form-ajax-content]') || htmlData.querySelector('[data-notification]');
    const form = dataElement.querySelector('form');
    form && this.processForm(dataElement.querySelector('form'), url);
    this.iframeHolder.innerHTML = '';
    this.iframeHolder.appendChild(dataElement);
    this.showInquiryModal();
  }

  fetchAndDisplay(url, formData = null) {
    EventBus.getInstance().dispatchEvent('showGlobalSpinner');
    fetch(url, {
      method: 'POST',
      body: formData
    }).then(res => res.text()).then(data => this.appendData(data, url)).finally(() => EventBus.getInstance().dispatchEvent('hideGlobalSpinner'));
  }

  addEventListeners() {
    this.$el.addEventListener('click', e => this.hideInquiryModal(e));
    this.closers.forEach(closer => closer.addEventListener('click', e => this.hideInquiryModal(e)));
    this.contetnWrap.addEventListener('click', e => e.stopPropagation());
    EventBus.getInstance().addEventListener('showInquiry', e => this.fetchAndDisplay(e.detail.url));
  }

}
//# sourceMappingURL=inquiry-modal.min.js.map
