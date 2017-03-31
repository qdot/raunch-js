'use strict';

import EventEmitter from 'events';

const RAUNCH_SERVICE = '88f80580-0000-01e6-aace-0002a5d5c51b';
const RAUNCH_TX_CHAR = '88f80581-0000-01e6-aace-0002a5d5c51b';
const RAUNCH_RX_CHAR = '88f80582-0000-01e6-aace-0002a5d5c51b';

function bcd(val) {
  return ((val/10) << 4) | (val%10);
}

class RaunchProtocol extends EventEmitter {

  constructor() {
    this._buttons = [0,0,0,0,0,0,0];
  }

  sendCommand(position, speed) {
    if (position > 99 || position < 0) {
      return Promise.reject("Position out of bounds");
    }
    if (speed > 99 || speed < 0) {
      return Promise.reject("Speed out of bounds");
    }
    return this._write(new Uint8Array([bcd(position), bcd(speed)]));
  }

  _updateButtonState(buttons) {
  }

  _write(data) {
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

export { RAUNCH_SERVICE,
         RAUNCH_TX_CHAR,
         RAUNCH_RX_CHAR,
         RaunchProtocol };
