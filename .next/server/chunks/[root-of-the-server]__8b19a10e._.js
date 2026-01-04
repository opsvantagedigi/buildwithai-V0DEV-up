module.exports=[70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},9463,__turbopack_context__=>{"use strict";let kvClient=null,WRITE_ENABLED=!1,READ_ONLY_ONLY=!1,NO_WRITE_FALLBACK=!1;try{process.env.KV_REST_API_URL||(process.env.KV_REST_API_URL=process.env.UPSTASH_REDIS_REST_URL||process.env.KV_REST_API_URL),process.env.KV_REST_API_TOKEN||(process.env.KV_REST_API_TOKEN=process.env.KV_REST_API_WRITE_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN||process.env.KV_REST_API_READ_ONLY_TOKEN||process.env.KV_REST_API_TOKEN),WRITE_ENABLED=!!(process.env.KV_REST_API_WRITE_TOKEN||process.env.KV_REST_API_TOKEN),READ_ONLY_ONLY=!!process.env.KV_REST_API_READ_ONLY_TOKEN&&!WRITE_ENABLED,NO_WRITE_FALLBACK="true"===process.env.NO_WRITE_FALLBACK||READ_ONLY_ONLY;let earlyUpstashUrl=process.env.UPSTASH_REDIS_REST_URL,earlyUpstashToken=process.env.UPSTASH_REDIS_REST_TOKEN;if(earlyUpstashUrl&&earlyUpstashToken){let base=earlyUpstashUrl.replace(/\/$/,"");kvClient={async get(e){try{let t=await fetch(`${base}/get/${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${earlyUpstashToken}`}});if(!t.ok)return null;return(await t.json()).result??null}catch(e){return console.error("[KV] early REST get() failed:",e),null}},async set(e,t){if(NO_WRITE_FALLBACK)return{skippedReadOnly:!0};try{return await fetch(`${base}/set/${encodeURIComponent(e)}`,{method:"POST",headers:{Authorization:`Bearer ${earlyUpstashToken}`,"Content-Type":"application/json"},body:JSON.stringify({value:"string"==typeof t?t:JSON.stringify(t)})}),!0}catch(e){return console.error("[KV] early REST set() failed:",e),null}},async expire(e,t){if(NO_WRITE_FALLBACK)return null;try{return await fetch(`${base}/expire/${encodeURIComponent(e)}`,{method:"POST",headers:{Authorization:`Bearer ${earlyUpstashToken}`,"Content-Type":"application/json"},body:JSON.stringify({ttl:t})}),!0}catch(e){return console.error("[KV] early REST expire() failed:",e),null}}}}let moduleName="@vercel/kv",kvModule=eval("require")(moduleName),candidate=kvModule?.kv??kvModule?.default??kvModule;if("function"==typeof candidate){let factory=candidate,makeLazy=e=>{let t=null,r=!1,n=async()=>{if(t||r)return t;r=!0;try{let r=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL,n=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN;(t=await e({url:r,token:n}))&&"function"==typeof t.get&&"function"==typeof t.set||(t=null)}catch(e){t=null}return t};return{async get(e){let t=await n();if(!t)throw Error("kv_not_initialized");return t.get(e)},async set(e,t){let r=await n();if(!r)throw Error("kv_not_initialized");return r.set(e,t)},async expire(e,t){let r=await n();if(!r)throw Error("kv_not_initialized");return"function"==typeof r.expire?r.expire(e,t):null}}};try{candidate=makeLazy(factory)}catch(err){}}if(candidate&&"function"==typeof candidate.get&&"function"==typeof candidate.set)kvClient=candidate;else throw console.warn("[KV] Falling back to Upstash REST wrapper: invalid client shape",Object.keys(kvModule||{})),Error("invalid_kv_client_shape")}catch(e){let upstashUrl=process.env.UPSTASH_REDIS_REST_URL,upstashToken=process.env.UPSTASH_REDIS_REST_TOKEN;if(upstashUrl&&upstashToken){let base=upstashUrl.replace(/\/$/,"");kvClient={async get(e){try{let t=await fetch(`${base}/get/${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${upstashToken}`}});if(!t.ok)return null;return(await t.json()).result??null}catch(e){return console.error("[KV] get() failed:",e),null}},async set(e,t){if(NO_WRITE_FALLBACK)return{skippedReadOnly:!0};try{return await fetch(`${base}/set/${encodeURIComponent(e)}`,{method:"POST",headers:{Authorization:`Bearer ${upstashToken}`,"Content-Type":"application/json"},body:JSON.stringify({value:"string"==typeof t?t:JSON.stringify(t)})}),!0}catch(e){return console.error("[KV] set() failed:",e),null}},async expire(e,t){if(NO_WRITE_FALLBACK)return null;try{return await fetch(`${base}/expire/${encodeURIComponent(e)}`,{method:"POST",headers:{Authorization:`Bearer ${upstashToken}`,"Content-Type":"application/json"},body:JSON.stringify({ttl:t})}),!0}catch(e){return console.error("[KV] expire() failed:",e),null}}}}else kvClient=null}let RDAP_TTL_SECONDS=300;async function kvGetRdap(e){if(!kvClient)return null;try{let t=`rdap:${e.toLowerCase()}`;return await kvClient.get(t)??null}catch(e){return null}}async function kvSetRdap(e,t){if(!kvClient)return null;if(NO_WRITE_FALLBACK)return{skippedReadOnly:!0};try{let r=`rdap:${e.toLowerCase()}`,n=await kvClient.set(r,t);try{"function"==typeof kvClient.expire&&await kvClient.expire(r,RDAP_TTL_SECONDS)}catch(e){}return n}catch(e){return null}}let kv={async get(e){if(!kvClient)return null;try{let t=await kvClient.get(e);if(null==t)return null;let r=t;if("string"==typeof t)try{r=JSON.parse(t)}catch(e){r=t}if(r&&"object"==typeof r&&"value"in r){let e=r.value;if("string"==typeof e)try{return JSON.parse(e)}catch(e){}return e}return r}catch(t){console.error("[KV] get() failed:",t);try{if(process.env.UPSTASH_REDIS_REST_URL&&process.env.UPSTASH_REDIS_REST_TOKEN){let t=(process.env.UPSTASH_REDIS_REST_URL||"").replace(/\/$/,""),r=process.env.UPSTASH_REDIS_REST_TOKEN,n=`${t}/get/${encodeURIComponent(e)}`;console.log("[KV] attempting Upstash REST fallback GET",n);let a=await fetch(n,{headers:{Authorization:`Bearer ${r}`}});if(console.log("[KV] upstash REST fallback status",a.status),!a.ok)return null;let i=await a.json();return console.log("[KV] upstash REST fallback body keys",Object.keys(i||{})),i.result??null}}catch(e){console.error("[KV] upstash REST fallback failed:",e)}return null}},async set(e,t,r){if(!kvClient)return null;if(NO_WRITE_FALLBACK)return{skippedReadOnly:!0};try{let n=await kvClient.set(e,t);if(r?.ex&&"function"==typeof kvClient.expire)try{await kvClient.expire(e,Math.ceil(r.ex))}catch(e){}return n}catch(e){return console.error("[KV] set() failed:",e),null}}},__TURBOPACK__default__export__={};function getKvStatus(){return{writeEnabled:WRITE_ENABLED,readOnlyOnly:READ_ONLY_ONLY,noWriteFallback:NO_WRITE_FALLBACK,kvClientPresent:!!kvClient,kvUrl:process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL||null}}async function debugKvRoundTrip(){let e="debug:kv:test",t={ok:!0,ts:Date.now()};console.log("[KV] Writing test key:",e);let r=await kv.set(e,JSON.stringify(t));console.log("[KV] Write result:",r);let n=await kv.get(e);return console.log("[KV] Read result:",n),{writeResult:r,readResult:n}}__turbopack_context__.s(["getKvStatus",()=>getKvStatus,"kv",0,kv,"kvGetRdap",()=>kvGetRdap,"kvSetRdap",()=>kvSetRdap])},53247,e=>{"use strict";var t=e.i(9463);let r="buildwithai:sites",n="buildwithai:sites:index";async function a(e,a){let i=`${r}:${e}`,s=await t.kv.get(i);if(s)return s;let o={id:e,name:a,createdAt:Date.now(),updatedAt:Date.now()};await t.kv.set(i,o);try{let r=await t.kv.get(n),a=Array.isArray(r)?Array.from(new Set([...r,e])):[e];await t.kv.set(n,a)}catch(e){}return o}async function i(e){let n=`${r}:${e}`,a=await t.kv.get(n);a&&(a.updatedAt=Date.now(),await t.kv.set(n,a))}async function s(){let e=await t.kv.get(n),a=[];if(!Array.isArray(e)||0===e.length)return a;for(let n of e){let e=`${r}:${n}`,i=await t.kv.get(e);i&&a.push(i)}return a.sort((e,t)=>t.updatedAt-e.updatedAt)}e.s(["listSites",()=>s,"registerSite",()=>a,"updateSiteTimestamp",()=>i])},67475,e=>{"use strict";function t(e){let t=e.data??{};switch(e.type){case"hero":{let e=t.heading??"Welcome to your new site",r=t.subheading??"This page was generated with Build With AI.",n=t.ctaLabel??"Get started";return`
<section class="hero">
  <div class="container">
    <h1>${e}</h1>
    <p>${r}</p>
    <a href="#contact" class="btn-primary">${n}</a>
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
</section>`}case"cta":{let e=t.heading??"Ready to begin?",r=t.subheading??"Take the next step with your new site.",n=t.ctaLabel??"Contact us";return`
<section class="cta">
  <div class="container">
    <h2>${e}</h2>
    <p>${r}</p>
    <a href="#contact" class="btn-primary">${n}</a>
  </div>
</section>`}default:return`
<section class="unknown">
  <div class="container">
    <p>Unsupported block type: ${e.type}</p>
  </div>
</section>`}}function r(e){let r=e.metadata.name||"Build With AI site",n=e.metadata.description||"A site generated with Build With AI.",a=(e.pages[0]?.blocks??[]).map(e=>t(e)).join("\n\n"),i=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${r}</title>
  <meta name="description" content="${n}" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {{HEAD}}
</head>
<body>
  <main>
    ${a}
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
<meta property="og:description" content="${n}" />
`;return{html:i.replace("{{HEAD}}",o),css:s,head:o}}e.s(["exportSiteToStatic",()=>r])},20611,e=>{"use strict";var t=e.i(8041),r=e.i(99896),n=e.i(12033),a=e.i(81147),i=e.i(41419),s=e.i(8224),o=e.i(89956),l=e.i(3480),c=e.i(77484),u=e.i(27230),p=e.i(43858),d=e.i(63991),h=e.i(51205),f=e.i(36658),g=e.i(11918),v=e.i(93695);e.i(81551);var y=e.i(17996),R=e.i(24278),m=e.i(67475);async function _(){let e=process.env.VERCEL_STAGING_WEBHOOK_URL;if(!e)return console.warn("[staging] Missing VERCEL_STAGING_WEBHOOK_URL"),{ok:!1,url:null};try{let t=await fetch(e,{method:"POST"});if(!t.ok)return console.error("[staging] Vercel staging deploy failed",t.status),{ok:!1,url:null};let r=await t.json().catch(()=>({}));return{ok:!0,url:r?.url??null}}catch(e){return console.error("[staging] Unexpected error",e),{ok:!1,url:null}}}var E=e.i(9463),S=e.i(53247);let x="buildwithai:site:staging:";async function w(e){try{let t=(await e.json().catch(()=>({}))).siteId;if(!t)return R.NextResponse.json({error:"Missing siteId"},{status:400});await (0,m.exportSiteToStatic)(t);let r=await _(),n=`${x}${t}`,a={lastStagedAt:Date.now(),lastStagedUrl:r.url??null};return await E.kv.set(n,a),await (0,S.updateSiteTimestamp)(t),R.NextResponse.json({ok:r.ok,stagingUrl:r.url,metadata:a})}catch(e){return R.NextResponse.json({error:e?.message??"Unexpected staging error"},{status:500})}}e.s(["POST",()=>w],33312);var T=e.i(33312);let b="",A=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/publish/staging/route",pathname:"/api/publish/staging",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/buildwithai/src/app/api/publish/staging/route.ts",nextConfigOutput:b,userland:T}),{workAsyncStorage:k,workUnitAsyncStorage:$,serverHooks:O}=A;function I(){return(0,n.patchFetch)({workAsyncStorage:k,workUnitAsyncStorage:$})}async function P(e,t,n){A.isDev&&(0,a.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let R="/api/publish/staging/route";R=R.replace(/\/index$/,"")||"/";let m=!1,_=await A.prepare(e,t,{srcPage:R,multiZoneDraftMode:m});if(!_)return t.statusCode=400,t.end("Bad Request"),null==n.waitUntil||n.waitUntil.call(n,Promise.resolve()),null;let{buildId:E,params:S,nextConfig:x,parsedUrl:w,isDraftMode:T,prerenderManifest:b,routerServerContext:k,isOnDemandRevalidate:$,revalidateOnlyGenerated:O,resolvedPathname:I,clientReferenceManifest:P,serverActionsManifest:U}=_,K=(0,o.normalizeAppPath)(R),N=!!(b.dynamicRoutes[K]||b.routes[I]),C=async()=>((null==k?void 0:k.render404)?await k.render404(e,t,w,!1):t.end("This page could not be found"),null);if(N&&!T){let e=!!b.routes[I],t=b.dynamicRoutes[K];if(t&&!1===t.fallback&&!e){if(x.experimental.adapterPath)return await C();throw new v.NoFallbackError}}let q=null;!N||A.isDev||T||(q="/index"===(q=I)?"/":q);let j=!0===A.isDev||!N,V=N&&!j;U&&P&&(0,s.setManifestsSingleton)({page:R,clientReferenceManifest:P,serverActionsManifest:U});let D=e.method||"GET",H=(0,i.getTracer)(),L=H.getActiveScopeSpan(),z={params:S,prerenderManifest:b,renderOpts:{experimental:{authInterrupts:!!x.experimental.authInterrupts},cacheComponents:!!x.cacheComponents,supportsDynamicResponse:j,incrementalCache:(0,a.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:x.cacheLife,waitUntil:n.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,n,a)=>A.onRequestError(e,t,n,a,k)},sharedContext:{buildId:E}},B=new l.NodeNextRequest(e),F=new l.NodeNextResponse(t),M=c.NextRequestAdapter.fromNodeNextRequest(B,(0,c.signalFromNodeResponse)(t));try{let s=async e=>A.handle(M,z).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=H.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==u.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=r.get("next.route");if(n){let t=`${D} ${n}`;e.setAttributes({"next.route":n,"http.route":n,"next.span_name":t}),e.updateName(t)}else e.updateName(`${D} ${R}`)}),o=!!(0,a.getRequestMeta)(e,"minimalMode"),l=async a=>{var i,l;let c=async({previousCacheEntry:r})=>{try{if(!o&&$&&O&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await s(a);e.fetchMetrics=z.renderOpts.fetchMetrics;let l=z.renderOpts.pendingWaitUntil;l&&n.waitUntil&&(n.waitUntil(l),l=void 0);let c=z.renderOpts.collectedTags;if(!N)return await (0,d.sendResponse)(B,F,i,z.renderOpts.pendingWaitUntil),null;{let e=await i.blob(),t=(0,h.toNodeOutgoingHttpHeaders)(i.headers);c&&(t[g.NEXT_CACHE_TAGS_HEADER]=c),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==z.renderOpts.collectedRevalidate&&!(z.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&z.renderOpts.collectedRevalidate,n=void 0===z.renderOpts.collectedExpire||z.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:z.renderOpts.collectedExpire;return{value:{kind:y.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:n}}}}catch(t){if(null==r?void 0:r.isStale){let r=!1;await A.onRequestError(e,t,{routerKind:"App Router",routePath:R,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:V,isOnDemandRevalidate:$})},r,k)}throw t}},u=await A.handleResponse({req:e,nextConfig:x,cacheKey:q,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:b,isRoutePPREnabled:!1,isOnDemandRevalidate:$,revalidateOnlyGenerated:O,responseGenerator:c,waitUntil:n.waitUntil,isMinimalMode:o});if(!N)return null;if((null==u||null==(i=u.value)?void 0:i.kind)!==y.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==u||null==(l=u.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});o||t.setHeader("x-nextjs-cache",$?"REVALIDATED":u.isMiss?"MISS":u.isStale?"STALE":"HIT"),T&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let v=(0,h.fromNodeOutgoingHttpHeaders)(u.value.headers);return o&&N||v.delete(g.NEXT_CACHE_TAGS_HEADER),!u.cacheControl||t.getHeader("Cache-Control")||v.get("Cache-Control")||v.set("Cache-Control",(0,f.getCacheControlHeader)(u.cacheControl)),await (0,d.sendResponse)(B,F,new Response(u.value.body,{headers:v,status:u.value.status||200})),null};L?await l(L):await H.withPropagatedContext(e.headers,()=>H.trace(u.BaseServerSpan.handleRequest,{spanName:`${D} ${R}`,kind:i.SpanKind.SERVER,attributes:{"http.method":D,"http.target":e.url}},l))}catch(t){if(!(t instanceof v.NoFallbackError)){let r=!1;await A.onRequestError(e,t,{routerKind:"App Router",routePath:K,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:V,isOnDemandRevalidate:$})},r,k)}if(N)throw t;return await (0,d.sendResponse)(B,F,new Response(null,{status:500})),null}}e.s(["handler",()=>P,"patchFetch",()=>I,"routeModule",()=>A,"serverHooks",()=>O,"workAsyncStorage",()=>k,"workUnitAsyncStorage",()=>$],20611)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__8b19a10e._.js.map