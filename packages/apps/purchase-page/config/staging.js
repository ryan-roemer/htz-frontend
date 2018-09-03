/* eslint-disable func-names */
const defer = require('config/defer').deferConfig;

module.exports = {
  service: {
    base: defer(function () {
      return `http${this.useSSL ? 's' : ''}://${this.remoteFQDN}`;
    }),
    newSso: 'https://ms-apps.haaretz.co.il/sso',
    sso: 'https://sso.haaretz.co.il',
    payment: 'https://payment.haaretz.co.il',
    image: 'https://images.haarets.co.il/image',
    graphql: defer(function () {
      return `http${
        this.graphQLuseSSL ? 's' : ''
      }://${this.appFQDN}${this.graphQLexposedPort && this.port ? `:${this.port}` : ''}/graphql`;
    }),
    polopolyImageBaseHref: defer(function () {
      return `http${
        this.useSSL ? 's' : ''
      }://${this.remoteFQDN}${this.port ? `:${this.port}` : ''}`;
    }),
  },
  appFQDN: defer(function () {
    return `${this.hostname ? `${this.hostname}.` : ''}${this.domain}`;
  }),
  remoteFQDN: defer(function () {
    return `www.${this.domain}`;
  }),
  useSSL: true,
  graphQLuseSSL: true,
  graphQLexposedPort: false,
  domain: 'haaretz.co.il',
  hostname: process.env.HOSTNAME,
  port: process.env.PORT || '2002',
  // Path of promotions page in Polopoly CM
  polopolyPromotionsPagePath: 'promotions-page-react',
  logLevel: 'info',
  enableHttpLogging: false,
};
