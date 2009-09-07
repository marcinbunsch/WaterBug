/*
 * WaterBug.Inpector
 *
 */
 
WaterBug.Inspector = new Object();

WaterBug.Inspector.htmlentities = function(str) {
    if (!str) return str
    if (typeof(str) != 'string') return str
    output = str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return output
}

WaterBug.Inspector.truncate = function(str) {
  if (str.length < 100) return str
  return str.substr(0, 100) + '...'
}

WaterBug.Inspector.inspect = function(element) {
  
  var element_name = element.toString().replace('[object', '').replace(']', '')
  if (element.id) { element_name += '#' + element.id}
  if (element.className) { element_name += '.' + element.className}
  WaterBug.adapter().get('waterbug-currently-inspected').innerHTML = element_name
  WaterBug.adapter().get('waterbug-inspector-body').innerHTML = ''
  var report = document.createElement('table')
  var content =  null
  var keys = []
  for (item in element) {
    keys.push(item)
  }
  keys.sort()
  for (var i = 0; i < keys.length; i++) {
    item = keys[i]
    content = element[item]
    if (typeof(content) == 'function') {
      content = 'function() {}'
    } else if (typeof(content) == 'object') {
      if (content == null) {
        content = 'null'
      } else{
        var link = WaterBug.adapter().create('a');
        link.innerHTML = content
        link._subject = content
        link._allowed = true
        link.href = '#'
        link.onclick = function() {
          WaterBug.Inspector.inspect(this._subject);
          return false;
        }
        content = link
      }
    } else {
      content = WaterBug.Inspector.htmlentities(content).toString()
      content = WaterBug.Inspector.truncate(content)
    }
    row = WaterBug.adapter().create('tr');
    cell_a = WaterBug.adapter().create('td', { style: 'vertical-align: top'});
    cell_b = WaterBug.adapter().create('td', { style: 'vertical-align: top'});
    cell_a.innerHTML = item
    if (typeof(content) == 'string') {
      cell_b.innerHTML = content
    } else if (typeof(content) == 'number') {
      cell_b.innerHTML = content
    } else if (content && typeof(content.nodeName) == 'string' && content._allowed && content._allowed == true) {
      try {
        cell_b.appendChild(content)
      } catch(e) {
        alert("error on " + content + ' - ' + typeof(content))
        dsadasdas
      }
    } else {
       cell_b.innerHTML = content
      
    }
    row.appendChild(cell_a)
    row.appendChild(cell_b)
    report.appendChild(row)
  }
  WaterBug.adapter().get('waterbug-inspector-body').innerHTML = ''
  WaterBug.adapter().get('waterbug-inspector-body').appendChild(report)
}


WaterBug.Inspector.toggle_inspect_mode = function () {
  var elements = WaterBug.adapter().$$('*').concat($$('p')).concat($$('select')).concat($$('input')).concat($$('span')).concat($$('a'));

  if (WaterBug.inspect_mode) { //Turn inspect mode off
    WaterBug.inspect_mode = 0;
    WaterBug.inspect_button.innerHTML="INSPECT";
    if (WaterBug.Highlighter.current) WaterBug.Highlighter.unhighlight(WaterBug.Highlighter.current)
    elements.each (function(element) {
      if ((element.id != 'water_bug_display_wrapper') && (!element.descendantOf('water_bug_display_wrapper'))) {
        element.onclick = null;
        element.onmouseover = null;
        element.onmouseout = null;
      }
    });
  } else { // Turn inspect mode on
    WaterBug.inspect_mode = 1;
    WaterBug.inspect_button.innerHTML="STOP INSPECTING";
    elements.each (function(element) {
      if ((element.id != 'water_bug_display_wrapper') && (!element.descendantOf('water_bug_display_wrapper'))) {
        element.onclick = function() {
          WaterBug.Inspector.inspect(this)
          WaterBug.Inspector.toggle_inspect_mode();
//          WaterBug.inspect(this);
        }
        element.onmouseover = function(){WaterBug.highlight(element); return true;};
        //element.onmouseout = function(){WaterBug.unhighlight(element); return true;};
      }
    });
    // Exception: WaterBug elements
    WaterBug.adapter().$$('#water_bug_display_wrapper *').each(function(element) {
      element.onclick = function(e) { 
        if (this._onclick) this._onclick()
        e.stop() 
      };
    });
  }
};

/*
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

*/
