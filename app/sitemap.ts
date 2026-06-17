import type { MetadataRoute } from 'next';

const BASE_URL = 'https://impulsia.studio';

// Update this date whenever the content of the corresponding page changes.
const LAST_MODIFIED: Record<string, string> = {
  '/': '2026-06-17',
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: LAST_MODIFIED['/'],
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
