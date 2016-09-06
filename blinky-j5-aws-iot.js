var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});

var awsIot = require('aws-iot-device-sdk');
var deviceConfig = require('./device-config');

var device = awsIot.device(deviceConfig);

var topic = deviceConfig.clientId.toLowerCase() + '/pistop';

board.on("ready", function () {

  var greenLed = new five.Led("P1-22").off(),
    yellowLed = new five.Led("P1-24").off(),
    redLed = new five.Led("P1-26").off();

  device
    .on('connect', function () {
      console.log('connect');
      device.subscribe(topic, { qos: 0 }, function (err, granted) {
        if (err) console.log('subscribe error', err);

        device.publish(topic, JSON.stringify({ msg: deviceConfig.clientId + " subscribed to " + topic }));
      });
    });

  device
    .on('error', function (err) {
      console.log('error', err);
    });

  device
    .on('message', function (topic, payload) {
      console.log('message', topic, payload.toString());
      var payload = JSON.parse(payload);
      if (topic === topic
        && payload
        && payload.action
        && payload.action === 'toggle') {
        if (payload.led && payload.led !== '') {
          switch (payload.led) {
            case 'green':
              greenLed.toggle();
              break;
            case 'yellow':
              yellowLed.toggle();
              break;
            case 'red':
              redLed.toggle();
              break;
            default:
              console.log('Are you sure you know the colors of a traffic light?  ;-)');
          }
        }
      }
    });
});