import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

// Vercel Web Analytics: counts page views and daily visitors without cookies. Nothing is sent from the dev server.
injectAnalytics({ mode: dev ? 'development' : 'production' });
