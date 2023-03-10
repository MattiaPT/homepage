$.getJSON("./commands.json", function(data) {
  var commands = {};
  for (let i = 0; i < data["commands"].length; i++) {
    commands[data["commands"][i]["keyword"]] = data["commands"][i]["redirect"];
  };
  startCommandLine(commands);
});


function startCommandLine(commands) {
  var input = document.getElementById('cmd');
  var output = document.getElementById('output');

  input.onkeydown = function() {
    var key = event.keyCode || event.charCode;
    var i = 1;
    if (input.value.length == 1) {
	    output.style.lineHeight = '0px';
	    output.style.fontSize = '0px';
      output.style.padding = '0px';
	    output.innerHTML = "";
    }
    input.setSelectionRange(input.value.length, input.value.length);
    if (key == 8)
	    i = -1;
    else if (key == 13) {
	    handler(input.value);
	    return;
    } else if (key == 9) {
	    autocomplete(input.value);
	    i = 0;
    } else if (!((key <= 90 && key >= 65) ||
		             (key <= 57 && key >= 48) ||
		             key == 32 || [220, 221, 222].includes(key) ||
		             (key <= 192 && key >= 186))) {
	    i = 0;
    }
    input.style.width = (input.value.length + i) * 19 + 'px';
  };

  function handler(command) {
    if (Object.keys(commands).includes(command))
	    window.open(commands[command], '_blank');
    else {
	    output.style.lineHeight = '90px';
	    output.style.fontSize = '30px';
      output.style.padding = '10px';
	    output.innerHTML = '> invalid command  (<a href="./commands.json" class="cmdLink">list</a>)';
    }
  }

  function autocomplete(value) {
    var k = "";
    const keys = Object.keys(commands);
    for (var i = 0; i < keys.length; i++) {
	    if (keys[i].startsWith(value)) {
	      if (k != "")
		      return false;
	      k = keys[i];
	    }
    }
    if (k != "")
	    input.value = k;
    return (k != "");
  }
  function FocusCmd() {
    input.focus();
  }
}
