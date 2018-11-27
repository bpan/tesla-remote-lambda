const tjs = require('teslajs');
const Promise = require('promise');

const username = process.env.TESLA_EMAIL;
const password = process.env.TESLA_PASS;

exports.handler = (event, context, callback) => {
  tjs.loginAsync(username, password).then(result => {
    const token = JSON.stringify(result.authToken);

    if (token) {
      console.log("Login successful");

      const options = {
        authToken: result.authToken
      };

      tjs.vehicleAsync(options).then(vehicle => {
        console.log("Vehicle name: " + vehicle.display_name);

        const options = {
          authToken: result.authToken,
          vehicleID: vehicle.id_s
        };

        let awake;
        if (vehicle.state.toUpperCase() === "ASLEEP") {
          console.log("Waking up car");
          awake = tjs.wakeUpAsync(options).then(vehicle => waitForOnline(options, vehicle));
        } else {
          console.log("Vehicle state: " + vehicle.state.toUpperCase());
          awake = Promise.resolve(vehicle);
        }

        awake.then(() => {
          tjs.vehicleStateAsync(options).then(vehicleState => {
            if (vehicleState.homelink_nearby === false) {
              console.log("Homelink is not nearby! Not proceeding any further.");
            } else {
              console.log("Handling " + event.clickType + " click");
              switch (event.clickType) {
                case "SINGLE":
                case "LONG":
                  tjs.doorUnlockAsync(options).then(() => {
                    console.log("Doors are now UNLOCKED");
                  });
                  break;
                case "DOUBLE":
                  tjs.openChargePortAsync(options).then(() => {
                    console.log("Charge port OPENED");
                  });
                  break;
                default:
                  console.log("Unknown clickType: " + event.clickType);
              }
            }
          });
        });
      });
    }
  });

  const waitForOnline = (options, vehicle) => {
    let counter = 4;

    const checkOnline = vehicle => {
      return new Promise(resolve => {
        const state = vehicle.state.toUpperCase();
        console.log("Vehicle state: " + state);
        if (state.toUpperCase() === "ONLINE" || counter <= 1) {
          resolve(vehicle);
        } else {
          counter--;
          console.log("Waiting... " + counter);
          setTimeout(() => {
            tjs.vehicleAsync(options)
              .then(checkOnline)
              .then(resolve);
          }, 4000 * counter);
        }
      });
    };

    return checkOnline(vehicle);
  };
};
