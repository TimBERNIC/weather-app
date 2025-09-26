<script lang="ts">
	import { goto } from '$app/navigation';
	import WeatherEffect from '$lib/components/WeatherEffect/+page.svelte';

	let city = $state<string>('');

	const goToWeather = () => {
		if (!city || !city.trim()) return;

		const encodedCity = encodeURIComponent(city.trim());
		goto(`/weather?city=${encodedCity}`);
	};
</script>

<!-- Background avec dégradé -->

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 p-4"
>
	<div class="w-full max-w-md">
		<!-- Carte principale -->
		<div class="rounded-2xl bg-white/10 p-8 text-center text-white backdrop-blur-sm">
			<!-- Logo/Titre -->
			<div class="mb-8">
				<div class="mb-4 text-6xl">🌤️</div>
				<h1 class="mb-2 text-3xl font-bold">Weather App</h1>
				<p class="text-lg opacity-90">Découvrez la météo en temps réel</p>
			</div>

			<!-- Formulaire de recherche -->
			<div class="mb-6">
				<input
					type="text"
					bind:value={city}
					placeholder="Entrez une ville (ex: Paris, London...)"
					class="w-full rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-white/70 backdrop-blur-sm focus:border-white/50 focus:outline-none"
					onkeydown={(e) => e.key === 'Enter' && goToWeather()}
				/>
			</div>

			<!-- Bouton -->
			<button
				onclick={goToWeather}
				class="w-full rounded-lg bg-white/20 px-6 py-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={!city.trim()}
			>
				Voir la météo
			</button>

			<!-- Villes populaires -->
			<div class="mt-8">
				<p class="mb-4 text-sm opacity-90">Villes populaires :</p>
				<div class="flex flex-wrap justify-center gap-2">
					{#each ['Paris', 'London', 'Tokyo', 'New York', 'Sidney'] as popularCity}
						<button
							onclick={() => {
								city = popularCity;
								goToWeather();
							}}
							class="rounded-full bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm transition-all hover:bg-white/30"
						>
							{popularCity}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Footer -->
		<div class="mt-8 text-center text-white/70">
			<p class="text-sm">Données météo fournies par wttr.in</p>
		</div>
	</div>
</div>
