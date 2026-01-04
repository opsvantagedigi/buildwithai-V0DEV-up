module.exports=[70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},9463,__turbopack_context__=>{"use strict";let kvClient=null,WRITE_ENABLED=!1,READ_ONLY_ONLY=!1,NO_WRITE_FALLBACK=!1;try{process.env.KV_REST_API_URL||(process.env.KV_REST_API_URL=process.env.UPSTASH_REDIS_REST_URL||process.env.KV_REST_API_URL),process.env.KV_REST_API_TOKEN||(process.env.KV_REST_API_TOKEN=process.env.KV_REST_API_WRITE_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN||process.env.KV_REST_API_READ_ONLY_TOKEN||process.env.KV_REST_API_TOKEN),WRITE_ENABLED=!!(process.env.KV_REST_API_WRITE_TOKEN||process.env.KV_REST_API_TOKEN),READ_ONLY_ONLY=!!process.env.KV_REST_API_READ_ONLY_TOKEN&&!WRITE_ENABLED,NO_WRITE_FALLBACK="true"===process.env.NO_WRITE_FALLBACK||READ_ONLY_ONLY;let earlyUpstashUrl=process.env.UPSTASH_REDIS_REST_URL,earlyUpstashToken=process.env.UPSTASH_REDIS_REST_TOKEN;if(earlyUpstashUrl&&earlyUpstashToken){let base=earlyUpstashUrl.replace(/\/$/,"");kvClient={async get(e){try{let t=await fetch(`${base}/get/${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${earlyUpstashToken}`}});if(!t.ok)return null;return(await t.json()).result??null}catch(e){return console.error("[KV] early REST get() failed:",e),null}},async set(e,t){if(NO_WRITE_FALLBACK)return{skippedReadOnly:!0};try{return await fetch(`${base}/set/${encodeURIComponent(e)}`,{method:"POST",headers:{Authorization:`Bearer ${earlyUpstashToken}`,"Content-Type":"application/json"},body:JSON.stringify({value:"string"==typeof t?t:JSON.stringify(t)})}),!0}catch(e){return console.error("[KV] early REST set() failed:",e),null}},async expire(e,t){if(NO_WRITE_FALLBACK)return null;try{return await fetch(`${base}/expire/${encodeURIComponent(e)}`,{method:"POST",headers:{Authorization:`Bearer ${earlyUpstashToken}`,"Content-Type":"application/json"},body:JSON.stringify({ttl:t})}),!0}catch(e){return console.error("[KV] early REST expire() failed:",e),null}}}}let moduleName="@vercel/kv",kvModule=eval("require")(moduleName),candidate=kvModule?.kv??kvModule?.default??kvModule;if("function"==typeof candidate){let factory=candidate,makeLazy=e=>{let t=null,r=!1,a=async()=>{if(t||r)return t;r=!0;try{let r=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL,a=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN;(t=await e({url:r,token:a}))&&"function"==typeof t.get&&"function"==typeof t.set||(t=null)}catch(e){t=null}return t};return{async get(e){let t=await a();if(!t)throw Error("kv_not_initialized");return t.get(e)},async set(e,t){let r=await a();if(!r)throw Error("kv_not_initialized");return r.set(e,t)},async expire(e,t){let r=await a();if(!r)throw Error("kv_not_initialized");return"function"==typeof r.expire?r.expire(e,t):null}}};try{candidate=makeLazy(factory)}catch(err){}}if(candidate&&"function"==typeof candidate.get&&"function"==typeof candidate.set)kvClient=candidate;else throw console.warn("[KV] Falling back to Upstash REST wrapper: invalid client shape",Object.keys(kvModule||{})),Error("invalid_kv_client_shape")}catch(e){let upstashUrl=process.env.UPSTASH_REDIS_REST_URL,upstashToken=process.env.UPSTASH_REDIS_REST_TOKEN;if(upstashUrl&&upstashToken){let base=upstashUrl.replace(/\/$/,"");kvClient={async get(e){try{let t=await fetch(`${base}/get/${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${upstashToken}`}});if(!t.ok)return null;return(await t.json()).result??null}catch(e){return console.error("[KV] get() failed:",e),null}},async set(e,t){if(NO_WRITE_FALLBACK)return{skippedReadOnly:!0};try{return await fetch(`${base}/set/${encodeURIComponent(e)}`,{method:"POST",headers:{Authorization:`Bearer ${upstashToken}`,"Content-Type":"application/json"},body:JSON.stringify({value:"string"==typeof t?t:JSON.stringify(t)})}),!0}catch(e){return console.error("[KV] set() failed:",e),null}},async expire(e,t){if(NO_WRITE_FALLBACK)return null;try{return await fetch(`${base}/expire/${encodeURIComponent(e)}`,{method:"POST",headers:{Authorization:`Bearer ${upstashToken}`,"Content-Type":"application/json"},body:JSON.stringify({ttl:t})}),!0}catch(e){return console.error("[KV] expire() failed:",e),null}}}}else kvClient=null}let RDAP_TTL_SECONDS=300;async function kvGetRdap(e){if(!kvClient)return null;try{let t=`rdap:${e.toLowerCase()}`;return await kvClient.get(t)??null}catch(e){return null}}async function kvSetRdap(e,t){if(!kvClient)return null;if(NO_WRITE_FALLBACK)return{skippedReadOnly:!0};try{let r=`rdap:${e.toLowerCase()}`,a=await kvClient.set(r,t);try{"function"==typeof kvClient.expire&&await kvClient.expire(r,RDAP_TTL_SECONDS)}catch(e){}return a}catch(e){return null}}let kv={async get(e){if(!kvClient)return null;try{let t=await kvClient.get(e);if(null==t)return null;let r=t;if("string"==typeof t)try{r=JSON.parse(t)}catch(e){r=t}if(r&&"object"==typeof r&&"value"in r){let e=r.value;if("string"==typeof e)try{return JSON.parse(e)}catch(e){}return e}return r}catch(t){console.error("[KV] get() failed:",t);try{if(process.env.UPSTASH_REDIS_REST_URL&&process.env.UPSTASH_REDIS_REST_TOKEN){let t=(process.env.UPSTASH_REDIS_REST_URL||"").replace(/\/$/,""),r=process.env.UPSTASH_REDIS_REST_TOKEN,a=`${t}/get/${encodeURIComponent(e)}`;console.log("[KV] attempting Upstash REST fallback GET",a);let n=await fetch(a,{headers:{Authorization:`Bearer ${r}`}});if(console.log("[KV] upstash REST fallback status",n.status),!n.ok)return null;let i=await n.json();return console.log("[KV] upstash REST fallback body keys",Object.keys(i||{})),i.result??null}}catch(e){console.error("[KV] upstash REST fallback failed:",e)}return null}},async set(e,t,r){if(!kvClient)return null;if(NO_WRITE_FALLBACK)return{skippedReadOnly:!0};try{let a=await kvClient.set(e,t);if(r?.ex&&"function"==typeof kvClient.expire)try{await kvClient.expire(e,Math.ceil(r.ex))}catch(e){}return a}catch(e){return console.error("[KV] set() failed:",e),null}}},__TURBOPACK__default__export__={};function getKvStatus(){return{writeEnabled:WRITE_ENABLED,readOnlyOnly:READ_ONLY_ONLY,noWriteFallback:NO_WRITE_FALLBACK,kvClientPresent:!!kvClient,kvUrl:process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL||null}}async function debugKvRoundTrip(){let e="debug:kv:test",t={ok:!0,ts:Date.now()};console.log("[KV] Writing test key:",e);let r=await kv.set(e,JSON.stringify(t));console.log("[KV] Write result:",r);let a=await kv.get(e);return console.log("[KV] Read result:",a),{writeResult:r,readResult:a}}__turbopack_context__.s(["getKvStatus",()=>getKvStatus,"kv",0,kv,"kvGetRdap",()=>kvGetRdap,"kvSetRdap",()=>kvSetRdap])},67475,e=>{"use strict";function t(e){let t=e.data??{};switch(e.type){case"hero":{let e=t.heading??"Welcome to your new site",r=t.subheading??"This page was generated with Build With AI.",a=t.ctaLabel??"Get started";return`
<section class="hero">
  <div class="container">
    <h1>${e}</h1>
    <p>${r}</p>
    <a href="#contact" class="btn-primary">${a}</a>
  </div>
</section>`}case"features":{let e=t.title??"Features",r=(t.items??[]).map(e=>`
  <div class="feature">
    <h3>${e.title}</h3>
    <p>${e.description}</p>
  </div>`).join("\n");return`
<section class="features">
  <div class="container">
    <h2>${e}</h2>
    <div class="feature-grid">
      ${r}
    </div>
  </div>
</section>`}case"testimonials":{let e=t.title??"What people are saying",r=(t.items??[]).map(e=>`
  <div class="testimonial">
    <blockquote>“${e.quote}”</blockquote>
    <p class="name">${e.name}</p>
  </div>`).join("\n");return`
<section class="testimonials">
  <div class="container">
    <h2>${e}</h2>
    <div class="testimonial-grid">
      ${r}
    </div>
  </div>
</section>`}case"faq":{let e=t.title??"Frequently asked questions",r=(t.items??[]).map(e=>`
  <div class="faq-item">
    <h3>${e.question}</h3>
    <p>${e.answer}</p>
  </div>`).join("\n");return`
<section class="faq">
  <div class="container">
    <h2>${e}</h2>
    <div class="faq-list">
      ${r}
    </div>
  </div>
</section>`}case"cta":{let e=t.heading??"Ready to begin?",r=t.subheading??"Take the next step with your new site.",a=t.ctaLabel??"Contact us";return`
<section class="cta">
  <div class="container">
    <h2>${e}</h2>
    <p>${r}</p>
    <a href="#contact" class="btn-primary">${a}</a>
  </div>
</section>`}default:return`
<section class="unknown">
  <div class="container">
    <p>Unsupported block type: ${e.type}</p>
  </div>
</section>`}}function r(e){let r=e.metadata.name||"Build With AI site",a=e.metadata.description||"A site generated with Build With AI.",n=(e.pages[0]?.blocks??[]).map(e=>t(e)).join("\n\n"),i=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${r}</title>
  <meta name="description" content="${a}" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {{HEAD}}
</head>
<body>
  <main>
    ${n}
  </main>
</body>
</html>`,s=`
:root {
  --bg: #0f172a;
  --fg: #ffffff;
  --accent: #22c55e;
  --muted: #94a3b8;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
    "Inter", sans-serif;
  background: var(--bg);
  color: var(--fg);
}

main {
  padding: 40px 0 80px;
}

.container {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  padding: 80px 0 60px;
}

.hero h1 {
  font-size: 2.75rem;
  line-height: 1.1;
  margin-bottom: 16px;
}

.hero p {
  font-size: 1.1rem;
  color: var(--muted);
  max-width: 600px;
}

.btn-primary {
  display: inline-block;
  margin-top: 24px;
  padding: 10px 18px;
  border-radius: 999px;
  background: var(--accent);
  color: #020617;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
}

.features,
.testimonials,
.faq,
.cta {
  padding: 40px 0;
}

.features h2,
.testimonials h2,
.faq h2,
.cta h2 {
  font-size: 1.6rem;
  margin-bottom: 16px;
}

.feature-grid,
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.feature,
.testimonial,
.faq-item {
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.feature h3,
.faq-item h3 {
  margin: 0 0 8px;
  font-size: 1rem;
}

.feature p,
.faq-item p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--muted);
}

.testimonial blockquote {
  margin: 0 0 8px;
  font-size: 0.95rem;
}

.testimonial .name {
  margin: 0;
  font-size: 0.85rem;
  color: var(--muted);
}

.cta p {
  margin-top: 8px;
  color: var(--muted);
}

.unknown {
  padding: 20px 0;
}

.unknown p {
  font-size: 0.85rem;
  color: var(--muted);
}
`,o=`
<link rel="stylesheet" href="/styles.css" />
<meta property="og:title" content="${r}" />
<meta property="og:description" content="${a}" />
`;return{html:i.replace("{{HEAD}}",o),css:s,head:o}}e.s(["exportSiteToStatic",()=>r])},53247,e=>{"use strict";var t=e.i(9463);let r="buildwithai:sites",a="buildwithai:sites:index";async function n(e,n){let i=`${r}:${e}`,s=await t.kv.get(i);if(s)return s;let o={id:e,name:n,createdAt:Date.now(),updatedAt:Date.now()};await t.kv.set(i,o);try{let r=await t.kv.get(a),n=Array.isArray(r)?Array.from(new Set([...r,e])):[e];await t.kv.set(a,n)}catch(e){}return o}async function i(e){let a=`${r}:${e}`,n=await t.kv.get(a);n&&(n.updatedAt=Date.now(),await t.kv.set(a,n))}async function s(){let e=await t.kv.get(a),n=[];if(!Array.isArray(e)||0===e.length)return n;for(let a of e){let e=`${r}:${a}`,i=await t.kv.get(e);i&&n.push(i)}return n.sort((e,t)=>t.updatedAt-e.updatedAt)}e.s(["listSites",()=>s,"registerSite",()=>n,"updateSiteTimestamp",()=>i])},46255,e=>{"use strict";var t=e.i(9463);let r="buildwithai:site:";async function a(e){let a=`${r}${e}`,n=await t.kv.get(a);if(!n)return null;let i=n;if("string"==typeof n)try{i=JSON.parse(n)}catch{return null}return i&&"object"==typeof i&&i.metadata&&i.pages?(i.metadata={id:i.metadata.id??e,name:i.metadata.name??"",description:i.metadata.description??"",createdAt:i.metadata.createdAt??Date.now(),updatedAt:i.metadata.updatedAt??Date.now(),version:i.metadata.version??1},Array.isArray(i.pages)||(i.pages=[]),i):null}e.s(["loadSiteState",()=>a])},26900,82278,e=>{"use strict";function t(e,t){let r=`<script>window.__SITE_ID__ = "${t}"</script>`,a='<script src="/track.js"></script>',n=`${r}
${a}`;return e.includes("</head>")?e.replace("</head>",`${n}
</head>`):e.includes("<body")?e.replace(/<body(.*?)>/i,e=>`${e}
${n}`):`${n}
${e}`}function r(e){if(!e)return!1;let t=/window\.__SITE_ID__\s*=/.test(e),r=/<script[^>]+src=["']\/track\.js["'][^>]*>\s*<\/script>/.test(e);return!!(t&&r)}e.s(["injectTracking",()=>t],26900),e.s(["validateTracking",()=>r],82278)},5075,e=>{"use strict";var t=e.i(8041),r=e.i(99896),a=e.i(12033),n=e.i(81147),i=e.i(41419),s=e.i(8224),o=e.i(89956),l=e.i(3480),c=e.i(77484),u=e.i(27230),p=e.i(43858),d=e.i(63991),f=e.i(51205),h=e.i(36658),v=e.i(11918),y=e.i(93695);e.i(81551);var m=e.i(17996),g=e.i(24278),R=e.i(46255),_=e.i(67475);async function E(){let e=process.env.VERCEL_PREVIEW_WEBHOOK_URL;if(!e)return console.warn("[preview] Missing VERCEL_PREVIEW_WEBHOOK_URL"),{ok:!1,url:null};try{let t=await fetch(e,{method:"POST"});if(!t.ok)return console.error("[preview] Vercel preview deploy failed",t.status),{ok:!1,url:null};let r=await t.json().catch(()=>({}));return{ok:!0,url:r?.url??null}}catch(e){return console.error("[preview] Unexpected error",e),{ok:!1,url:null}}}var w=e.i(53247),S=e.i(26900),x=e.i(82278);async function T(e){try{let t=(await e.json().catch(()=>({}))).siteId;if(!t)return g.NextResponse.json({error:"Missing siteId"},{status:400});let r=await (0,R.loadSiteState)(t);if(!r)return g.NextResponse.json({error:"No site state found for this siteId"},{status:404});let a=(0,_.exportSiteToStatic)(r),n=(0,S.injectTracking)(a.html,t);if(!(0,x.validateTracking)(n))return g.NextResponse.json({error:"tracking_validation_failed"},{status:422});let i=await E();return await (0,w.updateSiteTimestamp)(t),g.NextResponse.json({ok:i.ok,previewUrl:i.url})}catch(e){return g.NextResponse.json({error:e?.message??"Unexpected preview error"},{status:500})}}e.s(["POST",()=>T],7355);var k=e.i(7355);let b="",A=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/publish/preview/route",pathname:"/api/publish/preview",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/buildwithai/src/app/api/publish/preview/route.ts",nextConfigOutput:b,userland:k}),{workAsyncStorage:$,workUnitAsyncStorage:O,serverHooks:I}=A;function P(){return(0,a.patchFetch)({workAsyncStorage:$,workUnitAsyncStorage:O})}async function U(e,t,a){A.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let g="/api/publish/preview/route";g=g.replace(/\/index$/,"")||"/";let R=!1,_=await A.prepare(e,t,{srcPage:g,multiZoneDraftMode:R});if(!_)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:E,params:w,nextConfig:S,parsedUrl:x,isDraftMode:T,prerenderManifest:k,routerServerContext:b,isOnDemandRevalidate:$,revalidateOnlyGenerated:O,resolvedPathname:I,clientReferenceManifest:P,serverActionsManifest:U}=_,K=(0,o.normalizeAppPath)(g),N=!!(k.dynamicRoutes[K]||k.routes[I]),C=async()=>((null==b?void 0:b.render404)?await b.render404(e,t,x,!1):t.end("This page could not be found"),null);if(N&&!T){let e=!!k.routes[I],t=k.dynamicRoutes[K];if(t&&!1===t.fallback&&!e){if(S.experimental.adapterPath)return await C();throw new y.NoFallbackError}}let j=null;!N||A.isDev||T||(j="/index"===(j=I)?"/":j);let D=!0===A.isDev||!N,V=N&&!D;U&&P&&(0,s.setManifestsSingleton)({page:g,clientReferenceManifest:P,serverActionsManifest:U});let q=e.method||"GET",H=(0,i.getTracer)(),L=H.getActiveScopeSpan(),z={params:w,prerenderManifest:k,renderOpts:{experimental:{authInterrupts:!!S.experimental.authInterrupts},cacheComponents:!!S.cacheComponents,supportsDynamicResponse:D,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:S.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>A.onRequestError(e,t,a,n,b)},sharedContext:{buildId:E}},B=new l.NodeNextRequest(e),W=new l.NodeNextResponse(t),F=c.NextRequestAdapter.fromNodeNextRequest(B,(0,c.signalFromNodeResponse)(t));try{let s=async e=>A.handle(F,z).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=H.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==u.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${q} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${q} ${g}`)}),o=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var i,l;let c=async({previousCacheEntry:r})=>{try{if(!o&&$&&O&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await s(n);e.fetchMetrics=z.renderOpts.fetchMetrics;let l=z.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let c=z.renderOpts.collectedTags;if(!N)return await (0,d.sendResponse)(B,W,i,z.renderOpts.pendingWaitUntil),null;{let e=await i.blob(),t=(0,f.toNodeOutgoingHttpHeaders)(i.headers);c&&(t[v.NEXT_CACHE_TAGS_HEADER]=c),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==z.renderOpts.collectedRevalidate&&!(z.renderOpts.collectedRevalidate>=v.INFINITE_CACHE)&&z.renderOpts.collectedRevalidate,a=void 0===z.renderOpts.collectedExpire||z.renderOpts.collectedExpire>=v.INFINITE_CACHE?void 0:z.renderOpts.collectedExpire;return{value:{kind:m.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){if(null==r?void 0:r.isStale){let r=!1;await A.onRequestError(e,t,{routerKind:"App Router",routePath:g,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:V,isOnDemandRevalidate:$})},r,b)}throw t}},u=await A.handleResponse({req:e,nextConfig:S,cacheKey:j,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:k,isRoutePPREnabled:!1,isOnDemandRevalidate:$,revalidateOnlyGenerated:O,responseGenerator:c,waitUntil:a.waitUntil,isMinimalMode:o});if(!N)return null;if((null==u||null==(i=u.value)?void 0:i.kind)!==m.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==u||null==(l=u.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});o||t.setHeader("x-nextjs-cache",$?"REVALIDATED":u.isMiss?"MISS":u.isStale?"STALE":"HIT"),T&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let y=(0,f.fromNodeOutgoingHttpHeaders)(u.value.headers);return o&&N||y.delete(v.NEXT_CACHE_TAGS_HEADER),!u.cacheControl||t.getHeader("Cache-Control")||y.get("Cache-Control")||y.set("Cache-Control",(0,h.getCacheControlHeader)(u.cacheControl)),await (0,d.sendResponse)(B,W,new Response(u.value.body,{headers:y,status:u.value.status||200})),null};L?await l(L):await H.withPropagatedContext(e.headers,()=>H.trace(u.BaseServerSpan.handleRequest,{spanName:`${q} ${g}`,kind:i.SpanKind.SERVER,attributes:{"http.method":q,"http.target":e.url}},l))}catch(t){if(!(t instanceof y.NoFallbackError)){let r=!1;await A.onRequestError(e,t,{routerKind:"App Router",routePath:K,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:V,isOnDemandRevalidate:$})},r,b)}if(N)throw t;return await (0,d.sendResponse)(B,W,new Response(null,{status:500})),null}}e.s(["handler",()=>U,"patchFetch",()=>P,"routeModule",()=>A,"serverHooks",()=>I,"workAsyncStorage",()=>$,"workUnitAsyncStorage",()=>O],5075)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__bc648845._.js.map