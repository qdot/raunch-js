# raunch-js

[![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/qdot)

Raunch is a library for controlling the Fleshlight Launch Sex Toy. The
library allows developers to create applications that can:

- Control the speed and position of the Launch
- Read the status of the touchpads/buttons on the device
- Load new firmware to the device

## Javascript/Node.js Library and Platform Support

raunch-js is written to handle communications with the Fleshlight Launch
across both node.js and web technologies like WebBluetooth. Depending
on the platform, it can be used in local node applications, or on
webpages.

As a node.js library, lovesense-js can be used on the following
platforms with the toys listed:

- Windows - Supports
  if
  [noble + libusb + bluetooth dongle setup](https://github.com/sandeepmistry/node-bluetooth-hci-socket#windows) is
  used. Support for Windows 10 BLE coming in April 2017 hopefully.
- macOS - All lovense toys, assuming macOS 10.6+
- linux - All lovense toys, assuming bluez > 5.42

As a web library using WebBluetooth, raunch-js can be used on the
following platforms with the Bluetooth LE based toys listed:

- Windows - No support currently. Waiting for Chrome to have Windows
  bluetooth support.
- macOS - Supported using Chrome 56+
- linux - Supported using Chrome 56+ (with experimental web extensions
  turned on) and bluez > 5.42
- Android - Supported using Android M
- ChromeOS - Supported

## Support The Project

If you find this project helpful, you
can
[support Metafetish projects via Patreon](http://patreon.com/qdot)!
Every donation helps us afford more hardware to reverse, document, and
write code for!

## Disclaimer

The raunch project is in no way affiliated with Fleshlight, Kiiroo, or
any of their partners. The documentation and libraries here have been
produced via clean room reverse engineering methods, and are provided
with no guarantees, as outlined by the license agreement. Usage of
these libraries and information is in no way condoned by
aforementioned companies, and may void the warranty of your toy.

## License

tl;dr: BSD 3-Clause License

Copyright (c) 2016, Metafetish Project
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
* Redistributions of source code must retain the above copyright
  notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright
  notice, this list of conditions and the following disclaimer in the
  documentation and/or other materials provided with the distribution.
* Neither the name of the authors nor the names of its contributors
  may be used to endorse or promote products derived from this
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY The Authors ''AS IS'' AND ANY EXPRESS
OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL The Authors BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE


