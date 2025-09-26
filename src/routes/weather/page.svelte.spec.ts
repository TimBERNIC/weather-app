import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import WeatherPage from './+page.svelte';

describe('WeatherPage', () => {
	it('should render without crashing', () => {
		const { container } = render(WeatherPage);

		expect(container).toBeTruthy();
	});
	it('should show loading state initially', () => {
		const { getAllByText } = render(WeatherPage);

		expect(getAllByText('Chargement des données météo...')[0]).toBeTruthy();
	});
});
