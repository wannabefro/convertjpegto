/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.convertjpegto.com",
  generateRobotsTxt: true,
  exclude: ["/api/*", "/server-sitemap.xml", "/not-found"],
};
