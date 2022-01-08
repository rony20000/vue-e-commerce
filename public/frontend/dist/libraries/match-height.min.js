"use strict";

class MatchHeight {
  constructor(items, byRow = true) {
    this.items = Array.from(items);
    this.byRow = byRow;
    this.recomputing = false;
    this.resizeDebounce = undefined;
    this.init();
  }

  getRows() {
    const rows = [];
    let row = [];
    this.items.forEach((item, index) => {
      const prevItem = this.items[index - 1];

      if (prevItem && item.getBoundingClientRect().top !== prevItem.getBoundingClientRect().top) {
        rows.push(row);
        row = [];
      }

      row.push(item);
    });
    rows.push(row);
    return rows;
  }

  calcFragmentHeight(row) {
    if (this.recomputing) {
      row.forEach(item => {
        item.style.minHeight = 0;
      });
    }

    const max = Math.max(...row.map(item => item.offsetHeight));
    row.forEach(item => {
      item.style.minHeight = max + 'px';
    });
  }

  calc() {
    if (this.byRow) {
      this.getRows().forEach(row => this.calcFragmentHeight(row));
    } else {
      this.calcFragmentHeight(this.items);
    }
  }

  init() {
    this.calc();
    window.addEventListener('resize', () => {
      this.recomputing = true;
      this.resizeDebounce && clearTimeout(this.resizeDebounce);
      this.resizeDebounce = setTimeout(() => this.calc(), 80);
    });
  }

}
//# sourceMappingURL=match-height.min.js.map
