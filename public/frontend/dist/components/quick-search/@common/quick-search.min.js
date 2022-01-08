"use strict";

class QuickSearchBase extends Component {
  constructor(el) {
    super(el);
    this.form = this.$find('form');
    this.closer = this.$find('[data-close]');
    this.resultsEl = this.$find('[data-results]');
    this.input = this.$find('input');
    this.debounceInterval = undefined;
    this.itemTemplate = this.$find('[data-template-item]');
    this.headingTemplate = this.$find('[data-template-heading]');
    this.noResultsTemplate = this.$find('[data-template-no-results]');
    this.addEventListeners();
  }

  constructNoResults() {
    return this.noResultsTemplate.content.cloneNode(true);
  }

  constructItem(image, name, url, subText) {
    const item = this.itemTemplate.content.firstElementChild.cloneNode(true);
    item.setAttribute('href', url);
    if (!!image) item.querySelector('[data-image]').innerHTML = image;
    item.querySelector('[data-name]').innerHTML = name;
    if (!!subText) item.querySelector('[data-sub-text]').innerHTML = subText;
    return item;
  }

  constructHeading(text) {
    const heading = this.headingTemplate.content.cloneNode(true);
    heading.querySelector('[data-heading]').innerHTML = text;
    return heading;
  }

  appendResults(reuslts) {
    this.resultsEl.innerHTML = '';

    if (!reuslts.length) {
      this.resultsEl.appendChild(this.constructNoResults());
      return;
    }

    let prevModuleName = null;
    reuslts.reverse().forEach(result => {
      prevModuleName !== result.moduleName && this.resultsEl.appendChild(this.constructHeading(result.moduleName));
      this.resultsEl.appendChild(this.constructItem(result.image, result.title, result.url, result.subText));
      prevModuleName = result.moduleName;
    });
  }

  fetchSearch() {
    if (this.input.value.length < 2) {
      this.resultsEl.innerHTML = '';
      return;
    }

    fetch(this.form.getAttribute('action') + '?' + new URLSearchParams({
      q: this.input.value,
      ajax: 1
    })).then(response => response.json()).then(data => this.appendResults(data)).catch(error => {
      console.error('Error:', error);
    });
  }

  showModal() {
    this.input.focus();
    this.input.value = '';
    this.resultsEl.innerHTML = '';
    this.$el.classList.add('is-active');
    setTimeout(() => {
      this.input.focus();
    }, 500);
  }

  hideModal() {
    this.$el.classList.remove('is-active');
  }

  addEventListeners() {
    this.input.addEventListener('input', () => {
      this.debounceInterval && clearTimeout(this.debounceInterval);
      this.debounceInterval = setTimeout(() => this.fetchSearch(), 500);
    });
    this.$el.addEventListener('click', () => this.hideModal());
    this.closer.addEventListener('click', () => this.hideModal());
    this.form.addEventListener('click', e => e.stopPropagation());
    EventBus.getInstance().addEventListener('showQuickSearchModal', () => this.showModal());
  }

}
//# sourceMappingURL=quick-search.min.js.map
