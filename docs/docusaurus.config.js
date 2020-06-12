module.exports = {
  title: 'electrode OSS',
  tagline: 'Quickly build React/Node.js applications with an emphasis on performance, component reusability, and simple deployment.',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'GTP.js', // Usually your GitHub org/user name.
  projectName: 'OSS', // Usually your repo name.
  githubHost: 'https://github.com/electrode-io/electrode/tree/master/docs',
  favicon: 'img/electrode-logo.png',
  plugins: [
    'docusaurus-lunr-search'
  ],
  themeConfig: {
    navbar: {
      title: 'electrode OSS',
      logo: {
        alt: 'electrode logo',
        src: 'img/electrode-logo.svg',
      },
      links: [
        {
          to: 'docs/getting-started',
          label: 'docs',
          position: 'left',
        },
        {
          href: 'https://github.com/electrode-io/electrode/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {

            },
          ],
        },
        {
          title: 'Community',
          items: [
            {

            },
          ],
        },
        {
          title: 'More',
          items: [
            {

            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} electrode OSS - GTP - Walmart`,
    },
  },
  themes: ['@docusaurus/theme-live-codeblock'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'introduction',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/electrode-io/electrode/tree/master/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/electrode-io/electrode/tree/master/docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
