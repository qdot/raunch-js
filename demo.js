'use strict';

var devices = [];

var init = function() {
  var connectBtn = document.getElementById('connect');
  connectBtn.addEventListener('click', function(event) {
    findDevice().then(d => {
      let dev = new RaunchWebBluetooth(d);
      dev.open();
      devices.push(dev);
    });
  });

  var button = document.getElementById('send');
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var pos = document.getElementById('position');
  var speed = document.getElementById('speed');
  button.addEventListener('click', function(event) {
    devices.forEach(dev => {
      dev.update(parseInt(pos.value,10), parseInt(speed.value,10));
    });
  });
  start.addEventListener('click', function(event) {
    devices.forEach(dev => {
      dev.runStroke(0);
    });
  });
  stop.addEventListener('click', function(event) {
    devices.forEach(dev => {
      dev.stopStroke();
    });
  });

};
