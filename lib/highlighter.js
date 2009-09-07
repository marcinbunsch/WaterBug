/*
 * WaterBug.Highligher
 *
 */

WaterBug.Highlighter = new Object()

// Storage for currently highlighted element
WaterBug.Highlighter.current = null

WaterBug.Highlighter.highlight = function(element) {
  if ((!WaterBug.skip_highlighting) || (new Date - WaterBug.skip_highlighting > 100)) {
    if ((element) && (element.style) && (!(element.wb_highlighted))) {
      if (WaterBug.Highlighter.current) WaterBug.Highlighter.unhighlight(WaterBug.Highlighter.current)
      element.wb_highlighted = 1;
      WaterBug.skip_highlighting = new Date;
      element.original_border = element.style.border;
      element.style.border = "1px dotted #F00";
      WaterBug.Highlighter.current = element
    }
  }
}

WaterBug.Highlighter.unhighlight = function(element) {
  if ((element) && (element.style) && (element.wb_highlighted)) {
    element.wb_highlighted = 0;
    WaterBug.skip_highlighting = null;
    element.style.border = element.original_border;
    element.original_border = null;
    WaterBug.Highlighter.unhighlight
  }
}

// Legacy functions
WaterBug.unhighlight = WaterBug.Highlighter.unhighlight
WaterBug.highlight = WaterBug.Highlighter.highlight