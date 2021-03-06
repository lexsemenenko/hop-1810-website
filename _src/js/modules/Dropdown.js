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
      appendToggleClass = '.dropdown__toggle',
      // tplToggle = null,
      tplToggle = `
        <div class="hey">
          <span class="dropdown__toggle"></span>
        </div>`
    } = s;


    // Selections
    this.block = $(block);
    this.toggle = $(toggle);
    this.content = $(content);
    this.appendToggleClass = appendToggleClass;

    // Text
    this.toggleText = this.toggle.text();

    // Fire Functions
    this.menuEvents();
    this.replaceWithTemplates(tplToggle);
  }

  replaceWithTemplates(templateToggle) {
    const newStuff = $(templateToggle);
    newStuff.find(this.appendToggleClass).text("lex")
    if (templateToggle) {
      this.toggle.replaceWith(newStuff);
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