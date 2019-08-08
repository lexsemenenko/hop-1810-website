import $ from 'jquery';
import './modules/Plyr';
import Dropdown from './modules/Dropdown';
import StickyHeader from './modules/StickyHeader';


const dropdown = new Dropdown();
const stickyHeader = new StickyHeader();

const mobileMenu = new Dropdown({
  block: ".menu-mobile",
  toggle: ".menu-mobile__toggle",
  content: ".menu-mobile__content"
});