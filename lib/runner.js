/*
 * WaterBug.Runner
 *
 */
 
WaterBug.Runner = new Object()

// Storage for command history
WaterBug.Runner.history = []

// Go back one step in history and present command in command line
WaterBug.Runner.back = function() {
  history_point = WaterBug.command_line.history_point
  if (!history_point) history_point = WaterBug.Runner.history.length
  history_point = history_point - 1
  history_command = WaterBug.Runner.history[history_point]
  WaterBug.command_line.history_point = history_point
  WaterBug.command_line.value = history_command
}

// Go forward one step in history and present command in command line
WaterBug.Runner.forward = function() {
  history_point = WaterBug.command_line.history_point  
  if (typeof(history_point) == 'undefined') history_point = WaterBug.Runner.history.length
  history_point = history_point + 1
  if (history_point >= WaterBug.Runner.history.length) history_point = 0
  history_command = WaterBug.Runner.history[history_point]
  WaterBug.command_line.history_point = history_point
  WaterBug.command_line.value = history_command
}

// Run the command found in command line and output to history box
WaterBug.Runner.run = function() {
  command = WaterBug.command_line.value;
  WaterBug.command_line.value = '';
  if (!command || command == '') return
  var hist = '';
  try {
    hist = '<p class="command">&gt;' + command + '</p><p class="result">' + eval(command) + '</p>';
  } catch(err) {
    hist = '<p class="command">&gt;' + command + '</p><p class="error">ERROR:' + err + '</p>';
  }
  WaterBug.Runner.history.push(command);
  WaterBug.command_line.history_point = WaterBug.Runner.history.length
  WaterBug.command_history.innerHTML += hist;
  WaterBug.command_history.scrollTop=WaterBug.command_history.scrollHeight;
}

// Legacy functions
WaterBug.run = WaterBug.Runner.run