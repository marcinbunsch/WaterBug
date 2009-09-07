/*
 * WaterBug.Adapters
 *
 */
 
WaterBug.Adapters = new Object()

// Convienience function
WaterBug.adapter = function() {
  if (typeof(Prototype) != 'undefined') return WaterBug.Adapters.Prototype
  if (typeof(jQuery) != 'undefined')  {
    // Add some stuff to match Prototype and ease life a biy
    if (!document.body.insert) { document.body.insert = function(content) { $(this).append(content) }; }
    return WaterBug.Adapters.jQuery
  }
}
