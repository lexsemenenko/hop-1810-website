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
      tmplToggle = null,
      // tmplToggle = `
      //   <div class="">
      //     <span>haha</span>
      //   </div>`
    } = s;


    // Selections
    this.block = $(block);
    this.toggle = $(toggle);
    this.content = $(content);

    // Text
    this.toggleText = this.toggle.text();

    // Fire Functions
    this.menuEvents();
    this.replaceWithTemplates(tmplToggle);
  }

  replaceWithTemplates(tmplToggle) {
    if (tmplToggle) {
      this.toggle.replaceWith($(tmplToggle));
    }
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