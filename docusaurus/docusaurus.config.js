module.exports = {
  title: "electrode OSS",
  tagline:
    "Quickly build React/Node.js applications with an emphasis on performance, component reusability, and simple deployment.",
  url: "https://www.electrode.io",
  baseUrl: "/electrode/",
  favicon: "/img/electrode-logo.svg",
  organizationName: "electrode-io", // Usually your GitHub org/user name.
  projectName: "electrode", // Usually your repo name.
  githubHost: "https://github.com/electrode-io/electrode/tree/master/docusaurus",
  plugins: ["docusaurus-lunr-search"],
  themeConfig: {
    navbar: {
      title: "electrode OSS",
      logo: {
        alt: "electrode logo",
        src: "/img/electrode-io-logo.png"
      },
      links: [
        {
          to: "docs/getting-started",
          label: "Getting Started",
          position: "left"
        },
        {
          href: "https://github.com/electrode-io/electrode/",
          label: "GitHub",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [{}]
        },
        {
          title: "Community",
          items: [{}]
        },
        {
          title: "More",
          items: [{}]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Walmart`
    }
  },
  themes: ["@docusaurus/theme-live-codeblock"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: "introduction",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/electrode-io/electrode/tree/master/docusaurus/docs"
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      }
    ]
  ]
};
