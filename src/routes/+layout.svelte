<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Weather app</title>
</svelte:head>
{@render children?.()}
