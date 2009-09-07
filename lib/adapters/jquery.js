/*
 * WaterBug.jQuery.Prototype
 *
 */

WaterBug.Adapters.jQuery = {
  $: function(selector) { return jQuery(selector) },
  $$: function(selector) { return jQuery(selector) },
  get: function(id) { return document.getElementById(id) },
  create: function(tag_name, attr) { 
    var element = document.createElement(tag_name);
    $.each(attr, function(key, value) {
      $(element).attr(key, value)
    });
    element.insert = function(content) { $(this).append(content) }
    element.remove = function(content) { $(this).remove() }
    return element
  }
}
