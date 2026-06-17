import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General crawlers: allow everything except internal API routes.
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // AI search crawlers: explicit allow so they index public content.
      {
        userAgent: [
          'GPTBot',          // OpenAI (ChatGPT browsing + training)
          'OAI-SearchBot',   // OpenAI Search
          'ChatGPT-User',    // ChatGPT live browsing
          'PerplexityBot',   // Perplexity AI
          'ClaudeBot',       // Anthropic / Claude
          'anthropic-ai',    // Anthropic crawler
          'Google-Extended', // Google AI Overviews / Gemini
          'Bingbot',         // Bing / Microsoft Copilot
          'GoogleOther',     // Google secondary crawler
        ],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://impulsia.studio/sitemap.xml',
  };
}
