(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ViewHome"],{"0bc8":function(e,t,a){},"10a7":function(e,t,a){},"1b0a":function(e,t,a){"use strict";a("10a7")},"2b8e":function(e,t,a){},"39b7":function(e,t,a){"use strict";var c=a("7a23");const o=Object(c["F"])("data-v-36c99088");Object(c["t"])("data-v-36c99088");const i={key:1,class:"v-gallery__desc"},n={key:2,class:"v-gallery__vimeo-container"};Object(c["r"])();const r=o((e,t,a,o,r,s)=>(Object(c["q"])(),Object(c["e"])(c["a"],null,[e.vimeoPlayerIsOpen?Object(c["f"])("",!0):(Object(c["q"])(),Object(c["e"])("img",{key:0,class:["v-gallery",{"has-vimeo":e.data.vimeo}],alt:e.data.image.caption,src:e.largeImgUrl,onClick:t[1]||(t[1]=(...t)=>e.openVimeoPlayer&&e.openVimeoPlayer(...t))},null,10,["alt","src"])),e.data.image.caption&&e.withDesc?(Object(c["q"])(),Object(c["e"])("div",i,Object(c["B"])(e.data.image.caption),1)):Object(c["f"])("",!0),e.data.vimeo&&e.vimeoPlayerIsOpen?(Object(c["q"])(),Object(c["e"])("div",n,[Object(c["h"])("iframe",{src:`https://player.vimeo.com/video/${e.data.vimeo.vimeo_id}?color=00EF2E&portrait=0`,width:"250",height:"150",frameborder:"0",class:"v-gallery__vimeo-container__vimeo",onLoad:t[2]||(t[2]=(...t)=>e.vimeoLoad&&e.vimeoLoad(...t))},null,40,["src"])])):Object(c["f"])("",!0)],64)));var s=a("79f6"),l=Object(c["i"])({name:"Gallery",props:{data:{required:!0,type:Object},withDesc:{required:!1,type:Boolean,default:function(){return!0}}},data:function(){return{vimeoPlayerIsOpen:!1}},computed:{largeImgUrl:function(){var e,t,a,c,o=this.data.image;this.data.vimeo&&(o=this.data.vimeo.cover);var i=(null===(t=null===(e=o.formats)||void 0===e?void 0:e.xlarge)||void 0===t?void 0:t.url)||(null===(c=null===(a=o.formats)||void 0===a?void 0:a.large)||void 0===c?void 0:c.url)||o.url||"";return""+s["c"]+i}},methods:{openVimeoPlayer:function(){this.vimeoPlayerIsOpen=!0},vimeoLoad:function(e){if(e.target instanceof HTMLIFrameElement&&e.target.getBoundingClientRect().width<650){var t=e.target;t.style.opacity="0",t.style.width="1000px",t.style.height="1000px",window.setTimeout((function(){t.style.opacity="",t.style.width="",t.style.height=""}),250)}}}});a("c34c");l.render=r,l.__scopeId="data-v-36c99088";t["a"]=l},"3ec9":function(e,t,a){"use strict";a("2b8e")},4309:function(e,t,a){e.exports=a.p+"img/TrojansLogo--white.595d7305.svg"},4886:function(e,t,a){"use strict";a.r(t);var c=a("7a23"),o=a("4309"),i=a.n(o);const n=Object(c["F"])("data-v-c89d006c");Object(c["t"])("data-v-c89d006c");const r={class:"v-view-home"},s=Object(c["h"])("div",{class:"v-view-home__img-intro"},[Object(c["h"])("img",{class:"v-view-home__logo",src:i.a,alt:"Trojan logo"})],-1),l={class:"v-view-home__img-item"},d=Object(c["h"])("span",null,"->",-1);Object(c["r"])();const m=n((e,t,a,o,i,n)=>{const m=Object(c["y"])("gallery");return Object(c["q"])(),Object(c["e"])("section",r,[s,(Object(c["q"])(!0),Object(c["e"])(c["a"],null,Object(c["w"])(e.homeImages,e=>(Object(c["q"])(),Object(c["e"])("div",l,[e.Link?(Object(c["q"])(),Object(c["e"])("a",{key:0,href:e.Link,target:"_blank"},[d],8,["href"])):Object(c["f"])("",!0),Object(c["h"])(m,{data:{image:e.Image},"with-desc":!1},null,8,["data"])]))),256))])});var v=a("5502"),b=a("0613"),u=a("39b7"),O=Object(c["i"])({name:"ViewHome",components:{Gallery:u["a"]},data:function(){return{store:Object(v["b"])(b["b"])}},computed:{homeImages:function(){return this.store.state.homeImages}}});a("3ec9"),a("1b0a");O.render=m,O.__scopeId="data-v-c89d006c";t["default"]=O},c34c:function(e,t,a){"use strict";a("0bc8")}}]);
//# sourceMappingURL=ViewHome.2fc1c000.js.map