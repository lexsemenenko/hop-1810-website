import $ from 'jquery';

class Dropdown {
  constructor(instanceSettings) {
  
    const {block, toggle, content } = instanceSettings;

    this.block = block ? $(block) : $('.dropdown');
    this.blockToggle = toggle ? $(toggle) : $('.dropdown__toggle');
    this.blockContent = content ? $(content) : $('.dropdown__content');
    this.menuEvents();
  }
  menuEvents() {
    this.blockToggle.click(this.toggleMenu.bind(this));
  }
  toggleMenu () {
    this.block
      .add(this.blockToggle)
      .add(this.blockContent)
      .toggleClass("open");
  }
}

export default Dropdown;