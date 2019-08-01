var lexkit = function () {

  // Framework Variables
  var _g,
    _system = {};

  // @include libs/_includes.js
  // @include framework/_includes.js

  // Assignments
  _g = new _Base();
  _g.system = _system;

  // Import Modules
  // @include modules/module-test.js

  // Site Specific
  // @include site-specific/module-calls.js
  // @include site-specific/site-specific.js

  function runModules() {
    _modulesAddedArray.forEach(function (item) {
      // Run init function of a module, and pasd itself (module instance) to the 
      // init function, so we can have module prototypes inside the function
      item.moduleObject.init.call(item);
    });
  }

  // [CHECK] Run Modules on Temporary here, should be in bundles
  $(document).on("on:Ready", runModules);
  $(document).on("on:ResizeEnd", runModules);
  $(document).on("on:Resize", runModules);
}


$(document).ready(function () {
  lexkit();
  console.log('test');
});