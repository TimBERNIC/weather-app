import { beforeEach, describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import { goto } from '$app/navigation';
import Page from './+page.svelte';
import { vi } from 'vitest';

describe('gotToWeather', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});
	vi.mock('$app/navigation', () => ({
		goto: vi.fn()
	}));

	it('should redirect to weather page if city is valid', async () => {
		const { getByRole } = render(Page);

		const input = getByRole('textbox');
		const button = getByRole('button', { name: /voir la météo/i });

		await fireEvent.input(input as unknown as HTMLInputElement, { target: { value: 'Paris' } });
		await fireEvent.click(button as unknown as HTMLButtonElement);

		expect(goto).toHaveBeenCalledWith('/weather?city=Paris');
	});

	it('should encode correctly if the input has spaces', async () => {
		const { getAllByRole } = render(Page);
		const input = getAllByRole('textbox')[0] as unknown as HTMLInputElement;

		const button = getAllByRole('button', {
			name: /voir la météo/i
		})[0] as unknown as HTMLButtonElement;

		await fireEvent.input(input, { target: { value: 'New York' } });
		await fireEvent.click(button);

		expect(goto).toHaveBeenCalledWith('/weather?city=New%20York');
	});
});
