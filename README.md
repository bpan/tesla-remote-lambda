# tesla-remote-lambda

A Telsa API lambda function inspired by 
[Amit Bahree's post](http://desigeek.com/blog/amit/2018/09/16/setting-up-your-own-model-3-keyfob-using-a-iot-button/)
on using an Amazon IoT button to unlock your car.

# Build

1. Install [node.js](https://nodejs.org/en/).
1. Run `npm install` in the project's root directory to install dependencies and create a lambda function zip which can be uploaded to AWS.

# Test

1. `export HISTCONTROL=ignorespace`  # Hide commands from your history 
1. `export TESLA_EMAIL=<your email>`  # Add a leading space to hide this command 
1. `export TESLA_PASS=<your password>`  # Add a leading space to hide this command 
1. `node test-click.js`

# Links

* [Amit Bahree's post](http://desigeek.com/blog/amit/2018/09/16/setting-up-your-own-model-3-keyfob-using-a-iot-button/)
* [AWS IoT Guide](https://docs.aws.amazon.com/iot/latest/developerguide/iot-gs.html)
* [teslajs npm package](https://github.com/mseminatore/TeslaJS)
* [Some terribly incomplete Tesla API docs](https://tesla-api.timdorr.com)
