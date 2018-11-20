//  Core: Events
// =============================================================================  

// on:Ready
// =====================================  

$( document ).ready(function(){
  $.event.trigger("on:Ready");
});

// on:Resize
// =====================================  

$( window ).on('resize', function(){
  $.event.trigger("on:Resize");
});

// on:ResizeEnd
// =====================================  

(function () {
  var rtime,
      timeout = false,
      delta = 200;

  $(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeEnd, delta);
    }
  });

  function resizeEnd() {
    if (new Date() - rtime < delta) {
      setTimeout(resizeEnd, delta);
    } else {
      timeout = false;
      $.event.trigger("on:ResizeEnd");
    }               
  }
})();
