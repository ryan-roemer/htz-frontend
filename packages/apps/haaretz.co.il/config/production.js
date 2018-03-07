const os = require('os');

function getLocalExternalIp() {
  if (process.env.BIND_ADDRESS) {
    return process.env.BIND_ADDRESS;
  }

  return Array.prototype.concat
    .apply([], Object.values(os.networkInterfaces()))
    .filter(details => details.family === 'IPv4' && !details.internal)
    .pop().address;
}

module.exports = {
  hostIp: getLocalExternalIp(),
  hostname: process.env.HOSTNAME,
  imgBaseUrl: 'https://images.haarets.co.il/image',
  domain: 'https://www.haaretz.co.il',
};
