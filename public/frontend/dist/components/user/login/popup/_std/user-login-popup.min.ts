"use strict";

class UserLoginPopup extends Component {
  constructor(el) {
    super(el);
    this.form = this.$find('form');
    this.alert = this.$find('[data-login-alert]');
    this.addEventListener();
  }

  formSubmitted(data) {
    if (data.result === false) {
      if (data.form) {
        const formHtml = document.createElement('temporary');
        formHtml.innerHTML = data.form;
        this.form.innerHTML = formHtml.querySelector('form').innerHTML;
      }

      if (data.alert) {
        this.alert.querySelector('[data-text]').innerHTML = data.alert;
        this.alert.classList.remove('u-hidden');
      } else {
        this.alert.classList.add('u-hidden');
      }
    } else {
      if (typeof data.redirectToUrl === 'string') {
        location = data.redirectToUrl;
      } else {
        location.reload();
      }
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this.form);
    formData.append('ajax', '1');
    fetch(this.form.getAttribute('action'), {
      method: 'POST',
      body: formData
    }).then(response => response.json()).then(data => this.formSubmitted(data)).catch(error => {
      console.error('Error:', error);
    });
  }

  addEventListener() {
    this.form.addEventListener('submit', e => this.onFormSubmit(e));
  }

}
//# sourceMappingURL=user-login-popup.min.js.map
