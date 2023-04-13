<script lang="ts">
	import { browser } from '$app/environment';
	import PowerRange from '../lib/PowerRange.svelte';
	import { onMount } from 'svelte';
	import mqtt_client from 'u8-mqtt/esm/node/index.js';

	const label = browser && /ru/.test(window.navigator.language) ? 'Мощность' : 'Power';
	const my_mqtt = mqtt_client();

	function onPowerChange({ detail }: CustomEvent<ComponentEvent>) {
		my_mqtt.json_send('svelte/power/range', { value: detail.payload });
	}

	$: value = 25;

	onMount(async () => {
		my_mqtt.with_websock('wss://test.mosquitto.org:8081').with_autoreconnect();

		await my_mqtt.connect();

		my_mqtt.subscribe_topic('svelte/power/range', (pkt: { json: () => { value: number } }) => {
			const msg = pkt.json();

			if (value != msg.value) {
				value = msg.value;
			}
		});
	});
</script>

<svelte:head>
	<title>Power Range</title>
</svelte:head>

<PowerRange {value} {label} on:change={onPowerChange} />
