var Cylon = require("cylon");

Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    green_led: { driver: 'led', pin: 22 },
    yellow_led: { driver: 'led', pin: 24 },
    red_led: { driver: 'led', pin: 26 }
  },

  work: function (my) {
    my.green_led.turnOff();
    my.yellow_led.turnOff();
    my.red_led.turnOff();
    every((1).seconds(), function () {
      my.green_led.toggle();
    });
  }
}).start();