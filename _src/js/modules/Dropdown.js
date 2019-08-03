import $ from 'jquery';

class Dropdown {
  constructor(instanceSettings) {

    // Note: If undefined, make an object, so descruturing doesn't fail.
    const s = instanceSettings || {};

    // Desructure with defaults
    const {
      block = '.dropdown',
      toggle = '.dropdown__toggle',
      content = '.dropdown__content',
    } = s;

    this.block = $(block);
    this.toggle = $(toggle);
    this.content = $(content);

    this.menuEvents();
  }
  
  menuEvents() {
    this.toggle.click(this.toggleMenu.bind(this));
  }

  toggleMenu () {
    this.block
      .add(this.toggle)
      .add(this.content)
      .toggleClass("open");
  }
}

export default Dropdown;