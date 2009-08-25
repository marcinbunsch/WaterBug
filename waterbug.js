WaterBug = new Object();
WaterBug.Adapters = new Object()
// Prototype adapter
WaterBug.Adapters.Prototype = {
  get: function(id) { return $(id) },
  create: function(tag_name, attr) { return new Element(tag_name, attr) }
}
// jQuery adapter
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
WaterBug.adapter = function() {
  if (typeof(Prototype) != 'undefined') return WaterBug.Adapters.Prototype
  if (typeof(jQuery) != 'undefined')  {
    // Add some stuff to match Prototype and ease life a biy
    if (!document.body.insert) { document.body.insert = function(content) { $(this).append(content) }; }
    return WaterBug.Adapters.jQuery
  }
}
WaterBug.load = function() {
  WaterBug.inspect_mode = 0;
  // TODO: find a fix for position: fixed in IE 6
  WaterBug.display_wrapper = WaterBug.adapter().create('div', {id: 'water_bug_display_wrapper', style:"position: fixed; bottom: 0px; left: 0px; width: 100%; height: 330px; background-color: #000; padding: 0px; z-index: 1000;"});
  WaterBug.header = WaterBug.adapter().create('div', {id: 'water_bug_display_header', style:"background-color: #333; height: 20px;"});
  WaterBug.display1 = WaterBug.adapter().create('div', {style:"width: 550px; margin: 10px; background-color: #FFF; overflow: scroll; height: 260px; padding: 10px; overflow: hidden; float: left;"});
  WaterBug.display2 = WaterBug.adapter().create('div', {style:"width: 550px; margin: 10px; background-color: #FFF; overflow: scroll; height: 260px; padding: 10px; overflow: hidden; float: left;"});
  WaterBug.display3 = WaterBug.adapter().create('div', {style:"display: none; clear: both;"});
  WaterBug.close_link = WaterBug.adapter().create('a', {style:"width: 40px; height: 20px; color: #FFF; position: absolute; top: 1px; right: 15px; font-size: 12px; cursor: pointer;"});
  WaterBug.hide_link = WaterBug.adapter().create('a', {style:"width: 40px; height: 20px; color: #FFF; position: absolute; top: 1px; right: 15px; font-size: 12px; cursor: pointer;"});
  WaterBug.label = WaterBug.adapter().create('a', {style:"width: 100px; height: 20px; color: #FFF; position: absolute; top: 1px; left: 15px; font-size: 12px;", href: 'http://applicake.com/'});
  WaterBug.close_link.innerHTML='X close';
  WaterBug.hide_link.innerHTML='_ hide';
  WaterBug.label.innerHTML='WaterBug';
  WaterBug.close_link.onclick = function(){WaterBug.unload();};
  WaterBug.hide_link.onclick = function(){WaterBug.toggle_visibility();};
  WaterBug.display_wrapper.insert(WaterBug.header, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.display1, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.display2, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.display3, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.hide_link, {position:'bottom'});
 // WaterBug.display_wrapper.insert(WaterBug.close_link, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.label, {position:'bottom'});
  document.body.insert(WaterBug.display_wrapper, {position:'bottom'});
  WaterBug.display1.innerHTML = '<textarea id="water_bug_command_history" style="width: 400px; height: 200px;"></textarea><input type="text" id="water_bug_command_line" style="width: 300px;" /><input type="submit" id="water_bug_command_button" />';
  WaterBug.display2.innerHTML = '<a href="#" id="water_bug_inspect_button">INSPECT</a><br /><p id="wb_object_name" style="font-size:10px;"></p><br /><input type="text" id="water_bug_property_name" /><input type="text" id="water_bug_property_value" /><a onclick="WaterBug.inspect_property();">refresh</a>';

  /******* initialize the cool stuff *******/

  WaterBug.command_button = WaterBug.adapter().get('water_bug_command_button');
  WaterBug.command_line =  WaterBug.adapter().get('water_bug_command_line');
  WaterBug.command_history = WaterBug.adapter().get('water_bug_command_history');
  WaterBug.inspect_button = WaterBug.adapter().get('water_bug_inspect_button');
  WaterBug.property_name_field = WaterBug.adapter().get('water_bug_property_name');
  WaterBug.property_value_field = WaterBug.adapter().get('water_bug_property_value');
  WaterBug.command_button.onclick = WaterBug.run;
  WaterBug.inspect_button.onclick = WaterBug.toggle_inspect_mode;
  WaterBug.property_name_field.onchange = WaterBug.inspect_property;
  WaterBug.property_name_field.onkeyup =  WaterBug.inspect_property;
  WaterBug.property_value_field.onchange = WaterBug.set_property;
  WaterBug.property_value_field.onkeyup =  WaterBug.set_property;
  
  // Start minimized
  WaterBug.display_wrapper.style.height = '20px'
}
WaterBug.inspect_property = function() {
  var property_name = WaterBug.property_name_field.value;
//  var command = 'WaterBug.selected_element.style.' + property_name;
//  if ((command.length > 0) && (WaterBug.selected_element) && (WaterBug.selected_element.style)) // && (WaterBug.selected_element.)
  //  WaterBug.property_value_field.value = eval(command);
  if ((property_name.length > 0) && (WaterBug.selected_element)) {
    WaterBug.property_value_field.value = WaterBug.selected_element.getStyle(property_name);
    WaterBug.property_value_field.style.background = "#0F0"
  } else
    WaterBug.property_value_field.value = '???';
}
WaterBug.set_property = function() {
  var property_name = WaterBug.property_name_field.value;
  var property_value = WaterBug.property_value_field.value;
  var command = 'WaterBug.selected_element.style.' + property_name + '="'+property_value+'"';
  if ((command.length > 0) && (WaterBug.selected_element) && (WaterBug.selected_element.style))
    try { WaterBug.property_value_field.value = eval(command); WaterBug.property_value_field.style.background = "#0F0"} catch(err) {WaterBug.property_value_field.style.background = "#F00"};
}
WaterBug.unload = function() {
  WaterBug.display_wrapper.remove();
}
WaterBug.toggle_visibility = function() {
  if (0 + WaterBug.display_wrapper.style.height.replace("px", "") > 100) {
    WaterBug.display_wrapper.style.height = '20px';
    WaterBug.display_wrapper.style.overflow = 'hidden';
  } else {
    WaterBug.display_wrapper.style.height = '300px';
  }
}
WaterBug.run = function(event, command) {
  if (!command) {
    command = WaterBug.command_line.value;
    WaterBug.command_line.value = '';
  }
  var hist = '';
  try {
    hist = command + "\n= " + eval(command) + "\n\n";
  } catch(err) {
    hist = command + "\n! ERROR:" + err + "\n\n";
  }
  WaterBug.command_history.value += hist;
  WaterBug.command_history.scrollTop=WaterBug.command_history.scrollHeight;
}
WaterBug.toggle_inspect_mode = function () {
  var elements = WaterBug.adapter().$$('div');
  alert(elements)
  //.concat($$('p')).concat($$('input')).concat($$('span')).concat($$('a'));
  if (WaterBug.inspect_mode) { //Turn inspect mode off
    WaterBug.inspect_mode = 0;
    WaterBug.inspect_button.value="INSPECT";
    elements.each (function(element) {
      if ((element.id != 'water_bug_display_wrapper') && (!element.descendantOf('water_bug_display_wrapper'))) {
        element.onclick = null;
        element.onmouseover = null;
        element.onmouseout = null;
      }
    });
  } else { // Turn inspect mode on
    WaterBug.inspect_mode = 1;
    WaterBug.inspect_button.value="STOP INSPECTING";
    elements.each (function(element) {
      if ((element.id != 'water_bug_display_wrapper') && (!element.descendantOf('water_bug_display_wrapper'))) {
        element.onclick = function() {
          WaterBug.inspect(this);
        }
        element.onmouseover = function(){WaterBug.highlight(element); return true;};
        element.onmouseout = function(){WaterBug.unhighlight(element); return true;};
      }
    });
  }
};
WaterBug.inspect = function(element) {
  if ((!WaterBug.skip_inspecting) || (new Date - WaterBug.skip_inspecting > 500)) {
    WaterBug.skip_inspecting = new Date;
    WaterBug.selected_element = element;
    var element_tree = '';
    var current_element = element;
    while ((current_element) && (current_element.identify)) {
      element_tree = ' > <span style="color:#0A0;">' + current_element.tagName + '</span><span style="color:#F00;">#</span><a onclick="WaterBug.inspect($(\''+current_element.identify()+'\'))">' + current_element.identify() +'</a>'+ element_tree;
      current_element = current_element.up();
    }
    WaterBug.display2.down('p').innerHTML = element_tree;
  }
}
WaterBug.highlight = function(element) {
  if ((!WaterBug.skip_highlighting) || (new Date - WaterBug.skip_highlighting > 100)) {
    if ((element) && (element.style) && (!(element.wb_highlighted))) {
      element.wb_highlighted = 1;
      WaterBug.skip_highlighting = new Date;
      element.original_border = element.style.border;
      element.style.border = "1px dotted #F00";
    }
  }
}
WaterBug.unhighlight = function(element) {
  if ((element) && (element.style) && (element.wb_highlighted)) {
    element.wb_highlighted = 0;
    WaterBug.skip_highlighting = null;
    element.style.border = element.original_border;
    element.original_border = null;
  }
}
WaterBug.load()