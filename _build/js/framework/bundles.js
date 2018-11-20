// =============================================================================
// CORE: Bundles
// =============================================================================  

var bundleEventsArr = ["on:Ready", "on:ResizeEnd"],
    runBundles,
    bundlesArr = [
      {
        bundleName: ["onReady"],
        init: function() {
          // console.log("Bundle Fired: ", this);
        }
      },
      {
        bundleName: ["onResizeEnd", "onReady"],
        init: function() {
          // console.log("Bundle Fired: ", this);
        }
      }
    ];


runBundles = function() {
  bundlesArr.forEach(function(eachBundle) {
    // console.log("BUNDLE NAMES", eachBundle.bundleName);

    // Nested EVENTS foreach should be here
      // Fire based on Bundle name not events
      // Map bundle names to events
    eachBundle.init.call(eachBundle);
  });
}

// EVENTS. Loop though events, and fire specific bundles
bundleEventsArr.forEach(function(event) {
  $(document).on(event, runBundles);
});


