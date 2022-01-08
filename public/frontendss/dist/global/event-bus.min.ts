"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class EventBus {
  constructor() {
    if (!!EventBus.instance) {
      return EventBus.instance;
    }

    this.bus = document;
    EventBus.instance = this;
    return this;
  }

  addEventListener(event, callback) {
    this.bus.addEventListener(event, callback);
  }

  removeEventListener(event, callback) {
    this.bus.removeEventListener(event, callback);
  }

  dispatchEvent(event, detail = {}) {
    this.bus.dispatchEvent(new CustomEvent(event, {
      detail
    }));
  }

  static getInstance() {
    return this.instance;
  }

}

_defineProperty(EventBus, "instance", new EventBus());
//# sourceMappingURL=event-bus.min.js.map
