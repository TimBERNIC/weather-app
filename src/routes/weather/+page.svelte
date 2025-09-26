<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import type { CurrentCondition, WeatherDay } from '$lib/types/weaher';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import WeatherEffect from '$lib/components/WeatherEffect/+page.svelte';

	const city =
		page.url?.searchParams?.get('city')?.charAt(0).toUpperCase() +
		page.url?.searchParams?.get('city')?.slice(1).toLowerCase();

	let currentConditionData = $state<CurrentCondition | null>(null);
	let weatherDaysData = $state<WeatherDay[]>([]);
	let currentDay = $state<string>('');
	let isLoading = $state(true);
	let weatherType = $state<string>('default');

	onMount(async () => {
		const today = new Date();
		currentDay = today.toLocaleDateString('fr-FR', {
			weekday: 'long',
			month: 'long',
			day: 'numeric'
		});

		try {
			const response = await axios.get(`https://wttr.in/${city}?format=j1`);
			currentConditionData = response.data.current_condition[0];
			weatherDaysData = response.data.weather.slice(0, 7); // 7 prochains jours

			// Déterminer le type de météo pour l'effet visuel
			const description = currentConditionData?.lang_fr[0].value.toLowerCase();
			if (
				description?.includes('ensoleillé') ||
				description?.includes('clair') ||
				description?.includes('soleil')
			) {
				weatherType = 'sunny';
			} else if (
				description?.includes('nuageux') ||
				description?.includes('couvert') ||
				description?.includes('nuage')
			) {
				weatherType = 'cloudy';
			} else if (
				description?.includes('pluie') ||
				description?.includes('averse') ||
				description?.includes('drizzle')
			) {
				weatherType = 'rainy';
			} else if (description?.includes('orage') || description?.includes('thunder')) {
				weatherType = 'stormy';
			} else if (description?.includes('neige') || description?.includes('snow')) {
				weatherType = 'snowy';
			} else {
				weatherType = 'default';
			}
		} catch (error) {
			console.error('Erreur API:', error);
		} finally {
			isLoading = false;
		}
	});

	const getNextDays = () => {
		const nextDays = [];
		const today = new Date();

		for (let i = 0; i < 8; i++) {
			const nextDay = new Date(today);
			nextDay.setDate(today.getDate() + i);

			nextDays.push(
				nextDay.toLocaleDateString('fr-FR', {
					weekday: 'long',
					month: 'long',
					day: 'numeric'
				})
			);
		}
		return nextDays;
	};
</script>

<div
	class="relative min-h-screen overflow-hidden p-4 transition-all duration-1000 {weatherType ===
	'sunny'
		? 'bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500'
		: weatherType === 'cloudy'
			? 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600'
			: weatherType === 'rainy'
				? 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800'
				: weatherType === 'stormy'
					? 'bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800'
					: weatherType === 'snowy'
						? 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400'
						: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600'}"
