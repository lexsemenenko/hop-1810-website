import Dropdown from './modules/Dropdown';
import './modules/Plyr'; 

const dropdown = new Dropdown();

const mobileMenu = new Dropdown({
  block: ".menu-mobile",
  toggle: ".menu-mobile__toggle",
  content: ".menu-mobile__content"
});
 