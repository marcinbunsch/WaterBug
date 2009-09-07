/*
 * WaterBug.Adapters.Prototype
 *
 */
 
WaterBug.Adapters.Prototype = {
  get: function(id) { return $(id); },
  create: function(tag_name, attr) { return new Element(tag_name, attr); },
  $$: function(selector) { return $$(selector); }
}