>
	<!-- Effets visuels selon la météo -->
	<WeatherEffect bind:weatherType />

	<div class="relative z-10 mx-auto max-w-6xl">
		<div class="mb-8 flex items-center justify-between">
			<button
				onclick={() => goto('/')}
				class="rounded-lg bg-white/20 px-4 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/30"
			>
				← Retour
			</button>
			<button
				onclick={() => goto('/')}
				class="rounded-lg bg-white/20 px-4 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/30"
			>
				Changer de ville
			</button>
		</div>

		{#if isLoading}
			<!-- État de chargement -->
			<div class="flex min-h-[400px] w-full items-center justify-center">
				<div class="w-full items-center justify-center text-center text-white">
					<div
						class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white"
					></div>
					<p class="text-xl">Chargement des données météo...</p>
				</div>
			</div>
		{:else if currentConditionData}
			<!-- Ville et date -->
			<div class="mb-8 text-center text-white">
				<h1 class="mb-2 text-4xl font-bold">{city}</h1>
				<p class="text-xl opacity-90">{currentDay}</p>
			</div>

			<!-- Carte météo principale -->
			<div class="mb-8 rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
				<div
					class="flex flex-col items-center text-center text-white lg:flex-col lg:items-center lg:justify-between"
				>
					<!-- Température principale -->
					<div class="mb-6 flex flex-col items-center justify-center lg:mb-0">
						<div class="mb-4 flex items-center justify-center">
							{#if currentConditionData.weatherIconUrl[0].value && currentConditionData.weatherIconUrl[0].value !== ''}
								<img
									src={currentConditionData.weatherIconUrl[0].value}
									alt="Weather icon"
									class="h-24 w-24"
								/>
							{/if}
						</div>
						<div class="text-6xl font-bold">{currentConditionData.temp_C}°</div>
						<div class="text-xl opacity-90">Ressenti {currentConditionData.FeelsLikeC}°C</div>
					</div>

					<!-- Description -->
					<div class="text-center lg:text-right">
						<p class="mt-4 text-center text-3xl font-bold">Conditions actuelles</p>
						<h2 class="mb-2 text-center text-2xl font-semibold">
							{currentConditionData.lang_fr[0].value}
						</h2>
					</div>
				</div>
			</div>

			<!-- Détails météo en grille -->
			<div class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
				<div class="rounded-xl bg-white/10 p-4 text-center text-white backdrop-blur-sm">
					<div class="text-sm opacity-90">Humidité</div>
					<div class="text-2xl font-bold">{currentConditionData.humidity}%</div>
				</div>
				<div class="rounded-xl bg-white/10 p-4 text-center text-white backdrop-blur-sm">
					<div class="text-sm opacity-90">Pression</div>
					<div class="text-2xl font-bold">{currentConditionData.pressure} hPa</div>
				</div>
				<div class="rounded-xl bg-white/10 p-4 text-center text-white backdrop-blur-sm">
					<div class="text-sm opacity-90">Visibilité</div>
					<div class="text-2xl font-bold">{currentConditionData.visibility} km</div>
				</div>
				<div class="rounded-xl bg-white/10 p-4 text-center text-white backdrop-blur-sm">
					<div class="text-sm opacity-90">Vent</div>
					<div class="text-2xl font-bold">{currentConditionData.windspeedKmph} km/h</div>
				</div>
			</div>

			<!-- Prévisions horaires -->
			<div
				class="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-6 backdrop-blur-sm"
			>
				<h2 class="mb-6 text-center text-2xl font-bold text-white">Prévisions de la semaine</h2>

				<div class="flex w-full flex-col items-center justify-center gap-4">
					{#each weatherDaysData as day, index}
						<div
							class="flex h-[180px] w-full flex-col items-center justify-center rounded-lg bg-white/20 p-4 text-center text-white backdrop-blur-sm"
						>
							<div class="mb-2 text-sm font-medium">
								{getNextDays()[index]}
							</div>
							{#if day.hourly[0]?.weatherIconUrl[0]?.value}
								<img
									src={day.hourly[0].weatherIconUrl[0].value}
									alt="Weather icon"
									class="mx-auto mb-2 h-12 w-12"
								/>
							{:else}
								<!-- Icône par défaut si pas d'image -->
								<div class="mx-auto mb-2 text-4xl">🌤️</div>
							{/if}
							<div class="mb-1 text-lg font-bold">{day.avgtempC}°C</div>
							<div class="mb-1 text-xs opacity-90">
								Max: {day.maxtempC}°C | Min: {day.mintempC}°C
							</div>
							<div class="text-xs opacity-80">{day.hourly[0]?.lang_fr[0]?.value}</div>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<!-- État d'erreur -->
			<div class="flex min-h-[400px] items-center justify-center">
				<div class="text-center text-white">
					<div class="mb-4 text-6xl">⚠️</div>
					<p class="text-xl">Impossible de charger les données météo</p>
					<button
						onclick={() => goto('/')}
						class="mt-4 rounded-lg bg-white/20 px-6 py-2 backdrop-blur-sm transition-all hover:bg-white/30"
					>
						Retour à l'accueil
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>
