webpackJsonp([10],{1478:function(e,a,n){"use strict";n.d(a,"a",function(){return d});var t=n(23),o=n.n(t),i={},d=function appendScript(e,a){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],t=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,d=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null;if(i[a])i[a].isLoaded?d&&d():i[a].callbacks.push(t);else{var u=document.createElement("script");u.src=e,u.async=n,u.id=a,r&&o()(r).map(function(e){return u.setAttribute(e,r[e])}),document.body.appendChild(u),i[a]={tag:u,isLoaded:!1,callbacks:[t]},u.addEventListener("load",function runCallbacks(e){return function(){i[e].isLoaded=!0,i[e].callbacks.map(function(e){return e()})}}(a))}}},312:function(e,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=n(8),o=n.n(t),i=n(6),d=n.n(i),r=n(7),u=n.n(r),l=n(9),s=n.n(l),c=n(10),m=n.n(c),p=n(23),f=n.n(p),b=n(0),z=n.n(b),y=n(1),v=(n.n(y),n(2)),h=n(1478),g="src/components/Embed/elements/PlayBuzz.js",k=Object(v.d)(function playBuzzWrapper(){return{width:"100%",overflow:"auto",maxHeight:"700px",position:"relative",margin:"0 auto"}},"figure",function(e){return f()(e)}),_=function(e){function PlayBuzz(){return d()(this,PlayBuzz),s()(this,(PlayBuzz.__proto__||o()(PlayBuzz)).apply(this,arguments))}return m()(PlayBuzz,e),u()(PlayBuzz,[{key:"componentDidMount",value:function componentDidMount(){Object(h.a)("//cdn.playbuzz.com/widget/feed.js","playbuzz-js",!0,this.props.onLoadCallback,this.props.onLoadCallback)}},{key:"render",value:function render(){var e=this.props.settings,a=e.info||!1,n=e.share||!1,t=e.facebook||!1,o=e.recommendations||!1,i=e["data-item"].substring(e["data-item"].indexOf('"')+1,e["data-item"].lastIndexOf('"'))||"",d=e["data-embed-by"].substring(e["data-embed-by"].indexOf('"')+1,e["data-embed-by"].lastIndexOf('"'))||"",r=e["data-version"].substring(e["data-version"].indexOf('"')+1,e["data-version"].lastIndexOf('"'))||"";return z.a.createElement(k,{__source:{fileName:g,lineNumber:102}},z.a.createElement("div",{className:"pb_feed","data-item":i,"data-embed-by":d,"data-version":r,"data-game-info":a,"data-shares":n,"data-comments":t,"data-recommend":o,__source:{fileName:g,lineNumber:103}}))}}]),PlayBuzz}(z.a.Component);_.defaultProps={onLoadCallback:null},a.default=_}});