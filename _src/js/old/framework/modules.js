var _modulesAddedArray = [];

var _Module = function(moduleObject) { 
  this.moduleObject = moduleObject;
  _modulesAddedArray.push(this); 
}

// Inherite prototype methods from _Base
_Module.prototype = Object.create(_Base.prototype);

// Module Specific Properties and Methids
_Module.prototype.getModuleName = function() {
  return this.moduleObject.name;
}