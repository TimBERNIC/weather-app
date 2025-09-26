<script lang="ts">
	let { weatherType = $bindable() } = $props();
</script>

{#if weatherType === 'sunny'}
	<!-- Soleils multiples centrés -->
	<div class="cloud absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-9xl">
		☀️
	</div>
	<div
		class="cloud absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 transform text-7xl"
		style="animation-delay: -2s;"
	>
		☀️
	</div>
	<div
		class="cloud absolute top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 transform text-6xl"
		style="animation-delay: -4s;"
	>
		☀️
	</div>
	<div
		class="cloud absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 transform text-5xl"
		style="animation-delay: -1s;"
	>
		☀️
	</div>
	<div
		class="cloud absolute top-2/3 left-1/3 -translate-x-1/2 -translate-y-1/2 transform text-6xl"
		style="animation-delay: -3s;"
	>
		☀️
	</div>
{:else if weatherType === 'cloudy'}
	<!-- Nuages multiples centrés -->
	<div class="cloud absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-8xl">
		☁️
	</div>
	<div
		class="cloud absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 transform text-6xl"
		style="animation-delay: -3s;"
	>
		☁️
	</div>
	<div
		class="cloud absolute top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 transform text-5xl"
		style="animation-delay: -1s;"
	>
		☁️
	</div>
	<div
		class="cloud absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 transform text-4xl"
		style="animation-delay: -2s;"
	>
		☁️
	</div>
	<div
		class="cloud absolute top-2/3 left-1/3 -translate-x-1/2 -translate-y-1/2 transform text-5xl"
		style="animation-delay: -4s;"
	>
		☁️
	</div>
	<div
		class="cloud absolute top-1/6 left-1/6 -translate-x-1/2 -translate-y-1/2 transform text-3xl"
		style="animation-delay: -0.5s;"
	>
		☁️
	</div>
{:else if weatherType === 'rainy'}
	<!-- Pluie -->
	{#each Array(20) as _, i}
		<div
			class="rain"
			style="left: {Math.random() * 100}%; animation-delay: {Math.random() *
				2}s; animation-duration: {0.5 + Math.random() * 1}s;"
		></div>
	{/each}
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-8xl">
		🌧️
	</div>
	<div class="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 transform text-6xl">
		🌧️
	</div>
	<div class="absolute top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 transform text-5xl">
		🌧️
	</div>
{:else if weatherType === 'stormy'}
	<!-- Orage -->
	<div class="lightning"></div>
	{#each Array(15) as _, i}
		<div
			class="rain"
			style="left: {Math.random() * 100}%; animation-delay: {Math.random() *
				2}s; animation-duration: {0.3 + Math.random() * 0.7}s;"
		></div>
	{/each}
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-8xl">
		⛈️
	</div>
	<div class="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 transform text-6xl">
		⛈️
	</div>
	<div class="absolute top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 transform text-5xl">
		⛈️
	</div>
{:else if weatherType === 'snowy'}
	<!-- Neige -->
	{#each Array(30) as _, i}
		<div
			class="snow"
			style="left: {Math.random() * 100}%; animation-delay: {Math.random() *
				3}s; animation-duration: {2 + Math.random() * 2}s;"
		></div>
	{/each}
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-8xl">
		❄️
	</div>
	<div class="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 transform text-6xl">
		❄️
	</div>
	<div class="absolute top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 transform text-5xl">
		❄️
	</div>
	<div class="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 transform text-4xl">
		❄️
	</div>
	<div class="absolute top-2/3 left-1/3 -translate-x-1/2 -translate-y-1/2 transform text-5xl">
		❄️
	</div>
{/if}

<style>
	/* Animations pour les effets météo */
	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	@keyframes rain {
		0% {
			transform: translateY(-100vh);
		}
		100% {
			transform: translateY(100vh);
		}
	}

	@keyframes snow {
		0% {
			transform: translateY(-100vh) rotate(0deg);
		}
		100% {
			transform: translateY(100vh) rotate(360deg);
		}
	}

	@keyframes lightning {
		0%,
		90%,
		100% {
			opacity: 0;
		}
		5%,
		10% {
			opacity: 0.5;
		}
	}

	.cloud {
		animation: float 6s ease-in-out infinite;
	}

	.rain {
		position: absolute;
		width: 2px;
		height: 20px;
		background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.6));
		animation: rain 1s linear infinite;
	}

	.snow {
		position: absolute;
		width: 4px;
		height: 4px;
		background: white;
		border-radius: 50%;
		animation: snow 3s linear infinite;
	}

	.lightning {
		position: absolute;
		width: 100%;
		height: 100%;
		background: white;
		opacity: 0;
		animation: lightning 4s infinite;
	}
</style>
