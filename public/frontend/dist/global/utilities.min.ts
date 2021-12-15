"use strict";

class Util {
  static elIndex(el) {
    return [...el.parentElement.children].indexOf(el);
  }

  static ucFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  static hasProperty(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

}
//# sourceMappingURL=utilities.min.js.map
