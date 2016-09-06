# pistop-nodejs

The [Pi-Stop](https://github.com/PiHw/Pi-Stop) is a hardware module designed for plugging directly on to the Raspberry Pi GPIO header.

[Cylon.js](https://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things with support for >40 different platforms, incl. the Raspberry Pi and Tessel.

[Johnny-Five](http://johnny-five.io) is a JavaScript Robotics & IoT platform with support for a variety of Arduino-compatible Boards. For non-Arduino based projects (e.g. Raspberry Pi or Tessel), platform-specific IO Plugins are available.

## Raspberry Pi Setup 

Setup according to https://cylonjs.com/documentation/platforms/raspberry-pi/

In order to access the GPIO pins without using sudo you will need to both app the pi user to the gpio group:

Add to `/etc/modules`:

```
i2c-bcm2708
i2c-dev
```

Add to `/boot/config.txt`:

```
dtparam=i2c1=on
dtparam=i2c_arm=on
```

## Run

```sh
sudo node blinky-cylonjs.js
```

```sh
sudo node blinky-j5.js
```

### AWS IoT

Copy `device-config.js.dist` to `device-config.js` and adjust config to your AWS IoT setup.

You may want to place certificates and keys into `certs/` directory. 

```sh
sudo node blinky-j5-aws-iot.js
```

To toggle the Pi-Stop LEDs you want to subscribe to topic `YOUR_LOWERCASED_CLIENT_ID/pistop` and send messages like:

```JSON
{ "led": "green", "action": "toggle" }
```

## Documentation

- [Pi-Stop Documentation](https://github.com/PiHw/Pi-Stop/blob/master/markdown_source/markdown/Discover-PiStop.md)

- [GPIO Pinout guide for the Raspberry Pi](http://pinout.xyz)