"use strict";

class ProductDetailActionsBase extends Component {
  constructor(el) {
    super(el);
    this.variantInput = this.$find('[data-variant-input]');
    this.buttonBuy = this.$find('[data-button-buy]');
    this.buttonInquiry = this.$find('[data-button-inquiry]');
    this.buttonCannotBuy = this.$find('[data-button-cannot-buy]');
    this.amountInput = this.$find('[data-input-up-down-base]');
    this.form = this.$find('form');
    this.cartUrl = this.$el.dataset.urlCart;
    this.inquiryUrl = this.$el.dataset.urlInquiry;
    this.addEventListeners();
  }

  setVariant(variant) {
    this.variantInput.value = variant.id;
  }

  resetButtons() {
    this.buttonBuy.classList.add('u-hidden');
    this.buttonInquiry.classList.add('u-hidden');
    this.buttonCannotBuy.classList.add('u-hidden');
    this.amountInput && this.amountInput.classList.add('u-hidden');
  }

  updateForm(variant) {
    this.resetButtons();

    if (variant.salable) {
      this.buttonBuy.classList.remove('u-hidden');
      this.amountInput && this.amountInput.classList.remove('u-hidden');
      this.form.setAttribute('action', this.cartUrl);
      this.form.setAttribute('method', 'get');
      EventBus.getInstance().dispatchEvent('productDetailActionButtonChanged', {
        button: this.buttonBuy
      });
    } else if (variant.inquirable) {
      this.buttonInquiry.classList.remove('u-hidden');
      this.form.setAttribute('action', this.inquiryUrl);
      this.form.setAttribute('method', 'post');
      EventBus.getInstance().dispatchEvent('productDetailActionButtonChanged', {
        button: this.buttonInquiry
      });
    } else {
      this.buttonCannotBuy.classList.remove('u-hidden');
      this.form.setAttribute('action', '');
      this.form.setAttribute('method', '');
      EventBus.getInstance().dispatchEvent('productDetailActionButtonChanged', {
        button: this.buttonCannotBuy
      });
    }
  }

  onVariantChange(variant) {
    this.setVariant(variant);
    this.updateForm(variant);
  }

  addToCart() {
    const formData = new FormData(this.form);
    formData.append('ajax', '1');
    fetch(this.form.getAttribute('action'), {
      method: 'POST',
      body: formData
    }).then(response => response.json()).then(data => {
      if ('error' in data && data.error) {
        alert(data.error);
      } else {
        this.onCartAdded(data);
      }
    }).catch(error => {
      console.error('Error:', error);
    }).finally(() => {
      EventBus.getInstance().dispatchEvent('hideGlobalSpinner');
    });
  }

  onCartAdded(data) {
    EventBus.getInstance().dispatchEvent('cartUpdated', data);
  }

  showInquiry() {
    EventBus.getInstance().dispatchEvent('showInquiry', {
      url: this.inquiryUrl + '?' + new URLSearchParams(new FormData(this.form)).toString() + '&ajax=1'
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.doTheAction();
  }

  doTheAction() {
    const action = this.form.getAttribute('action');
    EventBus.getInstance().dispatchEvent('showGlobalSpinner');

    if (action === this.cartUrl) {
      this.addToCart();
    } else if (action === this.inquiryUrl) {
      this.showInquiry();
    }
  }

  addEventListeners() {
    EventBus.getInstance().addEventListener('productVariantChanged', e => this.onVariantChange(e.detail));
    this.form.addEventListener('submit', e => this.onFormSubmit(e));
    EventBus.getInstance().addEventListener('productDetailActionSubmit', e => this.doTheAction());
  }

}
//# sourceMappingURL=product-detail-actions.min.js.map
