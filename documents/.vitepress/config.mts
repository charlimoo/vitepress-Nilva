import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "نیلوا",
  description: "مستندات",
  lang: 'fa-IR',
  dir: 'rtl',
  head: [
    // Preconnect to Google's font servers for better performance
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    // The link to the Vazirmatn font stylesheet
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap',
        rel: 'stylesheet'
      }
    ]
  ],
  themeConfig: {
    nav: [
      { text: 'خانه', link: '/' },
    ],
    sidebar
  }
})
