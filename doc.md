## Softphone Functionality Overview

### Device Registration and Status

- **Display Register & Device Status:** The Softphone should continuously display and update the registration and device status.
  - **Device Permissions:** Before creating the device, it is essential to request device permissions as per best practices. For more details, refer to [Working with Microphones and getUserMedia](https://www.twilio.com/docs/voice/sdks/javascript/best-practices#working-with-microphones-and-getusermedia).
  - **Input Devices:** Display a list of available input devices, focusing on microphones to ensure proper voice input.
  - **AccessTokens Management:** Keep AccessTokens up to date to maintain seamless communication. See [Keep AccessTokens Up to Date](https://www.twilio.com/docs/voice/sdks/javascript/best-practices#keep-accesstokens-up-to-date) for guidance.

### Core Functions

- **Register a Device:** Initial setup for device registration to enable communication services.
- **Make a Call:** Outgoing call functionality with comprehensive call management options.
- **Receive a Call:** Handle incoming calls effectively, providing users with the option to answer.
- **Display Call Status:** Real-time updates on the current status of the call, including connecting, active, and disconnected states.
- **Hang Up Current Call:** Offer a straightforward method for users to terminate an ongoing call.
- **Mute/Unmute Current Call:** Enable users to mute their microphone during a call and unmute it when needed.

### Error Handling

- **Display and Handle Errors Gracefully:** Ensure that all potential errors are not only displayed to the user but also handled in a way that minimizes disruption in the communication experience.

## Softphone Context: Device Object

The Device Object is a central component of the Softphone, enabling seamless communication functionality through various methods, event handling, and properties.

### Initialization

To begin using the Device Object:

- **Initiate with an Identity and Fetch a New Token:** Begin the initialization process by providing an identity. Additionally, configure the device with the following options:
  - `logLevel` (boolean): Specifies the verbosity of the log output.
  - `codecPreferences` (string[]): Determines the preferred audio codecs.
  - `edge` (string[]): Defines the network edge locations.
  - `closeProtection` (boolean): Enables or disables close protection.
  - `enableImprovedSignalingErrorPrecision` (boolean): Improves the precision of signaling errors.
  - `tokenRefreshMs` (number): Sets the interval for token refresh in milliseconds.

### Core Methods

- `.register()`: Registers the device to receive incoming calls. This action emits a `registered` event. Note that outgoing calls do not require device registration.
- `.unregister()`: Unregisters the device, preventing it from receiving incoming calls, and emits an `unregistered` event.
- `.connect()`: Initiates a call from the device.
- `.destroy()`: Disconnects the device and all associated calls. This process cleans all event listeners attached to the device and emits `unregistered` and `destroyed` events.
- `.disconnectAll()`: Disconnects all active calls, aiding in a global hang-up functionality.
- `.on` and `.off`: Attach or detach event listeners to the device for custom event handling.
- `.updateToken()`: Updates the device's token for authentication purposes. More information can be found [here](https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#deviceupdatetokentoken).

### Events

The Device Object supports a range of events to handle real-time updates and changes:

- `destroyed`, `error`, `incoming`, `registered`, `registering`, `tokenWillExpire`, `unregistered`.
- For detailed event information, including error handling, refer to the [Device Events documentation](https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#error-event).

### Accessors

Accessors provide read-only access to the device's state and configuration:

- `identity`: The current AccessToken's associated identity string.
- `isBusy`: Boolean value indicating if the device is on an active call.
- `state`: The device's current state, with possible values including 'unregistered', 'registering', 'registered', and 'destroyed'.
- Additional accessors include `token`, `audio`, `calls`, `edge`, and `home`.

### Static Accessors

- `isSupported`: Boolean indicating if the current browser supports the SDK.

### Error Handling

Comprehensive error handling is crucial for robust application behavior. Detailed information on managing signaling errors is available [here](https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#improved-signaling-errors).

## Call Object

The Call Object represents an individual call, encapsulating the methods, events, properties, and accessors needed to manage call behavior and state effectively.

### Methods

- `.status()`: Returns the current status of the Call instance. Possible values include:
  - `closed`: The media session has been disconnected.
  - `connecting`: Setting up the media session post-acceptance or initiation.
  - `open`: The media session is established.
  - `pending`: An incoming call that hasn't been accepted yet.
  - `reconnecting`: Reconnection triggered after an ICE connection disruption.
  - `ringing`: The callee has been notified but hasn't responded.
- `.accept()`: Accepts an incoming call. The call status transitions to 'connecting' and then to 'open'.
- `.disconnect()`: Closes the media session associated with the call.
- `.reject()`: Rejects an incoming call, effectively hanging up on the caller.
- `.ignore()`: Ignores an incoming call without sending a hangup message. The caller continues to hear ringing until the call is accepted by another device or times out.
- `.isMuted()`: Checks if the call's input audio is muted.
- `.mute(shouldMute?)`: Mutes or unmutes the call's input audio.
- `.sendDigits(digits)`: Sends DTMF tones during the call.
- `.sendMessage(message)`: Sends a message to the server-side application.
- **Feature Implementation**: Implement a feedback mechanism for call quality, as detailed [here](https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#callpostfeedbackscore-issue).

### Events

The Call Object emits various events to indicate changes in state or to report activities:

- `accept`, `cancel`, `disconnect`, `error`, `messageReceived`, `messageSent`, `mute`, `reconnected`, `reconnecting`, `reject`, `ringing`, `sample`, `volume`, `warning`, `warning-cleared`.
- These events cover a range of activities from accepting calls, handling disconnections, to reporting call quality warnings and clearing them.

### Properties

- `customParameters`: Returns a Map of custom parameters passed in the `ConnectOptions.params` when initiating a call.
- `parameters`: Provides call parameters received from Twilio, such as `From`, `CallSid`, `To`, and `AccountSid`. These vary between incoming and outgoing calls.

### Accessors

- `codec`: Identifies the audio codec used in the call's RTCPeerConnection.
- `direction`: Indicates whether the call is incoming or outgoing, providing context for call handling and user interface indications.

## Project Requirements

Ensure all necessary tools and packages are installed and prepared for the Softphone project development.

### Setup Twilio

Follow the steps outlined in the Twilio documentation to properly set up your environment for Twilio integration:

- **[Twilio Quickstart Guide](https://www.twilio.com/docs/voice/sdks/javascript/get-started#serverless-quickstart)**
  - Install Twilio CLI.
  - Install Twilio Serverless Plugin.

### Create and Prepare a Softphone NPM Package

Set up the NPM package with the required dependencies for Softphone development:

- **Dependencies:**
  - React
  - @twilio/voice-sdk
  - Material UI or native styles

### Unformatted

<details>
  <summary>Click to expand!</summary>

- What Softphone should do:

  - Display register & device status (with updates)
    . Asking for device permissions before creating the device (https://www.twilio.com/docs/voice/sdks/javascript/best-practices#working-with-microphones-and-getusermedia)
    . Display available input devices (microphones).
    . Keep AccessTokens up to date (https://www.twilio.com/docs/voice/sdks/javascript/best-practices#keep-accesstokens-up-to-date)

  - Register a device

  - Make a call

  - Receive a call

  - Display call status

  - Hang up current call

  - Mute(Un-mute) current call

  - Display and handle errors gracefully

- Softphone Context:

  - Device object

    - Initiate using an identity and fetch a new token (pass options like debug and edge location)

      - Options:
        .logLevel: boolean
        .codecPreferences: string[]
        .edge: string[]
        .closeProtection: boolean
        .enableImprovedSignalingErrorPrecision: boolean
        .tokenRefreshMs: number

    - .register() register the device and allow it to receive incoming calls
      - registered event will be emitted
      - Note: It's not necessary to call device.register() in order to make outgoing calls
    - .unregister() unregister the device and prevent it from receiving incoming calls
      - unregistered event will be emitted
    - .connect() to make a call
    - .destroy() to disconnect the device and all calls,
      - unregistered event will be emitted
      - destroyed event will be emitted
      - clean all event listeners attached to the device
    - .disconnectAll() to disconnect all calls (for hang up)
    - .on and .off to attach and detach event listeners
    - .updateToken() to update the token. Important info (https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#deviceupdatetokentoken)
    - rest of methods in (https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#methods)

    - Events list

      - destroyed
      - error [twilioError, call] (https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#error-event)
      - incoming [call]
      - registered
      - registering
      - tokenWillExpire (https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#tokenwillexpire-event)
      - unregistered

    - Accessors

      - identity Returns the identity string that is associated with the Device instance's current AccessToken.
      - isBusy Returns a Boolean for whether the Device instance is currently on an active Call
      - state Returns the state of the Device instance. Possible values are ['unregistered', 'registering', 'registered', 'destroyed']
      - token
      - audio
      - calls
      - edge
      - home

    - Static accessors

      - isSupported Returns a Boolean for whether or not this SDK is supported by the current browser

    - Errors (https://www.twilio.com/docs/voice/sdks/javascript/twiliodevice#improved-signaling-errors)

  - Call Object

    - Methods

      - .status() Return the status of the Call instance. Possible values are
      - closed, -> The media session associated with the call has been disconnected.
      - connecting, -> The call was accepted by or initiated by the local Device instance and the media session is being set up.
      - open, -> The media session associated with the call has been established.
      - pending, -> The call is incoming and hasn't yet been accepted.
      - reconnecting, -> The ICE connection was disconnected and a reconnection has been triggered.
      - ringing -> The callee has been notified of the call but has not yet responded.
      - .accept() to accept an incoming call
      - call.status() will be 'connecting' while the media session for the Call instance is being set up.
      - call.status() will be 'open' once the media session has been established.
      - .disconnect() close the media session associated with the Call instance
      - .reject() this will cause a hangup to be issued to the dialing party.
      - .ignore() to ignore an incoming call
      - call.status() will be 'closed' once the Call instance has been ignored.
      - This method will not send a hangup message to the dialing party.
      - The dialing party will continue to hear ringing until another Device instance with the same identity accepts the Call or if the Call times out.
      - .isMuted() Returns a Boolean indicating whether the input audio of the local Device instance is muted.
      - .call.mute(shouldMute?)
      - .sendDigits(digits) to send DTMF tones
      - .sendMessage(message) to send a message to the server-side application
      - !(Feature) Implement a feedback mechanism for the call quality using (https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#callpostfeedbackscore-issue)

    - Events list

      - accept[call] -> Emitted when an incoming Call is accepted. For outgoing calls, the'accept' event is emitted when the media session for the call has finished being set up.
      - cancel -> Emitted when the Call instance has been canceled and the call.status() has transitioned to 'closed'.
        Two ways to cancel
        - 1. Invoking call.ignore() on an incoming call
        - 2. Invoking call.disconnect() on an outgoing call before the recipient has answered.
      - disconnect[call] -> Emitted when the media session associated with the Call instance is disconnected.
      - error[twilioError] -> Emitted when the Call instance receives an error (https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#error-event)
      - messageReceived[message] -> Emitted when the Call instance receives a message sent from the server-side application. (https://www.twilio.com/docs/voice/sdks/call-message-events)
      - messageSent[message] -> Emitted when the Call instance sends a message to the server-side application using the call.sendMessage() method. (https://www.twilio.com/docs/voice/sdks/call-message-events)
      - mute[isMuted, call] -> Emitted when the input audio associated with the Call instance is muted or unmuted.
      - reconnected -> Emitted when the Call instance has regained media and/or signaling connectivity.
      - reconnecting[twilioError] -> Emitted when the Call instance has lost media and/or signaling connectivity and is reconnecting.
      - reject -> Emitted when call.reject() was invoked and the call.status() is closed.
      - ringing[hasEarlyMedia] -> Emitted when the Call has entered the ringing state. (https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#ringing-event)
      - sample[sample] -> Emitted when the Call instance receives a WebRTC sample object. This event is published every second
      - volume[inputVolume, outputVolume] -> Emitted every 50 milliseconds with the current input and output volumes on every animation frame.
        - Note: You may want to use this to display volume levels in the browser.
      - warning[warningName, warningData] -> Emitted when a call quality metric has crossed a threshold. (https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#warning-event)
        - Note: This event is raised when the SDK detects a drop in call quality or other conditions that may indicate the user is having trouble with the call. You can implement callbacks on these events to alert the user of an issue.
      - warning-cleared[warningName] -> Emitted when a call quality metric has returned to normal.

    - Properties

      - customParameters -> Returns a Map object containing the custom parameters that were passed in the ConnectOptions.params property when invoking device.connect(). (https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#callcustomparameters)
      - parameters -> Returns the Call parameters received from Twilio (https://www.twilio.com/docs/voice/sdks/javascript/twiliocall#callparameters)
        - For incoming calls, the call.parameters may look like this:
          {
          From: "+15554448888",
          CallSid: "CAxxxx...",
          To: "client:YourDeviceIdentity",
          AccountSid: "ACxxxx..."
          }
        - For outgoing calls, the call may not yet have a CallSID. You can find the CallSID by waiting until the Twilio.Call instance has emitted the 'accept' event.
          call.parameters will be in accept event

    - Accessors
      - codec -> Returns the audio codec used for the RTCPeerConnection associated with the Call instance.
      - direction -> Returns the directionality of the Call instance. Possible values are "INCOMING" and "OUTGOING".
        - An incoming call is one that is directed towards your Device instance.
        - An outgoing call is one that is made by invoking device.connect().

- Project requirements:
  - Setup twilio(https://www.twilio.com/docs/voice/sdks/javascript/get-started#serverless-quickstart)
    - Install twilio cli
    - Install twilio serverless plugin
  - Create and prepare a Softphone npm package
    - Dependencies: react, @twilio/voice-sdk, material UI or native styles

</details>
