webpackJsonp([0],{1193:function(e,n,t){"use strict";t.d(n,"a",function(){return o});var r=t(103),a=t.n(r),i=t(3),o=Object(i.c)(function videoWrapper(e){var n=e.aspectRatio,t=e.nyt,r=n?n.split("/"):[16,9],i=a()(r,2),o=i[0];return{margin:"0",paddingBottom:i[1]/o*100+"%",height:"0",overflow:"hidden",position:"relative",paddingTop:t?"69px":""}},"figure")},1194:function(e,n,t){"use strict";t.d(n,"a",function(){return o});var r=t(74),a=t.n(r),i=t(3),o=Object(i.c)(function videoElement(){return{margin:"0",padding:"0",height:"100% !important",width:"100% !important",left:"0",top:"0",position:"absolute",display:"block",border:"none"}},"iframe",function(e){return a()(e)})},20:function(e,n,t){"use strict";function StandardVideo(e){return a.a.createElement(o.a,{__source:{fileName:c,lineNumber:35}},a.a.createElement(d.a,{width:"560",height:"315",src:e.content,frameBorder:"0",allowFullScreen:"",scrolling:"no",marginHeight:"0",marginWidth:"0",onLoad:e.onLoadCallback,__source:{fileName:c,lineNumber:36}}))}Object.defineProperty(n,"__esModule",{value:!0});var r=t(0),a=t.n(r),i=t(1),o=(t.n(i),t(1193)),d=t(1194),c="src/components/Embed/elements/StandardVideo.js";StandardVideo.defaultProps={onLoadCallback:null},n.default=StandardVideo}});