/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    sso: 'https://devsso.haaretz.co.il',
    image: 'https://images.haarets.co.il/image',
    polopolyImageBaseHref: 'https://www.haaretz.co.il',
    graphql: defer(function () {
      return `http${
        this.graphQLuseSSL ? 's' : ''
      }://${this.appFQDN}${this.graphQLexposedPort && this.port ? `:${this.port}` : ''}/graphql`;
    }),
  },
  appFQDN: defer(function () {
    return `${this.hostname ? `${this.hostname}.` : ''}${this.domain}`;
  }),
  remoteFQDN: defer(function () {
    return `pre.${this.domain}`;
  }),
  useSSL: true,
  graphQLuseSSL: true,
  graphQLexposedPort: true,
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  port: process.env.PORT || '3000',
  logLevel: 'info',
  assetPrefix: '',
  enableHttpLogging: false,
};
