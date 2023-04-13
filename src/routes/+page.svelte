<script lang="ts">
	import { browser } from '$app/environment';
	import PowerRange from '../lib/PowerRange.svelte';
	import { onMount, onDestroy } from 'svelte';
	import mqtt, { MqttClient } from 'mqtt/dist/mqtt';

	const label = browser && /ru/.test(window.navigator.language) ? 'Мощность' : 'Power';

	let client: MqttClient;
	const brokerUrl = 'wss://test.mosquitto.org:8081';
	const topic = 'svelte/power/range';

	function onPowerChange({ detail }: CustomEvent<ComponentEvent>) {
		client && client.publish(topic, `${detail.payload}`);
	}

	$: value = 25;

	onMount(async () => {
		client = mqtt.connect(brokerUrl);

		client.on('connect', function () {
			client.subscribe(topic);
		});

		client.on('message', function (_, message) {
			const msg = Number(message.toString());
			if (!isNaN(msg) && value !== msg) {
				value = msg;
			}
		});
	});

	onDestroy(() => {
		client && client.end();
	});
</script>

<svelte:head>
	<title>Power Range</title>
</svelte:head>

<PowerRange {value} {label} on:change={onPowerChange} />
