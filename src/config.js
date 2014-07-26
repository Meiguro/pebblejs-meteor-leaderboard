/**
 * Configuration
 * @property {string} siteUrl - The url to your site. e.g. my-site.local:3000
 * @property {string} [ddpUrl] - The url to your site's ddp endpoint.
 *    Prefixing with a protocol (such as http:// or ws://) will force ddp to
 *    use the corresponding transport protocol.
 */

var config = {
  "siteUrl": ""
};

// --
/* global module */

if (!config.siteUrl) {
  console.log("Enter your site's url in config.js");
}

module.exports = config;
