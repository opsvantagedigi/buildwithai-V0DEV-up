module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/buildwithai/src/lib/kv.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "debugKvRoundTrip",
    ()=>debugKvRoundTrip,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getKvStatus",
    ()=>getKvStatus,
    "kv",
    ()=>kv,
    "kvGetRdap",
    ()=>kvGetRdap,
    "kvSetRdap",
    ()=>kvSetRdap
]);
// Thin Vercel KV adapter. If @vercel/kv is not installed or KV is not configured,
// these functions fail gracefully and return null / noop. A conservative
// no-write fallback is implemented so we can avoid attempting writes when the
// deployment only provides a read-only token.
let kvClient = null;
// Flags will be computed after env mapping so they reflect mapped UPSTASH vars
let WRITE_ENABLED = false;
let READ_ONLY_ONLY = false;
let NO_WRITE_FALLBACK = false;
try {
    // If the project already has UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
    // or custom WRITE/READ env names set, map them to the names expected by
    // `@vercel/kv` at runtime so the package can pick them up without changing
    // Vercel project env names. Do NOT log values or expose secrets.
    if (!process.env.KV_REST_API_URL) {
        process.env.KV_REST_API_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    }
    if (!process.env.KV_REST_API_TOKEN) {
        process.env.KV_REST_API_TOKEN = process.env.KV_REST_API_WRITE_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_READ_ONLY_TOKEN || process.env.KV_REST_API_TOKEN;
    }
    // Compute write/read flags after any env mapping above so they reflect
    // the effective environment variables (e.g. UPSTASH -> KV mapping).
    WRITE_ENABLED = !!(process.env.KV_REST_API_WRITE_TOKEN || process.env.KV_REST_API_TOKEN);
    READ_ONLY_ONLY = !!process.env.KV_REST_API_READ_ONLY_TOKEN && !WRITE_ENABLED;
    NO_WRITE_FALLBACK = process.env.NO_WRITE_FALLBACK === 'true' || READ_ONLY_ONLY;
    // If explicit Upstash REST envs are present prefer a thin REST wrapper so
    // local scripts and child processes use the same predictable code-path.
    const earlyUpstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const earlyUpstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (earlyUpstashUrl && earlyUpstashToken) {
        const base = earlyUpstashUrl.replace(/\/$/, '');
        kvClient = {
            async get (key) {
                try {
                    const res = await fetch(`${base}/get/${encodeURIComponent(key)}`, {
                        headers: {
                            Authorization: `Bearer ${earlyUpstashToken}`
                        }
                    });
                    if (!res.ok) return null;
                    const j = await res.json();
                    return j.result ?? null;
                } catch (err) {
                    console.error("[KV] early REST get() failed:", err);
                    return null;
                }
            },
            async set (key, value) {
                if (NO_WRITE_FALLBACK) return {
                    skippedReadOnly: true
                };
                try {
                    await fetch(`${base}/set/${encodeURIComponent(key)}`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${earlyUpstashToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            value: typeof value === 'string' ? value : JSON.stringify(value)
                        })
                    });
                    return true;
                } catch (err) {
                    console.error("[KV] early REST set() failed:", err);
                    return null;
                }
            },
            async expire (key, ttl) {
                if (NO_WRITE_FALLBACK) return null;
                try {
                    await fetch(`${base}/expire/${encodeURIComponent(key)}`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${earlyUpstashToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ttl
                        })
                    });
                    return true;
                } catch (err) {
                    console.error("[KV] early REST expire() failed:", err);
                    return null;
                }
            }
        };
    }
    // Construct the module name so static analyzers can't find the literal
    const moduleName = '@' + 'vercel' + '/kv';
    // Use eval to call require at runtime; this avoids bundlers resolving the import
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    // @ts-ignore
    const kvModule = eval('require')(moduleName);
    // Pick a candidate client from common export shapes
    let candidate = kvModule?.kv ?? kvModule?.default ?? kvModule;
    // If the module exports a factory function, attempt to call it with env
    if (typeof candidate === 'function') {
        // Wrap factory in a lazy initializer so child processes or scripts that
        // load env files after module import still work. The lazy wrapper will
        // call the factory on first use with the current env values.
        const factory = candidate;
        const makeLazy = (factoryFn)=>{
            let realClient = null;
            let initAttempted = false;
            const ensure = async ()=>{
                if (realClient) return realClient;
                if (initAttempted) return realClient;
                initAttempted = true;
                try {
                    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
                    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
                    realClient = await factoryFn({
                        url,
                        token
                    });
                    if (!(realClient && typeof realClient.get === 'function' && typeof realClient.set === 'function')) {
                        realClient = null;
                    }
                } catch (err) {
                    realClient = null;
                }
                return realClient;
            };
            return {
                async get (k) {
                    const c = await ensure();
                    if (!c) throw new Error('kv_not_initialized');
                    return c.get(k);
                },
                async set (k, v) {
                    const c = await ensure();
                    if (!c) throw new Error('kv_not_initialized');
                    return c.set(k, v);
                },
                async expire (k, t) {
                    const c = await ensure();
                    if (!c) throw new Error('kv_not_initialized');
                    if (typeof c.expire === 'function') return c.expire(k, t);
                    return null;
                }
            };
        };
        try {
            candidate = makeLazy(factory);
        } catch (err) {
        // ignore and validate below
        }
    }
    // Validate that candidate exposes get/set
    if (candidate && typeof candidate.get === 'function' && typeof candidate.set === 'function') {
        kvClient = candidate;
    } else {
        // Diagnostic + force fallback to Upstash REST in the catch block below
        console.warn('[KV] Falling back to Upstash REST wrapper: invalid client shape', Object.keys(kvModule || {}));
        throw new Error('invalid_kv_client_shape');
    }
} catch (e) {
    // package not installed or not available in this environment; try an
    // Upstash REST fallback if UPSTASH_REDIS_REST_URL/TOKEN are available.
    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (upstashUrl && upstashToken) {
        const base = upstashUrl.replace(/\/$/, '');
        kvClient = {
            async get (key) {
                try {
                    const res = await fetch(`${base}/get/${encodeURIComponent(key)}`, {
                        headers: {
                            Authorization: `Bearer ${upstashToken}`
                        }
                    });
                    if (!res.ok) return null;
                    const j = await res.json();
                    return j.result ?? null;
                } catch (err) {
                    console.error("[KV] get() failed:", err);
                    return null;
                }
            },
            async set (key, value) {
                if (NO_WRITE_FALLBACK) return {
                    skippedReadOnly: true
                };
                try {
                    // Upstash expects simple JSON with `value` field for the set endpoint
                    await fetch(`${base}/set/${encodeURIComponent(key)}`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${upstashToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            value: typeof value === 'string' ? value : JSON.stringify(value)
                        })
                    });
                    return true;
                } catch (err) {
                    console.error("[KV] set() failed:", err);
                    return null;
                }
            },
            async expire (key, ttl) {
                if (NO_WRITE_FALLBACK) return null;
                try {
                    await fetch(`${base}/expire/${encodeURIComponent(key)}`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${upstashToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ttl
                        })
                    });
                    return true;
                } catch (err) {
                    console.error("[KV] expire() failed:", err);
                    return null;
                }
            }
        };
    } else {
        kvClient = null;
    }
}
const RDAP_TTL_SECONDS = 300;
async function kvGetRdap(domain) {
    if (!kvClient) return null;
    try {
        const key = `rdap:${domain.toLowerCase()}`;
        const value = await kvClient.get(key);
        return value ?? null;
    } catch (e) {
        return null;
    }
}
async function kvSetRdap(domain, value) {
    if (!kvClient) return null;
    if (NO_WRITE_FALLBACK) return {
        skippedReadOnly: true
    };
    try {
        const key = `rdap:${domain.toLowerCase()}`;
        // @vercel/kv supports expire via .set with options in newer versions; use simple set
        const setResult = await kvClient.set(key, value);
        // If the client supports expiration, set TTL separately (best-effort)
        try {
            if (typeof kvClient.expire === 'function') await kvClient.expire(key, RDAP_TTL_SECONDS);
        } catch (_) {
        // ignore
        }
        return setResult;
    } catch (e) {
        // fail silently
        return null;
    }
}
const kv = {
    async get (key) {
        if (!kvClient) return null;
        try {
            const v = await kvClient.get(key);
            // Normalize multiple possible shapes returned by different clients
            //  - raw primitive (number/string)
            //  - JSON string ("{...}")
            //  - wrapped object like { value: "..." }
            if (v === null || v === undefined) return null;
            let parsed = v;
            if (typeof v === 'string') {
                try {
                    parsed = JSON.parse(v);
                } catch (_) {
                    parsed = v;
                }
            }
            // If the stored value is wrapped as { value: "..." }, unwrap it.
            if (parsed && typeof parsed === 'object' && 'value' in parsed) {
                const inner = parsed.value;
                if (typeof inner === 'string') {
                    try {
                        return JSON.parse(inner);
                    } catch (_) {
                        return inner;
                    }
                }
                return inner;
            }
            return parsed;
        } catch (err) {
            console.error("[KV] get() failed:", err);
            // If the underlying client failed due to an invalid/missing base URL,
            // attempt a best-effort direct Upstash REST fallback using environment
            // variables. This helps in child-process/test runtimes where the
            // installed client was initialized with undefined env values.
            try {
                if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
                    const base = (process.env.UPSTASH_REDIS_REST_URL || '').replace(/\/$/, '');
                    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
                    const url = `${base}/get/${encodeURIComponent(key)}`;
                    console.log('[KV] attempting Upstash REST fallback GET', url);
                    const res = await fetch(url, {
                        headers: {
                            Authorization: `Bearer ${upstashToken}`
                        }
                    });
                    console.log('[KV] upstash REST fallback status', res.status);
                    if (!res.ok) return null;
                    const j = await res.json();
                    console.log('[KV] upstash REST fallback body keys', Object.keys(j || {}));
                    return j.result ?? null;
                }
            } catch (fallbackErr) {
                console.error('[KV] upstash REST fallback failed:', fallbackErr);
            }
            return null;
        }
    },
    async set (key, value, opts) {
        if (!kvClient) return null;
        if (NO_WRITE_FALLBACK) return {
            skippedReadOnly: true
        };
        try {
            // Avoid double-encoding: pass raw values to the underlying client and
            // let that client (or our Upstash REST wrapper) handle any required
            // encoding. This prevents nested JSON like "{\"value\":\"1\"}".
            const setResult = await kvClient.set(key, value);
            if (opts?.ex && typeof kvClient.expire === 'function') {
                try {
                    await kvClient.expire(key, Math.ceil(opts.ex));
                } catch (_) {
                // ignore
                }
            }
            return setResult;
        } catch (err) {
            console.error("[KV] set() failed:", err);
            return null;
        }
    }
};
const __TURBOPACK__default__export__ = {
    kvGetRdap,
    kvSetRdap
};
function getKvStatus() {
    return {
        writeEnabled: WRITE_ENABLED,
        readOnlyOnly: READ_ONLY_ONLY,
        noWriteFallback: NO_WRITE_FALLBACK,
        kvClientPresent: !!kvClient,
        kvUrl: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || null
    };
}
async function debugKvRoundTrip() {
    const key = "debug:kv:test";
    const value = {
        ok: true,
        ts: Date.now()
    };
    console.log("[KV] Writing test key:", key);
    const writeResult = await kv.set(key, JSON.stringify(value));
    console.log("[KV] Write result:", writeResult);
    const readResult = await kv.get(key);
    console.log("[KV] Read result:", readResult);
    return {
        writeResult,
        readResult
    };
}
}),
"[project]/buildwithai/src/lib/builder/load.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadSiteState",
    ()=>loadSiteState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/kv.ts [app-route] (ecmascript)");
