declare module 'u8-mqtt/esm/node/index.js';

interface ComponentEvent {
	[key: string]: { payload: string | number | boolean };
}

declare module 'mqtt/dist/mqtt' {
	import MQTT from 'mqtt';
	export = MQTT;
}
