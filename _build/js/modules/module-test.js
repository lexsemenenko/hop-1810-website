
var tabs = new _Module({
  name: "Tabs",
  event: ["on:ready", "on:resize"],
  init: function() {
    var module = this;
    // console.log(module.getModuleName() + " module ran");
  }
});

(new _Module({
  name: "Equalheight",
  event: ["on:resize"],
  init: function() {
    var module = this;
    // console.log(module.getModuleName() + " module ran");
  }
}));


(new _Module({
  name: "Body Color",
  event: ["on:resize"],
  init: function() {
    var module = this;
    // console.log(module.getModuleName() + " module ran");

    $("body").css("background-color", "#f1f1f1");
  }
}));