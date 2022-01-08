"use strict";

class Component {
  constructor(el) {
    this.$el = el;
    this.$parentEl = this.$el.parentNode;

    this._$initGlobalSettings();
  }

  $find(query) {
    return this.$el.querySelector(query);
  }

  $findAll(query) {
    return this.$el.querySelectorAll(query);
  }

  _$setInitState() {
    this.$el.setAttribute('data-initialized', '');
  }

  _$initGlobalSettings() {
    this._$setInitState();
  }

  static _initComponentsLibraries() {
    if (typeof MatchHeight === 'function') {
      new MatchHeight(document.querySelectorAll('[data-match-height]'));
    }

    if (typeof lightGallery === 'function') {
      const lightGalleryItems = document.querySelectorAll('[data-lightgallery]');
      lightGalleryItems.forEach(item => {
        const closestGallery = item.closest('[data-gallery-group]');
        lightGallery(closestGallery ? closestGallery : item.parentNode, {
          selector: 'a',
          thumbnail: false,
          share: false,
          iframeMaxWidth: '80%'
        });
      });
    }
  }

  static initComponents() {
    document.querySelectorAll('[data-component]:not([data-initialized])').forEach(component => {
      const componentClass = Function('return ' + component.dataset.component);

      try {
        new (componentClass())(component);
      } catch (e) {
        console.error(e);
      }
    });

    Component._initComponentsLibraries();

    EventBus.getInstance().dispatchEvent("initialized");
  }

}
//# sourceMappingURL=component.min.js.map
