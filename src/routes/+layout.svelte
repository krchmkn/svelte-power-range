<script>
	import '../app.css';
</script>

<div class="container">
	<main>
		<slot />
	</main>

	<footer>
		<a href="https://kda.name" target="_blank">kda.name</a>
	</footer>
</div>

<style>
	.container {
		display: grid;
		grid-template-rows: 1fr auto;
		height: 100vh;
	}

	main,
	footer {
		display: grid;
		place-content: center;
		padding: 1rem;
	}

	footer {
		font-size: 0.8rem;
	}
</style>
