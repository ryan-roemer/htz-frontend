webpackJsonp([8],{1461:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var i=n(22),r=n.n(i),o={},a=function appendScript(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null;if(o[e])o[e].isLoaded?a&&a():o[e].callbacks.push(i);else{var l=document.createElement("script");l.src=t,l.async=n,l.id=e,c&&r()(c).map(function(t){return l.setAttribute(t,c[t])}),document.body.appendChild(l),o[e]={tag:l,isLoaded:!1,callbacks:[i]},l.addEventListener("load",function runCallbacks(t){return function(){o[t].isLoaded=!0,o[t].callbacks.map(function(t){return t()})}}(e))}}},305:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(10),r=n.n(i),o=n(6),a=n.n(o),c=n(7),l=n.n(c),s=n(11),u=n.n(s),d=n(12),p=n.n(d),m=n(0),f=n.n(m),b=n(1),v=(n.n(b),n(3)),w=n(1461),h="src/components/Embed/elements/Twitter.js",g=Object(v.d)(function twitterWrapper(t){var e=void 0;switch(t.embedType){case"collection timeline":case"moment":break;case"search timeline":case"video":case"single tweet":e="auto"}return{overflow:"auto",height:e||"400px",maxHeight:"800px",position:"relative",margin:"0 auto","& .twitter-tweet":{marginBottom:"0!important"}}},"figure"),T=function(t){function Twitter(){var t,e,n,i;a()(this,Twitter);for(var o=arguments.length,c=Array(o),l=0;l<o;l++)c[l]=arguments[l];return e=n=u()(this,(t=Twitter.__proto__||r()(Twitter)).call.apply(t,[this].concat(c))),n.initScript=function(){twttr.events.bind("rendered",function(t){console.log("twitter embed is loaded"),n.props.onLoadCallback&&n.props.onLoadCallback()})},n.updateScript=function(){twttr.widgets.load()},i=e,u()(n,i)}return p()(Twitter,t),l()(Twitter,[{key:"componentDidMount",value:function componentDidMount(){Object(w.a)("//platform.twitter.com/widgets.js","twitter-js",!0,this.initScript,this.updateScript)}},{key:"render",value:function render(){var t=this.props.content;return f.a.createElement(g,{embedType:this.props.embedType,__source:{fileName:h,lineNumber:98}},f.a.createElement("div",{dangerouslySetInnerHTML:{__html:t},__source:{fileName:h,lineNumber:99}}))}}]),Twitter}(f.a.Component);T.defaultProps={onLoadCallback:null},e.default=T}});