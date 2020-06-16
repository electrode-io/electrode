export default {
  "plugins": [
    "docusaurus-lunr-search"
  ],
  "themes": [
    "@docusaurus/theme-live-codeblock"
  ],
  "customFields": {},
  "themeConfig": {
    "navbar": {
      "title": "electrode OSS",
      "logo": {
        "alt": "electrode logo",
        "src": "img/electrode-logo.svg"
      },
      "links": [
        {
          "to": "docs/getting-started",
          "label": "docs",
          "position": "left"
        },
        {
          "href": "https://github.com/electrode-io/electrode/",
          "label": "GitHub",
          "position": "right"
        }
      ]
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "Docs",
          "items": [
            {}
          ]
        },
        {
          "title": "Community",
          "items": [
            {}
          ]
        },
        {
          "title": "More",
          "items": [
            {}
          ]
        }
      ],
      "copyright": "Copyright © 2020 electrode OSS - GTP - Walmart"
    }
  },
  "title": "electrode OSS",
  "tagline": "Quickly build React/Node.js applications with an emphasis on performance, component reusability, and simple deployment.",
  "url": "https://your-docusaurus-test-site.com",
  "baseUrl": "/",
  "favicon": "img/electrode-logo.png",
  "organizationName": "GTP.js",
  "projectName": "OSS",
  "githubHost": "https://github.com/electrode-io/electrode/tree/master/docs",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "homePageId": "introduction",
          "sidebarPath": "/Users/vn0ew5m/Documents/GitHub/electrode/docs/sidebars.js",
          "editUrl": "https://github.com/electrode-io/electrode/tree/master/docs"
        },
        "blog": {
          "showReadingTime": true,
          "editUrl": "https://github.com/electrode-io/electrode/tree/master/docs"
        },
        "theme": {
          "customCss": "/Users/vn0ew5m/Documents/GitHub/electrode/docs/src/css/custom.css"
        }
      }
    ]
  ]
};