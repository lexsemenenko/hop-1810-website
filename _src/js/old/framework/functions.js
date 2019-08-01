// =============================================================================
// Functions
// =============================================================================

var _baseProto = _Base.prototype;


_baseProto.uniqueId = function() {
  function generateId() {
    var id = _g.system.id.prefix + _g.system.id.count;
    ++_g.system.id.count;
    if ($("#" + id).length) generateId(); // Double check it doesn't exsit in the document
    // console.log('Unique ID', id);
    return id;
  }
  // console.trace();
  return generateId();
};