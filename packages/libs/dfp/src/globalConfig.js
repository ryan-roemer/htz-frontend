/* global window, document, location, localStorage */
import { CookieUtils, siteConfig, } from '@haaretz/htz-user-utils';
// import getCookieAsMap, { ssoKey, } from './utils/cookieUtils';
const getCookieAsMap = CookieUtils.getCookieAsMap;

const dfpBaseConf = {
  get referrer() {
    return document.referrer ? document.referrer : '';
  },
  get isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent || ''
    );
  },
  /**
   * Returns true iff the loaded page is the homepage (no inner path)
   * @returns {boolean}
   */
  get isHomepage() {
    return window.location.pathname === '/' || this.environment === 3; // 'prod'
  },
  get department() {
    return this.isHomepage ? '_homepage' : '_section';
  },
  /**
   * returns the domain the page was loaded to. i.e: 'haaretz.co.il', 'haaretz.com'
   * @returns {string} the domain name from the windows's location hostname property
   */
  get domain() {
    const regexMatch = /([\d|\w]+)(\.co\.il|\.com)(.*)?/.exec(
      window.location.hostname
    );
    const result = regexMatch ? regexMatch[0] : window.location.hostname;
    return result;
  },
  /**
   * Returns an array of concatenated paths, separated by a dot.
   * For example, for the URL:
   * http://www.haaretz.co.il/news/world/america/us-election-2016/LIVE-1.2869045
   * the path is '/news/world/america/us-election-2016/LIVE-1.2869045'.
   * This function takes the directories ['news', 'world', 'america', 'us-election-2016']
   * and converts it to the following format:
   * ['.news', '.news.world', '.news.world.america', '.news.world.america.us-election-2016']
   * This denotes the path configuration for the given adSlot
   * non articles (sections) will be given a '0' - no articleId value for targeting purposes)
   * @returns {Array.<T>} an array of path names
   */
  get path() {
    let sectionArray = this.articleId && this.articleId !== '0'
      ? window.location.pathname.split('/').slice(1, -1)
      : window.location.pathname.split('/').slice(1);
    sectionArray = sectionArray.filter(
      path => path !== 'wwwMobileSite' && path !== 'whtzMobileSite'
    );
    return sectionArray
      .map(section => `.${section}`)
      .map((section, index, arr) => arr.slice(0, index + 1).reduce((last, current) => last.concat(current))
      );
  },
  /**
   * Returns a string representation for the name of the site
   * @return {*|string}
   */
  get site() {
    let site;
    if (window.location.hostname.indexOf('haaretz.co.il') > -1) {
      site = 'haaretz';
    }
    else if (window.location.hostname.indexOf('themarker.com') > -1) {
      site = 'themarker';
    }
    else if (window.location.hostname.indexOf('mouse.co.il') > -1) {
      site = 'mouse';
    }
    return site || 'haaretz';
  },
  /**
   * Returns the current environment targeting param, if such is defined.
   * @returns {number} targeting param, 1 for local development, 2 for test servers and 3 for prod.
   * May return undefined if no targeting is specified.
   */
  get environment() {
    const env = {
      dev: 1,
      test: 2,
      prod: 3,
    };
    return window.location.port === '8080' || window.location.port === '3000'
      ? env.dev
      : window.location.hostname.indexOf('pre.haaretz.co.il') > -1
        || window.location.hostname.indexOf('pre.haaretz.com') > -1
        || window.location.hostname.indexOf('tmtest.themarker.com') > -1
        || window.location.hostname.indexOf('pre.themarker.com') > -1
        || window.location.hostname.indexOf('react-stage.') > -1
        ? env.test
        : window.location.pathname.indexOf('/cmlink/Haaretz.HomePage') > -1
          || window.location.pathname.indexOf('/cmlink/TheMarker.HomePage') > -1
          || window.location.pathname.indexOf('react-prod.') > -1
          ? env.prod
          : undefined;
  },
  /**
   * Returns the articleIf if on an article page, or null otherwise
   * @returns {string} an articleId string from the pathname, or 0 if not found
   */
  get articleId() {
    const articleIdMatch = /\d\.\d+/g.exec(window.location.pathname);
    let articleId = '0';
    if (articleIdMatch) {
      articleId = articleIdMatch.pop(); // Converts ["1.23145"] to "1.23145"
    }
    return articleId;
  },
  utm_: {
    get content() {
      return this.getUrlParam('utm_content');
    },
    get source() {
      return this.getUrlParam('utm_source');
    },
    get medium() {
      return this.getUrlParam('utm_medium');
    },
    get campaign() {
      return this.getUrlParam('utm_campaign');
    },
    getUrlParam(key) {
      const results = RegExp(`(${key})(=)([^&"]+)`).exec(
        window.location.search
      );
      return results && results[3] ? results[3] : undefined;
    },
  },
  get adBlockRemoved() {
    let adBlockRemoved = false;
    try {
      if (localStorage.getItem('adblock_removed')) {
        adBlockRemoved = true;
      }
    }
    catch (err) {
      // do nothing
    }
    return adBlockRemoved;
  },
  get isWriterAlerts() {
    return window.location.search.indexOf('writerAlerts=true') > -1;
  },
  get wifiLocation() {
    let wifiLocation = '';
    const cookieMap = getCookieAsMap();
    try {
      // eslint-disable-next-line no-underscore-dangle
      if (cookieMap && cookieMap._htzwif) {
        wifiLocation = cookieMap._htzwif === 'arcaffe' // eslint-disable-line no-underscore-dangle
          ? 'ArCafe'
          : 'university';
      }
    }
    catch (err) {
      // do nothing
    }
    return wifiLocation;
  },
  get isValidForsmartPhone() {
    let validForAds = true;
    const PageUrl = window.location.href;
    const isSmartphoneapp = PageUrl.match('haaretzsmartphoneapp');
    const cookieMap = getCookieAsMap();
    try {
      if (isSmartphoneapp) {
        // eslint-disable-line no-underscore-dangle
        if (!cookieMap || !(cookieMap.NotPayer || cookieMap.HtzPusr)) {
          validForAds = false;
        }
      }
    }
    catch (err) {
      // do nothing
    }
    return validForAds;
  },
  get gStatCampaignNumber() {
    let gstatCampaign;
    try {
      gstatCampaign = window.localStorage.getItem('GstatCampaign')
        ? JSON.parse(window.localStorage.getItem('GstatCampaign'))
        : undefined;
    }
    catch (err) {
      /* In case of thrown 'SecurityError' or 'QuotaExceededError',
       the variable should be undefined */
      gstatCampaign = undefined;
    }
    return gstatCampaign ? gstatCampaign.CampaignNumber : undefined;
  },
  get proposalNumber() {
    let proposal;
    try {
      proposal = window.localStorage.getItem('proposaltype')
        ? window.localStorage.getItem('proposaltype')
        : undefined;
    }
    catch (err) {
      /* In case of thrown 'SecurityError' or 'QuotaExceededError',
       the variable should be undefined */
      proposal = undefined;
    }
    return proposal;
  },
  adSlotConfig: {
    'haaretz.co.il.example.slot': {
      id: 'slotId',
      // path : "/network/base/slotId/slotId_subsection", Will be calculated from AdManager
      responsive: true,
      adSizeMapping: [ [ 'width1', 'height1', ], ...[ 'widthN', 'heightN', ], ],
      priority: 'normal',
      fluid: false,
      responsiveAdSizeMapping: {
        xxs: [ [ 'width1', 'height1', ], ...[ 'widthN', 'heightN', ], ],
        xs: [ [ 'width1', 'height1', ], ...[ 'widthN', 'heightN', ], ],
        s: [ [ 'width1', 'height1', ], ...[ 'widthN', 'heightN', ], ],
        m: [ [ 'width1', 'height1', ], ...[ 'widthN', 'heightN', ], ],
        l: [ [ 'width1', 'height1', ], ...[ 'widthN', 'heightN', ], ],
        xl: [ [ 'width1', 'height1', ], ...[ 'widthN', 'heightN', ], ],
        xxl: [ [ 'width1', 'height1', ], ...[ 'widthN', 'heightN', ], ],
      },
      blacklistReferrers: 'comma, delimited, blacklisted, referrer, list',
      whitelistReferrers: 'comma, delimited, referrer, list',
    },
  },
  adManagerConfig: {
    network: '9401',
    adUnitBase: 'haaretz.co.il_Web',
  },
  breakpointsConfig: {
    // Type 4
    breakpoints: {
      xxs: 10,
      xs: 20,
      s: 600,
      m: 768,
      l: 1024,
      xl: 1280,
      xxl: 1900,
    },
  },
  userConfig: {
    type: undefined,
    age: undefined,
    gender: undefined,
  },
  conflictManagementConfig: {
    'blocking.ad.unit.name': [
      {
        onsize: '1280x200,970x250,3x3',
        avoid: 'blocked.ad.unit.name',
      },
      {
        onsize: '1280x200,970x250,3x3',
        avoid: 'blocked.ad.unit.name',
      },
    ],
  },
  impressionManagerConfig: {
    'ad.unit.name': {
      target: 'all|section|homepage',
      frequency: '$1/$2(day|hour)',
      exposed: 0,
      expires: new Date().getTime(),
    },
  },
  googleGlobalSettings: {
    enableSingleRequest: true,
    enableAsyncRendering: true,
    refreshIntervalTime: 1000,
    breakpointType: 'type4',
  },
  get sso() {
    return siteConfig().ssoKey;
  },
};

function filterUnsettableProperties(config) {
  const ret = {};
  if (config !== undefined) {
    const configKeys = Object.keys(config);
    for (const key in configKeys) {
      if (!isGetterBasedProperty(dfpBaseConf, key)) {
        ret[key] = config[key];
      }
    }
  }
  return ret;

  function isGetterBasedProperty(obj, prop) {
    // console.log(obj, prop);
    return (
      obj
      && Object.getOwnPropertyDescriptor(obj, prop)
      && !!Object.getOwnPropertyDescriptor(obj, prop).get
    );
  }
}

export default config => Object.assign(dfpBaseConf, filterUnsettableProperties(config));
