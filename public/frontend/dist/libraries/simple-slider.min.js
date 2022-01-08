"use strict";

class SimpleSlider {
  constructor(...args) {
    if (typeof arguments[0] === 'object' && !(arguments[0] instanceof Element)) {
      this.config = SimpleSlider.mergeConfig(arguments[0]);
    } else {
      this.config = SimpleSlider.mergeConfig(arguments[1] ?? {});
      this.config.selector = arguments[0];
    }

    this.slider = typeof this.config.selector === 'string' ? document.querySelector(this.config.selector) : this.config.selector;
    this.sliderScroller = this.slider && this.slider.querySelector('.SimpleSlider-inner');
    if (this.slider === null || this.sliderScroller === null) throw new Error('Něco je špatně se selectorem 😭');
    this.resolveSlidesNumber();
    this.sliderWidth = this.sliderScroller.offsetWidth;
    this.innerElements = Array.from(this.sliderScroller.children);
    this.currentSlide = Math.max(0, Math.min(this.config.startIndex, this.innerElements.length - this.perPage));
    this.navigation = [];
    ['resizeHandler', 'scrollHandler'].forEach(method => {
      this[method] = this[method].bind(this);
    });
    this.init();
    return this;
  }

  static mergeConfig(options) {
    const settings = {
      selector: '[data-simple-slider]',
      startIndex: 0,
      easing: true,
      pagination: true,
      navigation: true,
      vertical: false,
      onInit: () => {},
      onChange: () => {}
    };
    return { ...options,
      ...settings
    };
  }

  resolveSlidesNumber() {
    if (this.config.perPage) {
      this.perPage = this.config.perPage;
    } else {
      const perPageCss = getComputedStyle(this.slider).getPropertyValue('--slidesPerPage');
      this.perPage = perPageCss !== '' ? parseInt(perPageCss) : 1;
    }
  }

  slide(slideBy = 1, callback) {
    if (this.innerElements.length <= this.perPage) {
      return;
    }

    const beforeChange = this.currentSlide;

    if (slideBy < 0) {
      this.currentSlide = Math.max(this.currentSlide + slideBy, 0);
    } else {
      this.currentSlide = Math.min(this.currentSlide + slideBy, this.innerElements.length - this.perPage);
    }

    if (beforeChange !== this.currentSlide) {
      this.slideToCurrent();
      this.config.onChange.call(this);
      callback && callback.call(this);
    }
  }

  slidePrev(slideBy = 1, callback) {
    this.slide(slideBy * -1, callback);
  }

  slideNext(slideBy = 1, callback) {
    this.slide(slideBy, callback);
  }

  goTo(index, callback) {
    if (this.innerElements.length <= this.perPage) {
      return;
    }

    const beforeChange = this.currentSlide;
    this.currentSlide = Math.min(Math.max(index, 0), this.innerElements.length - this.perPage);

    if (beforeChange !== this.currentSlide) {
      this.slideToCurrent();
      this.config.onChange.call(this);
      callback && callback.call(this);
    }
  }

  slideToCurrent() {
    const offset = this.currentSlide * (this.sliderWidth / this.perPage);
    this.sliderScroller.scroll({
      top: 0,
      left: offset,
      behavior: 'smooth'
    });
  }

  attachEvents() {
    window.addEventListener('resize', this.resizeHandler);
    this.sliderScroller.addEventListener('scroll', this.scrollHandler);
  }

  detachEvents() {
    window.removeEventListener('resize', this.resizeHandler);
    this.sliderScroller.removeEventListener('scroll', this.scrollHandler);
  }

  resizeHandler() {
    this.resolveSlidesNumber();

    if (this.currentSlide + this.perPage > this.innerElements.length) {
      this.currentSlide = this.innerElements.length <= this.perPage ? 0 : this.innerElements.length - this.perPage;
    }

    this.sliderWidth = this.sliderScroller.offsetWidth;
    this.renderPaginationBullets();
  }

  scrollHandler() {
    this.navigationStateHandler();
    this.paginationStateHandler();
  }

  navigationStateHandler() {
    if (this.navigation.length) {
      this.navigation.find(el => el.dataset.direction === 'prev').toggleAttribute('disabled', this.sliderScroller.scrollLeft <= 0);
      this.navigation.find(el => el.dataset.direction === 'next').toggleAttribute('disabled', this.sliderScroller.scrollLeft + this.sliderScroller.clientWidth >= this.sliderScroller.scrollWidth || this.innerElements.length <= this.perPage);
    }
  }

  init() {
    this.attachEvents();
    this.preparePagination(this.config.navigation);
    this.slider.classList.add('SimpleSlider--initialize');
    this.config.onInit.call(this);
  }

  destroy(callback) {
    this.detachEvents();
    this.slider.removeChild(this.pagination);
    callback && callback.call(this);
  }

  preparePagination(withNavigation) {
    if (!this.config.pagination) {
      return;
    }

    const paginationEl = document.createElement('slider-pagination');
    paginationEl.insertAdjacentElement('beforeend', document.createElement('nav'));
    withNavigation && ['prev', 'next'].forEach(direction => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.direction = direction;
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" vector-effect="non-scaling-stroke"></path></svg>';
      btn.addEventListener('click', () => {
        direction === 'prev' ? this.slidePrev() : this.slideNext();
      });
      this.navigation.push(btn);
      paginationEl.insertAdjacentElement(direction === 'prev' ? 'afterbegin' : 'beforeend', btn);
    });
    this.navigationStateHandler();
    this.pagination = paginationEl;
    this.renderPaginationBullets();
    this.slider.insertAdjacentElement('beforeend', this.pagination);
  }

  renderPaginationBullets() {
    const bulletHolder = this.pagination && this.pagination.querySelector('nav');

    if (!bulletHolder) {
      return;
    }

    this.paginationBullets = [];
    bulletHolder.innerHTML = '';
    this.innerElements.forEach((slide, index) => {
      if (index % this.perPage === 0) {
        const bullet = document.createElement('slider-bullet');
        bullet.addEventListener('click', () => this.goTo(index));
        this.paginationBullets.push(bullet);
        bulletHolder.appendChild(bullet);
      }
    });
    this.paginationStateHandler();
  }

  paginationStateHandler() {
    const activeIndex = this.sliderScroller.scrollLeft / (this.perPage * this.innerElements[0].clientWidth);
    this.paginationBullets.forEach(bullet => bullet.classList.remove('is-active'));
    this.paginationBullets[this.currentSlide].classList.add('is-active');
  }

}
//# sourceMappingURL=simple-slider.min.js.map
