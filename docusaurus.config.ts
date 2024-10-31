import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Darren's Dev Blog",
  tagline: "Tech insights for the modern developer",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://darrenjon.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "darrenjon", // Usually your GitHub org/user name.
  projectName: "dev-blog", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"]
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          showLastUpdateAuthor: true
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true
          },
          // routeBasePath: '/', // Set the route base path to '/'
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn"
        },
        theme: {
          customCss: "./src/css/custom.css"
        }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Darren's Dev Blog",
      logo: {
        alt: "Darren's Dev Blog Logo",
        src: "img/my-logo.svg"
      },
      items: [
        {
          to: "/about",
          position: "left",
          label: "關於我"
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Topics"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Topics",
              to: "/docs/category/microsoft-power-automate"
            },
            {
              label: "Blog",
              to: "/blog"
            }
          ]
        },
        {
          title: "Contact",
          items: [
            {
              label: "Medium",
              href: "https://medium.com/@darren9"
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/darrenjon"
            },
            {
              label: "X (Twitter)",
              href: "https://x.com/darrenlin_h2v"
            }
          ]
        },
        {
          title: "More",
          items: [
            // {
            //   label: 'GitHub',
            //   href: 'https://github.com/facebook/docusaurus',
            // },
          ]
        }
      ],
      copyright: `Copyright © Darren's Dev Blog ${new Date().getFullYear()}. All rights reserved.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    }
  } satisfies Preset.ThemeConfig
};

export default config;
