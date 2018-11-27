const tjs = require('teslajs');
const Promise = require('promise');

const username = process.env.TESLA_EMAIL;
const password = process.env.TESLA_PASS;

tjs.loginAsync(username, password).then(result => {
  const token = JSON.stringify(result.authToken);

  if (token) {
    console.log("Login Succesful!");

    const options = {
      authToken: result.authToken
    };

    tjs.vehicleAsync(options).then(vehicle => {
      console.log("Vehicle response:");
      console.log(vehicle);

      const options = {
        authToken: result.authToken,
        vehicleID: vehicle.id_s
      };

      // tjs.vehicleStateAsync(options).then(vehicleState => {
      //   console.log(vehicleState);
      // });
    });
  }
});
