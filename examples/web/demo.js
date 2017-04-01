'use strict';

var devices = [];

var init = function() {
  var connectBtn = document.getElementById('connect');
  connectBtn.addEventListener('click', function(event) {
    RaunchWebBluetooth.RaunchWebBluetooth.discover().then((device) => {
      devices.push(device);
    });
  });

  var button = document.getElementById('send');
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var pos = document.getElementById('position');
  var speed = document.getElementById('speed');

  var running = false;
  var quit = false;

  function stopStroke() {
    if (running === true) {
      quit = true;
    }
  }

  function runStroke(position) {
    if (quit) {
      quit = false;
      running = false;
      return;
    }
    running = true;
    devices.forEach(dev => {
      dev.sendCommand(position, 99);
    });
    setTimeout(() => {
      runStroke(position > 0 ? 0 : 99);
    }, 1000);
  }

  button.addEventListener('click', function(event) {
    devices.forEach(dev => {
      dev.sendCommand(parseInt(pos.value,10), parseInt(speed.value,10));
    });
  });
  start.addEventListener('click', function(event) {
    devices.forEach(dev => {
      runStroke(0);
    });
  });
  stop.addEventListener('click', function(event) {
    devices.forEach(dev => {
      stopStroke();
    });
  });
};
