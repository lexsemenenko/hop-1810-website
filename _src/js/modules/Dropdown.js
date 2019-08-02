import $ from 'jquery';

class DropDown {
  constructor(settings) {
    const { block, toggle, content } = settings;
    this.block = block ? $(block) : $('.dropdown');
    this.menuToggle = $('.menu-mobile__toggle');
    this.menuContent = $('.menu-mobile__content');
    this.menuEvents(); // Call our events
    console.log(this.block)
  }
  menuEvents() {
    this.menuToggle.click(this.toggleMenu.bind(this));
  }
  toggleMenu () {
    this.block.toggleClass("open");
    this.menuToggle.toggleClass("open");
    this.menuContent.toggleClass("open");
  }
}

export default DropDown;