webpackJsonp([17],{294:function(a,r,e){"use strict";function BandCamp(a){var r=a.settings,e=a.embedType,t=r.layout,n=r.link,l=r.album,s=r.track,i="slim"===t?"small":"large",c="artworkOnly"===t?"/minimal=true":"",u="standard"!==t||r.showTrackList?"":"/tracklist=false",k="track"===e?"/track="+s:"",w=r.slimShowArt&&r.standardShowArt?"standard"===t&&"small"===r.artworkSize?"/artwork=small":"":"/artwork=none",p="slim"===t?42:"artworkOnly"===t?600:!0===r.standardShowArt&&"large"===r.artworkSize&&!1===r.showTrackList?717:!0===r.standardShowArt&&"large"===r.artworkSize&&!0===r.showTrackList?1036:!1!==r.standardShowArt&&"small"!==r.artworkSize||!1!==r.showTrackList?472:120;return o.a.createElement(m,{__source:{fileName:d,lineNumber:103}},o.a.createElement("iframe",{title:"BandCamp",width:"100%",height:p,src:"https://bandcamp.com/EmbeddedPlayer/transparent=true/album="+l+"/size="+i+"/bgcol="+r.theme+"/linkcol="+r.linkcol+c+u+k+w,frameBorder:"0",allowFullScreen:"",onLoad:a.onLoadCallback,__source:{fileName:d,lineNumber:104}},n))}Object.defineProperty(r,"__esModule",{value:!0});var t=e(22),n=e.n(t),l=e(0),o=e.n(l),s=e(1),i=(e.n(s),e(3)),d="src/components/Embed/elements/BandCamp.js";BandCamp.defaultProps={onLoadCallback:null};var m=Object(i.d)(function bandCampWrapper(){return{overflow:"auto",position:"relative",margin:"0 auto -4px",maxWidth:"700px"}},"figure",function(a){return n()(a)});r.default=BandCamp}});