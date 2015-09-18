// declare all variables
var session_length;
var break_length;
var num_sessions;
var current_session;
var time_on;
var current_time;
var timer;
var break_on;

// initialize all variables
$(document).ready(function() {
  session_length = 600;
  current_time = session_length;
  break_length = 120;
  num_sessions = 5;
  current_session = num_sessions;
  time_on = false;
  break_on = false;
  updateScreen();
});

// update variables on screen
function updateScreen() {
  var l;
  $("#sessL").html(convertNumToMin(session_length));
  $("#timeR").html(convertNumToMin(current_time));
  if (break_on) {
    document.getElementById("inner_circle").style.backgroundColor = 'red';
    document.getElementById("inner_circle").style.opacity = 1 - (current_time / session_length);
    $("#timeE").html(convertNumToMin(break_length - current_time));
    l = "BREAK!";
  } else {
    document.getElementById("inner_circle").style.backgroundColor = 'green';
    document.getElementById("inner_circle").style.opacity = 1 - (current_time / session_length);
    $("#timeE").html(convertNumToMin(session_length - current_time));
    l = "GO!";
  }
  $("#breaL").html(convertNumToMin(break_length));
  $("#sessN").html(num_sessions);
  $("#label").html(l + "&nbsp;&nbsp;&nbsp;" + (num_sessions - current_session + 1) + " / " + num_sessions)
  checkTime();
}

// convert number of seconds to minutes:seconds
function convertNumToMin(num) {
  var mins = Math.floor(num / 60);
  var secs = num - mins * 60;
  if (secs < 10) return mins + ":0" + secs;
  return mins + ":" + secs;
}

// click tabata button
$("#tabataBtn").click(function() {
  session_length = 20;
  current_time = session_length;
  break_length = 10;
  num_sessions = 8;
  current_session = num_sessions;
  time_on = false;
  clearInterval(timer);
  break_on = false;
  updateScreen();
});

// click pomodoro button
$("#pomodoroBtn").click(function() {
  session_length = 1500;
  current_time = session_length;
  break_length = 300;
  num_sessions = 4;
  current_session = num_sessions;
  time_on = false;
  clearInterval(timer);
  break_on = false;
  updateScreen();
});

// enable -/+ button functionality
$("#slM").click(function() {
  session_length = session_length - 10;
  if (session_length < 0)
    session_length = 0;
  current_time = session_length;
  current_session = num_sessions;
  time_on = false;
  clearInterval(timer);
  break_on = false;
  updateScreen();
});
$("#slP").click(function() {
  session_length = session_length + 10;
  current_time = session_length;
  current_session = num_sessions;
  time_on = false;
  clearInterval(timer);
  break_on = false;
  updateScreen();
});
$("#blM").click(function() {
  break_length = break_length - 10;
  if (break_length < 0)
    break_length = 0;
  current_time = session_length;
  current_session = num_sessions;
  time_on = false;
  clearInterval(timer);
  break_on = false;
  updateScreen();
});
$("#blP").click(function() {
  break_length = break_length + 10;
  current_time = session_length;
  current_session = num_sessions;
  time_on = false;
  clearInterval(timer);
  break_on = false;
  updateScreen();
});
$("#sM").click(function() {
  num_sessions--;
  if (num_sessions < 0) 
    num_sessions = 0;
  current_time = session_length;
  current_session = num_sessions;
  time_on = false;
  clearInterval(timer);
  break_on = false;
  updateScreen();
});
$("#sP").click(function() {
  num_sessions++;
  current_time = session_length;
  current_session = num_sessions;
  time_on = false;
  clearInterval(timer);
  break_on = false;
  updateScreen();
});

// enable start/stop when clicking circle
$(".circle").click(function() {
  if (!time_on) {
    time_on = true;
    timer = setInterval(function() {
      current_time--;
      updateScreen();
    }, 1000);
  } else {
    time_on = false;
    clearInterval(timer);
  }
});

// enable spacebar start/stop
document.onkeydown = function(e) {
  if (e.keyCode == 32)
    document.getElementById("circle").click();
};

// enable reset button
$("#rstbtn").click(function() {
  current_time = session_length;
  current_session = num_sessions;
  time_on = false;
  clearInterval(timer);
  break_on = false;
  updateScreen();
});


function checkTime() {
  if (current_time < 0 && break_on == false) {
    current_time = break_length;
    break_on = true;
    updateScreen();
  } else if (current_time < 0 && break_on == true) {
    current_time = session_length;
    break_on = false;
    current_session--;
    if (current_session == 0) {
      time_on = false;
      clearInterval(timer);
      break_on = false;
      document.getElementById("inner_circle").style.backgroundColor = 'purple';
      document.getElementById("inner_circle").style.opacity = 0.5;
      $("#timeR").html(convertNumToMin(0));
      $("#timeE").html(convertNumToMin(0));
      $("#label").html("Well done!");
    } else {
      updateScreen();
    }
  }
}