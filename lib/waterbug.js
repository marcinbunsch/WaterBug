/*
 * WaterBug
 *
 */
 
WaterBug = new Object();

WaterBug.load = function() {

  WaterBug.inspect_mode = 0;
  // TODO: find a fix for position: fixed in IE 6
  WaterBug.display_wrapper = WaterBug.adapter().create('div', {id: 'water_bug_display_wrapper', style:"position: fixed; bottom: 0px; left: 0px; width: 100%; height: 330px; background-color: #000; padding: 0px; z-index: 1000;"});
  WaterBug.header = WaterBug.adapter().create('div', {id: 'water_bug_display_header', style:"background-color: #333; height: 20px;"});
  WaterBug.display1 = WaterBug.adapter().create('div', {style:"width: 48%; margin: 0; background-color: #FFF; overflow: scroll; height: 260px; padding: 1%; overflow: hidden; float: left;"});
  WaterBug.display2 = WaterBug.adapter().create('div', {style:"width: 49%;margin: 0; margin-left: 1%; background-color: #FFF; overflow: scroll; height: 280px; padding: 0px; overflow: hidden; float: left;"});
  WaterBug.display3 = WaterBug.adapter().create('div', {style:"display: none; clear: both;"});
  WaterBug.close_link = WaterBug.adapter().create('a', {style:"width: 40px; height: 20px; color: #FFF; position: absolute; top: 1px; right: 15px; font-size: 12px; cursor: pointer;"});
  WaterBug.hide_link = WaterBug.adapter().create('a', {style:"width: 40px; height: 20px; color: #FFF; position: absolute; top: 1px; right: 15px; font-size: 12px; cursor: pointer;"});
  WaterBug.label = WaterBug.adapter().create('div', {style:"width: 150px; height: 20px; color: #FFF; position: absolute; top: 1px; left: 15px; font-size: 12px;", href: 'http://applicake.com/'});
  WaterBug.styles = '<style type="text/css"> \
  #water_bug_command_history { padding: 3px; }\
  #water_bug_command_history p { margin: 0; padding: 0}\
  #water_bug_command_history p.command { color: #999; }\
  #water_bug_command_history p.result { font-weight: bold; }\
  #water_bug_command_history p.error { color: red; }\
  .waterbug-inspector-head { text-align: left; }\
  .waterbug-inspector-body { height: 260px; text-align: left; overflow: scroll }\
  </style>';
  WaterBug.close_link.innerHTML='X close';
  WaterBug.hide_link.innerHTML='_ hide';
  WaterBug.label.innerHTML='WaterBug | <a href="#" onclick="WaterBug.toggle_visibility();; WaterBug.Inspector.toggle_inspect_mode(); return false" style="color: #fff">Inspect</a>';
  WaterBug.close_link.onclick = function(){WaterBug.unload();};
  WaterBug.close_link._onclick = WaterBug.close_link.onclick
  WaterBug.hide_link.onclick = function(){WaterBug.toggle_visibility();};
  WaterBug.hide_link._onclick = WaterBug.hide_link.onclick
  WaterBug.display_wrapper.insert(WaterBug.header, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.display1, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.display2, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.display3, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.hide_link, {position:'bottom'});
 // WaterBug.display_wrapper.insert(WaterBug.close_link, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.label, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.styles, {position:'bottom'});
  document.body.insert(WaterBug.display_wrapper, {position:'bottom'});
  WaterBug.display1.innerHTML = '<div id="water_bug_command_history" style="width: 100%; height: 230px; text-align: left; border:1px solid #999; overflow: auto"></div><table style="width: 100%"><tr><td><input type="text" id="water_bug_command_line" style="width: 100%;" /></td><td style="width: 70px"><input type="submit" id="water_bug_command_button" style="border:1px solid #999" value="Run" /></td></tr></table>';
  WaterBug.display2.innerHTML = '<div class="waterbug-inspector-head"><a href="#" id="water_bug_inspect_button">Inspect</a> <span id="waterbug-currently-inspected"></span><br /></div><div id="waterbug-inspector-body" class="waterbug-inspector-body"></div>';

  /******* initialize the cool stuff *******/

  WaterBug.command_button = WaterBug.adapter().get('water_bug_command_button');
  WaterBug.command_line =  WaterBug.adapter().get('water_bug_command_line');
  WaterBug.command_history = WaterBug.adapter().get('water_bug_command_history');
  WaterBug.inspect_button = WaterBug.adapter().get('water_bug_inspect_button');
  WaterBug.command_line.onkeypress = function(e) {
    if (document.layers) { key = e.which; } else if (typeof(e.keyCode) != 'undefined') { key = e.keyCode; } else { key = window.event.keyCode; }   
    if (key == '13') WaterBug.run()
    if (key == '38') WaterBug.Runner.back()
    if (key == '40') WaterBug.Runner.forward()
  }  
  WaterBug.command_button.onclick = WaterBug.run;
  WaterBug.command_button._onclick = WaterBug.run;
  WaterBug.inspect_button.onclick = WaterBug.Inspector.toggle_inspect_mode;
  WaterBug.inspect_button._onclick = WaterBug.Inspector.toggle_inspect_mode;
  
  // Start minimized
  WaterBug.display_wrapper.style.height = '20px'
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

//== CUT HERE
// start file load
// this is only loaded in development - the production version removes this bit before packaging
var last_element = document.body.childNodes[(document.body.childNodes.length - 1)]
var root_dir = last_element.src.replace('waterbug.js', '')
document.write('<script type="text/javascript" src="' + root_dir + 'adapters.js"></script>')
document.write('<script type="text/javascript" src="' + root_dir + 'adapters/jquery.js"></script>')
document.write('<script type="text/javascript" src="' + root_dir + 'adapters/prototype.js"></script>')
document.write('<script type="text/javascript" src="' + root_dir + 'inspector.js"></script>')
document.write('<script type="text/javascript" src="' + root_dir + 'highlighter.js"></script>')
document.write('<script type="text/javascript" src="' + root_dir + 'runner.js"></script>')
document.write('<script type="text/javascript" src="' + root_dir + 'init.js"></script>')
// end init load
