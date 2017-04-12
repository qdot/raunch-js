var RaunchWebBluetooth =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_events__);




const RAUNCH_SERVICE = '88f80580-0000-01e6-aace-0002a5d5c51b';
/* harmony export (immutable) */ __webpack_exports__["b"] = RAUNCH_SERVICE;

const RAUNCH_TX_CHAR = '88f80581-0000-01e6-aace-0002a5d5c51b';
/* harmony export (immutable) */ __webpack_exports__["c"] = RAUNCH_TX_CHAR;

const RAUNCH_RX_CHAR = '88f80582-0000-01e6-aace-0002a5d5c51b';
/* harmony export (immutable) */ __webpack_exports__["e"] = RAUNCH_RX_CHAR;

const RAUNCH_CMD_CHAR = '88f80583-0000-01e6-aace-0002a5d5c51b';
/* harmony export (immutable) */ __webpack_exports__["d"] = RAUNCH_CMD_CHAR;


function bcd(val) {
  return ((val/10) << 4) | (val%10);
}

class RaunchProtocol extends __WEBPACK_IMPORTED_MODULE_0_events___default.a {

  constructor() {
    super();
    this._buttons = [false,false,false,false,false,false,false];
    this._idle_buttons = [971, 858, 931, 1012, 945, 873, 976];
  }

  init() {
    this._write(RAUNCH_CMD_CHAR, new Uint8Array([0x00]));
  }

  sendCommand(position, speed) {
    if (position > 99 || position < 0) {
      return Promise.reject("Position out of bounds");
    }
    if (speed > 99 || speed < 0) {
      return Promise.reject("Speed out of bounds");
    }
    return this._write(RAUNCH_TX_CHAR, new Uint8Array([position, speed]));
  }

  _updateButtonState(buttons) {
    for (var i = 0; i < buttons.length; ++i) {
      var diff = this._idle_buttons[i] - buttons[i];
      // TODO: This threshhold is really finnicky. Find a better way to set it.
      if (diff > 50 && this._buttons[i] === false) {
        this._buttons[i] = true;
        this.emit('buttondown', i);
      }
      else if (diff < 50 && this._buttons[i] === true) {
        this._buttons[i] = false;
        this.emit('buttonup', i);
      }
    }
  }

  _write(char_id, data) {
    throw "Must implement write function!";
  }

  connect() {
    throw "Must implement connect function!";
  }

  disconnect() {
    throw "Must implement disconnect function!";
  }

  subscribe() {
    throw "Must implement subscribe function!";
  }

  static discover(){
    throw "Must implement static discover function!";
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RaunchProtocol;




/***/ }),
/* 1 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__protocol__ = __webpack_require__(0);




class RaunchWebBluetooth extends __WEBPACK_IMPORTED_MODULE_0__protocol__["a" /* RaunchProtocol */] {
  constructor(device) {
    super();
    if (device === undefined) {
      throw new Error('RaunchWebBluetooth requires a bluetooth device!');
    }
    this._device = device;
    this._service = undefined;
    this._tx = undefined;
    this._rx = undefined;
    this._cmd = undefined;
  }

  _connect() {
    // TODO: Fix error throwing here
    return this._device.gatt.connect()
      .then(server => { return server.getPrimaryService(__WEBPACK_IMPORTED_MODULE_0__protocol__["b" /* RAUNCH_SERVICE */]); }).catch(er => { console.log(er); })
      .then(service => { this._service = service;
                         return this._service.getCharacteristic(__WEBPACK_IMPORTED_MODULE_0__protocol__["c" /* RAUNCH_TX_CHAR */]);
                       }).catch(er => { console.log(er); })
      .then(char => { this._tx = char;
                      return this._service.getCharacteristic(__WEBPACK_IMPORTED_MODULE_0__protocol__["d" /* RAUNCH_CMD_CHAR */]);
                    }).catch(er => { console.log(er); })
      .then(char => { this._cmd = char;
                      // Send command version now.
                      this.init();
                      return this._service.getCharacteristic(__WEBPACK_IMPORTED_MODULE_0__protocol__["e" /* RAUNCH_RX_CHAR */]);
                    }).catch(er => { console.log(er); })
      .then(char => { this._rx = char;
                      return this._rx.startNotifications().then(_ => {
                        this._rx.addEventListener('characteristicvaluechanged', e => {
                          this._parseButtons(e.target.value);
                        });
                      });
                    });
  }

  _parseButtons(data) {
    var ints = new Uint16Array(data.byteLength / 2);
    for (var i = 0; i < ints.length; i++) {
      // Pull out 16-bit, big endian values
      ints[i] = data.getUint16(i * 2, false);
    }
    this._updateButtonState(ints);
  }

  _write(char_id, data) {
    if (char_id == __WEBPACK_IMPORTED_MODULE_0__protocol__["c" /* RAUNCH_TX_CHAR */]) {
      return this._tx.writeValue(data);
    } else if (char_id == __WEBPACK_IMPORTED_MODULE_0__protocol__["d" /* RAUNCH_CMD_CHAR */]) {
      return this._cmd.writeValue(data);
    }
  }

  disconnect() {
    throw "Must implement disconnect function!";
  }

  subscribe() {
    throw "Must implement subscribe function!";
  }

  static discover() {
    return navigator.bluetooth.requestDevice({
      filters: [{
        name: "Launch"
      }],
      optionalServices: [__WEBPACK_IMPORTED_MODULE_0__protocol__["b" /* RAUNCH_SERVICE */]]
    }).then(d => {
      let dev = new RaunchWebBluetooth(d);
      return dev._connect().then(() => Promise.resolve(dev), (err) => Promise.reject(err));
    }, err => {
      Promise.reject(err);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["RaunchWebBluetooth"] = RaunchWebBluetooth;



/***/ })
/******/ ]);