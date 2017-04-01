'use strict';

import * as RaunchProtocolModule from './protocol';

export class RaunchWebBluetooth extends RaunchProtocolModule.RaunchProtocol {
  constructor(device) {
    super();
    if (device === undefined) {
      throw new Error('RaunchWebBluetooth requires a bluetooth device!');
    }
    this._device = device;
    this._service = undefined;
    this._tx = undefined;
    this._rx = undefined;
  }

  _connect() {
    // TODO: Fix error throwing here
    return this._device.gatt.connect()
      .then(server => { return server.getPrimaryService(RaunchProtocolModule.RAUNCH_SERVICE); }).catch(er => { console.log(er); })
      .then(service => { this._service = service;
                         return this._service.getCharacteristic(RaunchProtocolModule.RAUNCH_TX_CHAR);
                       }).catch(er => { console.log(er); })
      .then(char => { this._tx = char;
                      return this._service.getCharacteristic(RaunchProtocolModule.RAUNCH_RX_CHAR);
                    }).catch(er => { console.log(er); })
      .then(char => { this._rx = char;
                      return this._rx.startNotifications().then(_ => {
                        this._rx.addEventListener('characteristicvaluechanged', e => {
                          this._updateButtonState(e);
                        });
                      });
                    });
  }

  _write(data) {
    return this._tx.writeValue(data);
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
      optionalServices: [RaunchProtocolModule.RAUNCH_SERVICE]
    }).then(d => {
      let dev = new RaunchWebBluetooth(d);
      return dev._connect().then(() => Promise.resolve(dev), (err) => Promise.reject(err));
    }, err => {
      Promise.reject(err);
    });
  }
}
