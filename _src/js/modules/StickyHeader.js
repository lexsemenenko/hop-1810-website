import $ from 'jquery';
import ScrollMagic from 'scrollmagic';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

class StickyHeader {
  constructor() {
    // this.headerHeight = $('.site-header').outerHeight();
    this.createNewScrollMagic()
  }

  createNewScrollMagic() {
    this.controller = new ScrollMagic.Controller();
    this.scene =  new ScrollMagic.Scene({
      triggerElement: '.section--content',
      duration: 0,
      offset: -100
    })
    .setClassToggle('.site-header', 'active')
    .triggerHook(0)
    // .addIndicators()
    .addTo(this.controller);
  }
}

export default StickyHeader;