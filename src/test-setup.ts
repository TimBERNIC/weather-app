import { vi } from 'vitest';

vi.mock('$app/navigation', () => ({
	goto: vi.fn(),
	invalidateAll: vi.fn(),
	invalidate: vi.fn(),
	preloadData: vi.fn(),
	preloadCode: vi.fn()
}));

vi.mock('$app/state', () => ({
	page: {
		url: new URL('http://localhost:3000/')
	}
}));
