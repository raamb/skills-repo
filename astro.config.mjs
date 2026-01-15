import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://raamb.github.io',
  base: '/skills-repo',
  integrations: [react()],
  output: 'static',
  image: {
    service: { entrypoint: 'astro/assets/services/noop' }
  }
});
