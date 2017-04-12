'use strict';

import EventEmitter from 'events';

export const RAUNCH_SERVICE = '88f80580-0000-01e6-aace-0002a5d5c51b';
export const RAUNCH_TX_CHAR = '88f80581-0000-01e6-aace-0002a5d5c51b';
export const RAUNCH_RX_CHAR = '88f80582-0000-01e6-aace-0002a5d5c51b';
export const RAUNCH_CMD_CHAR = '88f80583-0000-01e6-aace-0002a5d5c51b';

function bcd(val) {
  return ((val/10) << 4) | (val%10);
}

export class RaunchProtocol extends EventEmitter {

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