;
const KEY_PREFIX = "buildwithai:site:";
async function loadSiteState(siteId) {
    const key = `${KEY_PREFIX}${siteId}`;
    const raw = await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].get(key);
    if (!raw) return null;
    // `kv.get` may return a parsed object or a JSON string depending on the
    // underlying client. Normalize to an object safely.
    let parsed = raw;
    if (typeof raw === "string") {
        try {
            parsed = JSON.parse(raw);
        } catch  {
            // If parsing fails, treat as missing/invalid
            return null;
        }
    }
    // Validate minimal schema
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.metadata || !parsed.pages) return null;
    // Ensure metadata fields exist
    parsed.metadata = {
        id: parsed.metadata.id ?? siteId,
        name: parsed.metadata.name ?? "",
        description: parsed.metadata.description ?? "",
        createdAt: parsed.metadata.createdAt ?? Date.now(),
        updatedAt: parsed.metadata.updatedAt ?? Date.now(),
        version: parsed.metadata.version ?? 1
    };
    // Ensure pages array exists
    if (!Array.isArray(parsed.pages)) parsed.pages = [];
    return parsed;
}
}),
"[project]/buildwithai/src/lib/export/site.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "exportSiteToStatic",
    ()=>exportSiteToStatic
]);
function renderBlock(block) {
    const data = block.data ?? {};
    switch(block.type){
        case "hero":
            {
                const heading = data.heading ?? "Welcome to your new site";
                const subheading = data.subheading ?? "This page was generated with Build With AI.";
                const ctaLabel = data.ctaLabel ?? "Get started";
                return `
<section class="hero">
  <div class="container">
    <h1>${heading}</h1>
    <p>${subheading}</p>
    <a href="#contact" class="btn-primary">${ctaLabel}</a>
  </div>
</section>`;
            }
        case "features":
            {
                const title = data.title ?? "Features";
                const items = data.items ?? [];
                const list = items.map((item)=>`
  <div class="feature">
    <h3>${item.title}</h3>
    <p>${item.description}</p>
  </div>`).join("\n");
                return `
<section class="features">
  <div class="container">
    <h2>${title}</h2>
    <div class="feature-grid">
      ${list}
    </div>
  </div>
</section>`;
            }
        case "testimonials":
            {
                const title = data.title ?? "What people are saying";
                const items = data.items ?? [];
                const list = items.map((item)=>`
  <div class="testimonial">
    <blockquote>“${item.quote}”</blockquote>
    <p class="name">${item.name}</p>
  </div>`).join("\n");
                return `
<section class="testimonials">
  <div class="container">
    <h2>${title}</h2>
    <div class="testimonial-grid">
      ${list}
    </div>
  </div>
</section>`;
            }
        case "faq":
            {
                const title = data.title ?? "Frequently asked questions";
                const items = data.items ?? [];
                const list = items.map((item)=>`
  <div class="faq-item">
    <h3>${item.question}</h3>
    <p>${item.answer}</p>
  </div>`).join("\n");
                return `
<section class="faq">
  <div class="container">
    <h2>${title}</h2>
    <div class="faq-list">
      ${list}
    </div>
  </div>
</section>`;
            }
        case "cta":
            {
                const heading = data.heading ?? "Ready to begin?";
                const subheading = data.subheading ?? "Take the next step with your new site.";
                const ctaLabel = data.ctaLabel ?? "Contact us";
                return `
<section class="cta">
  <div class="container">
    <h2>${heading}</h2>
    <p>${subheading}</p>
    <a href="#contact" class="btn-primary">${ctaLabel}</a>
  </div>
</section>`;
            }
        default:
            {
                return `
<section class="unknown">
  <div class="container">
    <p>Unsupported block type: ${block.type}</p>
  </div>
</section>`;
            }
    }
}
function exportSiteToStatic(state) {
    const title = state.metadata.name || "Build With AI site";
    const description = state.metadata.description || "A site generated with Build With AI.";
    const blocksHtml = (state.pages[0]?.blocks ?? []).map((block)=>renderBlock(block)).join("\n\n");
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {{HEAD}}
</head>
<body>
  <main>
    ${blocksHtml}
  </main>
</body>
</html>`;
    const css = `
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
`;
    const head = `
<link rel="stylesheet" href="/styles.css" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
`;
    return {
        html: html.replace("{{HEAD}}", head),
        css,
        head
    };
}
}),
"[project]/buildwithai/src/lib/publisher/inject-tracking.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/lib/publisher/inject-tracking.ts
/**
 * Injects analytics tracking into final published HTML.
 *
 * Adds:
 *   <script>window.__SITE_ID__ = "..."</script>
 *   <script src="/track.js"></script>
 *
 * Injected before </head> if possible, otherwise at the top of <body>.
 */ __turbopack_context__.s([
    "injectTracking",
    ()=>injectTracking
]);
function injectTracking(html, siteId) {
    const siteIdScript = `<script>window.__SITE_ID__ = "${siteId}"</script>`;
    const trackerScript = `<script src="/track.js"></script>`;
    const injection = `${siteIdScript}\n${trackerScript}`;
    // Prefer injecting before </head>
    if (html.includes("</head>")) {
        return html.replace("</head>", `${injection}\n</head>`);
    }
    // Fallback: inject at top of <body>
    if (html.includes("<body")) {
        return html.replace(/<body(.*?)>/i, (m)=>`${m}\n${injection}`);
    }
    // Last resort: prepend
    return `${injection}\n${html}`;
}
}),
"[project]/buildwithai/src/lib/publisher/validate-tracking.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/lib/publisher/validate-tracking.ts
/**
 * Very small validation to assert the injected tracking appears in HTML.
 */ __turbopack_context__.s([
    "validateTracking",
    ()=>validateTracking
]);
function validateTracking(html) {
    if (!html) return false;
    const hasSiteId = /window\.__SITE_ID__\s*=/.test(html);
    const hasTracker = /<script[^>]+src=["']\/track\.js["'][^>]*>\s*<\/script>/.test(html);
    return Boolean(hasSiteId && hasTracker);
}
}),
"[project]/buildwithai/src/lib/publish/vercel.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "triggerVercelDeploy",
    ()=>triggerVercelDeploy
]);
const HOOK_ENV_KEY = "VERCEL_DEPLOY_HOOK_URL";
async function triggerVercelDeploy(siteId, _exported) {
    const hookUrl = process.env[HOOK_ENV_KEY];
    if (!hookUrl) {
        return {
            ok: false,
            error: `Missing ${HOOK_ENV_KEY} environment variable`
        };
    }
    try {
        const res = await fetch(hookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // Many Vercel deploy hooks ignore the body, but we include siteId for debugging.
            body: JSON.stringify({
                source: "buildwithai",
                siteId
            })
        });
        if (!res.ok) {
            return {
                ok: false,
                error: `Vercel deploy hook failed with status ${res.status}`
            };
        }
        return {
            ok: true
        };
    } catch (error) {
        return {
            ok: false,
            error: error?.message ?? "Unknown error triggering Vercel deploy"
        };
    }
}
}),
"[project]/buildwithai/src/lib/ai/changelog.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateChangelogWithOllama",
    ()=>generateChangelogWithOllama
]);
const OLLAMA_ENDPOINT = process.env.OLLAMA_ENDPOINT || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3";
function buildPrompt(input) {
    const { previous, current } = input;
    const prevVersion = previous?.version ?? null;
    const prevState = previous?.state ?? null;
    const currentVersion = current.version;
    const currentState = current.state;
    return `
You are an assistant that writes concise, human-readable changelogs for a website builder.

You will be given two JSON states:
- "previous" (may be null)
- "current"

Each state represents the full builder state of a site in a "Build With AI" platform.

Your job is to describe what changed between "previous" and "current" in clear, plain language, focusing on:
- New sections or blocks added
- Sections or blocks removed
- Text changes in key headings, subheadings, and CTAs
- Notable layout or content reorganizations
- Any high-level structural changes

If there is no previous state, write a changelog as if this is the first published version of the site.

Return:
- 2–5 short bullet points
- No markdown bullet characters (just start each line with "- ")

Previous (version: ${prevVersion ?? "none"}):
${JSON.stringify(prevState, null, 2)}

Current (version: ${currentVersion}):
${JSON.stringify(currentState, null, 2)}
`;
}
async function generateChangelogWithOllama(input) {
    try {
        const prompt = buildPrompt(input);
        const res = await fetch(`${OLLAMA_ENDPOINT}/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                prompt,
                stream: false
            })
        });
        if (!res.ok) {
            console.error("[changelog] Ollama request failed with status", res.status);
            return null;
        }
        const data = await res.json().catch(()=>null);
        const text = data?.response ?? data?.text ?? null;
        if (!text || typeof text !== "string") {
            return null;
        }
        return text.trim();
    } catch (error) {
        console.error("[changelog] Ollama error", error);
        return null;
    }
}
}),
"[project]/buildwithai/src/lib/ai/releaseNotes.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateReleaseNotesWithOllama",
    ()=>generateReleaseNotesWithOllama
]);
const OLLAMA_ENDPOINT = process.env.OLLAMA_ENDPOINT || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3";
function buildPrompt(input) {
    const { snapshot, changelog, productionUrl } = input;
    return `
You are an assistant that writes professional, concise release notes.

You will be given:
- Version number
- Timestamp
- Changelog text
- Production URL (optional)

Write a short, clear release note suitable for clients and enterprise users.

Guidelines:
- Professional tone
- 2–4 bullet points
- No marketing language
- No emojis
- No markdown formatting
- No unnecessary adjectives

Version: ${snapshot.version}
Timestamp: ${new Date(snapshot.timestamp).toISOString()}
Production URL: ${productionUrl ?? "none"}

Changelog:
${changelog ?? "No changelog available"}
`;
}
async function generateReleaseNotesWithOllama(input) {
    try {
        const prompt = buildPrompt(input);
        const res = await fetch(`${OLLAMA_ENDPOINT}/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                prompt,
                stream: false
            })
        });
        if (!res.ok) {
            console.error("[releaseNotes] Ollama request failed", res.status);
            return null;
        }
        const data = await res.json().catch(()=>null);
        const text = data?.response ?? data?.text ?? null;
        if (!text || typeof text !== "string") return null;
        return text.trim();
    } catch (error) {
        console.error("[releaseNotes] Ollama error", error);
        return null;
    }
}
}),
"[project]/buildwithai/src/lib/sites/registry.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "listSites",
    ()=>listSites,
    "registerSite",
    ()=>registerSite,
    "updateSiteTimestamp",
    ()=>updateSiteTimestamp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/kv.ts [app-route] (ecmascript)");
;
const SITE_REGISTRY_PREFIX = "buildwithai:sites";
const SITE_REGISTRY_INDEX = "buildwithai:sites:index";
async function registerSite(id, name) {
    const key = `${SITE_REGISTRY_PREFIX}:${id}`;
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].get(key);
    if (existing) return existing;
    const entry = {
        id,
        name,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].set(key, entry);
    // Add to index of sites
    try {
        const idx = await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].get(SITE_REGISTRY_INDEX);
        const nextIdx = Array.isArray(idx) ? Array.from(new Set([
            ...idx,
            id
        ])) : [
            id
        ];
        await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].set(SITE_REGISTRY_INDEX, nextIdx);
    } catch (e) {
    // ignore index update failures
    }
    return entry;
}
async function updateSiteTimestamp(id) {
    const key = `${SITE_REGISTRY_PREFIX}:${id}`;
    const entry = await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].get(key);
    if (!entry) return;
    entry.updatedAt = Date.now();
    await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].set(key, entry);
}
async function listSites() {
    const idx = await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].get(SITE_REGISTRY_INDEX);
    const entries = [];
    if (!Array.isArray(idx) || idx.length === 0) return entries;
    for (const id of idx){
        const key = `${SITE_REGISTRY_PREFIX}:${id}`;
        const entry = await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].get(key);
        if (entry) entries.push(entry);
    }
    return entries.sort((a, b)=>b.updatedAt - a.updatedAt);
}
}),
"[project]/buildwithai/src/app/api/publish/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$builder$2f$load$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/builder/load.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$export$2f$site$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/export/site.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$publisher$2f$inject$2d$tracking$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/publisher/inject-tracking.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$publisher$2f$validate$2d$tracking$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/publisher/validate-tracking.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$publish$2f$vercel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/publish/vercel.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/kv.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$ai$2f$changelog$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/ai/changelog.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$ai$2f$releaseNotes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/ai/releaseNotes.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$sites$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/sites/registry.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const PUBLISH_KEY_PREFIX = "buildwithai:site:publish:";
const PUBLISH_HISTORY_PREFIX = "buildwithai:site:publish:history:";
const VERSION_SNAPSHOT_PREFIX = "buildwithai:site:versions:";
const PUBLISH_HTML_SNAPSHOT_PREFIX = "buildwithai:site:html_snapshot:";
async function POST(req) {
    try {
        const body = await req.json().catch(()=>({}));
        const siteId = body.siteId || req.nextUrl.searchParams.get("siteId") || undefined;
        if (!siteId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing siteId"
            }, {
                status: 400
            });
        }
        const state = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$builder$2f$load$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadSiteState"])(siteId);
        if (!state) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No site state found for this siteId"
            }, {
                status: 404
            });
        }
        // Export site (currently not uploaded; used for future enhancements)
        const exported = (0, __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$export$2f$site$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["exportSiteToStatic"])(state);
        // Inject tracking into exported HTML
        const finalHtml = (0, __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$publisher$2f$inject$2d$tracking$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["injectTracking"])(exported.html, siteId);
        // Validate injection before proceeding
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$publisher$2f$validate$2d$tracking$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateTracking"])(finalHtml)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "tracking_validation_failed"
            }, {
                status: 422
            });
        }
        // Trigger Vercel Deploy Hook. In local dev we may not have a hook URL —
        // skip the remote trigger but continue the publish flow so snapshots
        // and metadata are still recorded for local validation.
        let skippedDeploy = false;
        let result = null;
        if (!process.env.VERCEL_DEPLOY_HOOK_URL) {
            console.warn("[publish] No VERCEL_DEPLOY_HOOK_URL — skipping deploy trigger (local dev)");
            skippedDeploy = true;
        } else {
            result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$publish$2f$vercel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["triggerVercelDeploy"])(siteId, exported);
            if (!result.ok) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: result.error ?? "Failed to trigger deploy"
                }, {
                    status: 500
                });
            }
        }
        // Save publish metadata
        const key = `${PUBLISH_KEY_PREFIX}${siteId}`;
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].get(key);
        const metadata = {
            siteId,
            lastPublishedAt: Date.now(),
            lastPublishedVersion: state.metadata?.version ?? null,
            lastPublishedUrl: existing?.lastPublishedUrl ?? null
        };
        await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].set(key, metadata);
        // Append to publish history
        const historyKey = `${PUBLISH_HISTORY_PREFIX}${siteId}`;
        const existingHistory = await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].get(historyKey);
        const entry = {
            version: state.metadata?.version ?? 1,
            timestamp: Date.now(),
            url: metadata.lastPublishedUrl
        };
        const nextHistory = Array.isArray(existingHistory) ? [
            ...existingHistory,
            entry
        ] : [
            entry
        ];
        await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].set(historyKey, nextHistory);
        // Store version snapshot
        const snapshotKey = `${VERSION_SNAPSHOT_PREFIX}${siteId}:${metadata.lastPublishedVersion}`;
        const baseSnapshot = {
            version: metadata.lastPublishedVersion ?? 1,
            timestamp: metadata.lastPublishedAt ?? Date.now(),
            state,
            changelog: null
        };
        // Load previous snapshot (for changelog diff)
        let previousSnapshot = null;
        if (metadata.lastPublishedVersion && metadata.lastPublishedVersion > 1) {
            const prevKey = `${VERSION_SNAPSHOT_PREFIX}${siteId}:${metadata.lastPublishedVersion - 1}`;
            const prev = await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].get(prevKey);
            if (prev && typeof prev === "object") {
                previousSnapshot = prev;
            }
        }
        // Generate changelog with Ollama (best-effort; failures are non-fatal)
        const changelog = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$ai$2f$changelog$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateChangelogWithOllama"])({
            previous: previousSnapshot,
            current: baseSnapshot
        });
        const snapshot = {
            ...baseSnapshot,
            changelog: changelog ?? null,
            releaseNotes: null
        };
        await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].set(snapshotKey, snapshot);
        // Store HTML snapshot (with tracking injected)
        if (metadata.lastPublishedVersion) {
            const htmlKey = `${PUBLISH_HTML_SNAPSHOT_PREFIX}${siteId}:${metadata.lastPublishedVersion}`;
            await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].set(htmlKey, finalHtml);
        }
        // Generate release notes (best-effort)
        const releaseNotes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$ai$2f$releaseNotes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateReleaseNotesWithOllama"])({
            snapshot,
            changelog: snapshot.changelog ?? null,
            productionUrl: metadata.lastPublishedUrl ?? null
        });
        if (releaseNotes) {
            snapshot.releaseNotes = releaseNotes;
            await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].set(snapshotKey, snapshot);
        }
        // After successful publish
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$sites$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateSiteTimestamp"])(siteId);
        return __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            publish: metadata,
            history: nextHistory
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error?.message ?? "Unexpected error in publish API"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1b63fc14._.js.map