<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} {$page.error?.message}</title>
</svelte:head>

<section>
	<h1>
		{$page.status}
		{$page.error?.message}
	</h1>

	<p><a href="/">Go to home page</a></p>
</section>

<style>
	section {
		display: grid;
		place-content: center;
		place-items: center;
	}
</style>
