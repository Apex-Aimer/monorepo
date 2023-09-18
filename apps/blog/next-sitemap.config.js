/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `https://${process.env.BLOG_DOMAIN}`,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `https://${process.env.BLOG_DOMAIN}/posts-sitemap.xml`,
    ],
  },
}
