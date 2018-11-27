const lambda = require('./index');

lambda.handler({
  "serialNumber": "GXXXXXXXXXXXXXXXXX",
  "batteryVoltage": "xxmV",
  "clickType": "SINGLE"
});

// Documentation from the iot-button-email Lambda function blueprint:

/**
 * The following JSON template shows what is sent as the payload:
 * {
 *   "serialNumber": "GXXXXXXXXXXXXXXXXX",
 *   "batteryVoltage": "xxmV",
 *   "clickType": "SINGLE" | "DOUBLE" | "LONG"
 * }
 *
 * A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 * "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 */
