import { vi } from 'vitest';
import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.stubGlobal('import', {
  meta: {
    env: {
      VITE_API_URL: 'https://mocked-api.local',
    },
  },
});

vi.mock('@/config', () => ({
  config: {
    apiURL: 'https://mocked-api.local',
  },
}));

vi.spyOn(console, 'warn').mockImplementation((message) => {
  if (
    message.includes('v7_startTransition') ||
    message.includes('v7_relativeSplatPath')
  ) {
    return;
  }
  console.warn(message);
});