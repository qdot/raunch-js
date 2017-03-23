'use strict';

const RAUNCH_SERVICE = '88f80580-0000-01e6-aace-0002a5d5c51b';
const RAUNCH_TX_CHAR = '88f80581-0000-01e6-aace-0002a5d5c51b';
const RAUNCH_RX_CHAR = '88f80582-0000-01e6-aace-0002a5d5c51b';

function findDevice() {
  return navigator.bluetooth.requestDevice({
    filters: [{
      name: "Launch"
    }],
    optionalServices: [RAUNCH_SERVICE]

  });
};

class RaunchWebBluetooth {
  constructor(device) {
    if (device === undefined) {
      throw new Error('LovesenseWebBluetooth requires a bluetooth device!');
    }
    this._device = device;
    this._service = undefined;
    this._tx = undefined;
    this._rx = undefined;
    this._msg_queue = [];
  }

  open() {
    return this._device.gatt.connect()
      .then(server => { return server.getPrimaryService(RAUNCH_SERVICE); }).catch(er => { console.log(er); })
      .then(service => { this._service = service;
                         return this._service.getCharacteristic(RAUNCH_TX_CHAR);
                       }).catch(er => { console.log(er); })
      .then(char => { this._tx = char;
                      //return this._service.getCharacteristic(RAUNCH_RX_CHAR);
                    }).catch(er => { console.log(er); });
      // .then(char => { this._rx = char;
      //                 return this._rx.startNotifications().then(_ => {
      //                   console.log("connected!");
      //                   this._rx.addEventListener('characteristicvaluechanged', e => console.log(new TextDecoder('ASCII').decode(e.target.value)));
      //                 });
      //               });
  }

  update(position, speed) {
    this._tx.writeValue(new Uint8Array([position, speed]));
  }

  close() {
    if (this._device !== undefined) {
      return this._device.gatt.disconnect();
    }
  }
};
