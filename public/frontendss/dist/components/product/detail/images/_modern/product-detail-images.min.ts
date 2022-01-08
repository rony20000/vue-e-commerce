"use strict";

const tagsNames = ['tagRecommended', 'discounted', 'tagNew', 'tagSale', 'tagUsed', 'tagAction', 'tagFreeStorePickup', 'tagFreeDelivery'];

class ProductDetailImages extends Component {
  constructor(el) {
    super(el);
    this.mainSwiperEl = this.$find('[data-swiper-main]');
    this.thumbsSwiperEl = this.$find('[data-swiper-thumb]');
    this.mainSwiper = null;
    this.thumbsSwiper = null;
    this.mainSwiperConfig = {
      slidesPerView: 1,
      navigation: {
        nextEl: '.ProductDetailImages-next',
        prevEl: '.ProductDetailImages-prev'
      },
      lazy: {
        loadPrevNext: true,
        elementClass: 'lazy'
      },
      watchOverflow: true
    };
    this.tags = {};
    tagsNames.forEach(name => {
      this.tags[name] = this.$find('.is-' + name);
    });
    this.init();
  }

  constructMainSwiper() {
    this.mainSwiper = new Swiper(this.mainSwiperEl, this.mainSwiperConfig);
  }

  constructThumbSwiper() {
    this.thumbsSwiper = new Swiper(this.thumbsSwiperEl, {
      spaceBetween: 10,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      breakpoints: {
        500: {
          slidesPerView: 4
        }
      }
    });
    this.mainSwiperConfig.thumbs = {
      swiper: this.thumbsSwiper
    };
  }

  goToVariantImage({
    id
  }) {
    const slideIndex = Array.from(this.mainSwiper.slides).findIndex(slide => +slide.dataset.variant === +id);
    this.mainSwiper.slideTo(slideIndex === -1 ? 0 : slideIndex);
  }

  updateTags(variant) {
    tagsNames.forEach(name => {
      this.tags[name] && this.tags[name].classList.add('u-hidden');
    });
    variant.tags.forEach(tag => {
      this.tags[tag] && this.tags[tag].classList.remove('u-hidden');
    });
  }

  onVariantChanged(variant) {
    this.updateTags(variant);
    this.goToVariantImage(variant);
  }

  init() {
    this.thumbsSwiperEl && this.constructThumbSwiper();
    this.mainSwiperEl && this.constructMainSwiper();
    EventBus.getInstance().addEventListener('productVariantChanged', e => this.onVariantChanged(e.detail));
  }

}
//# sourceMappingURL=product-detail-images.min.js.map
