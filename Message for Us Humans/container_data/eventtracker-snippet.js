!function(a){var s,c,p,_,d,l,u=[],f={pv_id:"",ctx_id:"",intra:!1,force_xhr:!1,store_last_response:!1
},g="object"==typeof a.navigator&&"string"==typeof a.navigator.userAgent&&/iP(ad|hone|od)/.test(
a.navigator.userAgent),y="object"==typeof a.navigator&&a.navigator.sendBeacon,
v=y?g?"xhr_ios":"beacon":"xhr";function h(){var e,t,n=a.crypto||a.msCrypto;if(n)t=n.getRandomValues(
new Uint8Array(18));else for(t=[];t.length<18;)t.push(256*Math.random()^255&(e=e||+new Date)),
e=Math.floor(e/256);return btoa(String.fromCharCode.apply(String,t)).replace(/\+/g,"-").replace(
/\//g,"_")}if(a.nyt_et)try{console.warn("et2 snippet should only load once per page")}catch(e
){}else a.nyt_et=function(){var e,t,n,o=arguments;function r(e){var t,n,o,r,i;u.length&&(t=s+"track"
,n=JSON.stringify(u),e=e,o=f.force_xhr,r=f.store_last_response,!o&&("beacon"===v||y&&e)?(
o=a.navigator.sendBeacon(t,n),r&&(l=o)):((
i="undefined"!=typeof XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")
).open("POST",t),i.withCredentials=!0,i.setRequestHeader("Accept","*/*"),
"string"==typeof n?i.setRequestHeader("Content-Type","text/plain;charset=UTF-8"
):"[object Blob]"==={}.toString.call(n)&&n.type&&i.setRequestHeader("Content-Type",n.type),
r&&!i.onload&&(i.onload=function(){l=i.response},i.onerror=function(e){l=!1}),i.send(n)),u.length=0,
clearTimeout(d),d=null)}if("string"==typeof o[0]&&/init/.test(o[0])&&(f=function(e,t){var n="",o="",
r=!1,i=!1,a=!1;if("string"==typeof e&&"init"==e&&"object"==typeof t&&(
"boolean"==typeof t.intranet&&t.intranet&&(r=!0),"boolean"==typeof t.force_xhr&&t.force_xhr&&(i=!0),
"boolean"==typeof t.store_last_response&&t.store_last_response&&(a=!0),
"string"==typeof t.pv_id_override&&"string"==typeof t.ctx_id_override))if(
24<=t.pv_id_override.length&&24<=t.ctx_id_override.length)n=t.pv_id_override,
o=t.ctx_id_override;else try{console.warn("override id(s) must be >= 24 chars long")}catch(e){}
return{pv_id:n,ctx_id:o,intra:r,store_last_response:a,force_xhr:i}}(o[0],o[3]),p=f.pv_id||h(),
"init"==o[0]&&!c)){if(c=f.ctx_id||h(),"string"!=typeof o[1]||!/^http/.test(o[1]))throw new Error(
"init must include an et host url");if(s=String(o[1]).replace(/([^\/])$/,"$1/"),
"string"!=typeof o[2])throw new Error("init must include a source app name");_=o[2]}var i=o.length-1
;(e=o[i]&&"object"==typeof o[i]?o[i]:e)||/init/.test(o[0])?e&&!e.subject&&console.warn(
"event data {} must include a subject"):console.warn(
"when invoked without 'init' or 'pageinit', nyt_et() must include a event data"),s&&e&&e.subject&&(
i=e.subject,delete e.subject,n="page_exit"==i||"ob_click"==(e.eventData||{}).type,
t="page"==i||"page_soft"==i?p:h(),u.push({context_id:c,pageview_id:p,event_id:t,client_lib:"v1.3.0",
sourceApp:_,intranet:f.intra?1:void 0,subject:i,how:n&&g&&y?"beacon_ios":v,client_ts:+new Date,
data:JSON.parse(JSON.stringify(e))}),"send"==o[0]||t==p||n?r(n):("soon"==o[0]&&(clearTimeout(d),
d=setTimeout(r,200)),d=d||setTimeout(r,5500)))},a.nyt_et.get_pageview_id=function(){return p},
a.nyt_et.get_context_id=function(){return c},a.nyt_et.get_host=function(){return s},
a.nyt_et.get_last_send_response=function(){var e=l;return e&&(l=null),e}}(window);