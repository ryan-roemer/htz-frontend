(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{1595:function(e,n,t){"use strict";var r=t(71),a=t(7),c=t.n(a),i=t(516);function _templateObject(){var e=Object(r.a)(["\n  fragment ClickTrackerBanner on ClickTrackerBanner {\n    inputTemplate\n    contentName\n    contentId\n    priority\n    text\n    link\n    linkTarget\n    departments\n    ...ClickTrackerImage\n    replaceDomainForAdBlocker\n    advertiserCamp\n    percentage\n    minRange\n    maxRange\n    chance\n  }\n  ","\n"]);return _templateObject=function _templateObject(){return e},e}var l=c()(_templateObject(),i.b);function clickTrackerBannersWrapper_templateObject(){var e=Object(r.a)(["\n  fragment ClickTrackerBannersWrapper on ClickTrackerBannersWrapper {\n    inputTemplate\n    contentName\n    contentId\n    totalPercentage\n    viewModes {\n      viewModeHtzMobile\n      viewModeTmMobile\n      viewModeHtz\n      viewModeJson\n    }\n    banners {\n      ...ClickTrackerBanner\n    }\n  }\n  ","\n"]);return clickTrackerBannersWrapper_templateObject=function _templateObject(){return e},e}n.a=c()(clickTrackerBannersWrapper_templateObject(),l)},1634:function(e,n,t){"use strict";t.r(n);var r=t(7),a=t.n(r),c=t(1595);function _templateObject(){var e=_taggedTemplateLiteral(["\n  query LeelaQuery($listId: String!, $history: [ID]) {\n    list(listId: $listId, history: $history) {\n      title\n      items {\n        ... on ClickTrackerBannersWrapper {\n          ...ClickTrackerBannersWrapper\n        }\n      }\n    }\n  }\n  ","\n"]);return _templateObject=function _templateObject(){return e},e}function _taggedTemplateLiteral(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}n.default=a()(_templateObject(),c.a)}}]);