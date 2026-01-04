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
"[project]/buildwithai/src/lib/templates/blueprints/landing.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"root":{"type":"page","props":{"title":"Landing Page","sections":[{"type":"hero","props":{"headline":"Welcome to Your New Site","subheadline":"Built with AI, powered by your vision."}},{"type":"features","props":{"items":[{"title":"Fast","description":"Optimized for performance."},{"title":"Beautiful","description":"Designed with care."},{"title":"Smart","description":"AI‑powered workflows."}]}}]}}});}),
"[project]/buildwithai/src/lib/templates/blueprints/portfolio.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"root":{"type":"page","props":{"title":"Portfolio","sections":[{"type":"hero","props":{"headline":"My Work","subheadline":"A showcase of selected projects."}},{"type":"gallery","props":{"items":[{"title":"Project One","image":"/placeholder1.png"},{"title":"Project Two","image":"/placeholder2.png"},{"title":"Project Three","image":"/placeholder3.png"}]}}]}}});}),
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
"[project]/buildwithai/src/lib/builder/save.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "saveSite",
    ()=>saveSite,
    "saveSiteState",
    ()=>saveSiteState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/kv.ts [app-route] (ecmascript)");
;
const KEY_PREFIX = "buildwithai:site:";
async function saveSiteState(siteId, state) {
    const key = `${KEY_PREFIX}${siteId}`;
    // Ensure metadata exists
    const metadata = state.metadata ?? {
        id: siteId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: 1
    };
    // Increment version + update timestamp
    const nextMetadata = {
        ...metadata,
        updatedAt: Date.now(),
        version: (metadata.version ?? 0) + 1
    };
    const payload = JSON.stringify({
        ...state,
        metadata: nextMetadata
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$kv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["kv"].set(key, payload);
}
async function saveSite(siteId, state) {
    return saveSiteState(siteId, state);
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
"[project]/buildwithai/src/app/api/templates/create/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$templates$2f$blueprints$2f$landing$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/templates/blueprints/landing.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$templates$2f$blueprints$2f$portfolio$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/templates/blueprints/portfolio.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$builder$2f$save$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/builder/save.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$sites$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/buildwithai/src/lib/sites/registry.ts [app-route] (ecmascript)");
;
;
;
;
;
const BLUEPRINTS = {
    landing: __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$templates$2f$blueprints$2f$landing$2e$json__$28$json$29$__["default"],
    portfolio: __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$templates$2f$blueprints$2f$portfolio$2e$json__$28$json$29$__["default"]
};
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const templateId = searchParams.get("templateId");
    if (!templateId || !BLUEPRINTS[templateId]) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid templateId"
        }, {
            status: 400
        });
    }
    const blueprint = BLUEPRINTS[templateId];
    const siteId = crypto.randomUUID();
    // Create site metadata first, then persist the initial builder state.
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$sites$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerSite"])(siteId, `New ${templateId} site`);
    // Build a minimal BuilderState from the blueprint so it matches
    // the shape expected by `loadSiteState()` (metadata + pages).
    const pageId = crypto.randomUUID();
    const sections = blueprint?.root?.props?.sections ?? [];
    const blocks = Array.isArray(sections) ? sections.map((s)=>({
            id: crypto.randomUUID(),
            type: s.type ?? "section",
            data: s.props ?? {}
        })) : [];
    const pages = [
        {
            id: pageId,
            title: blueprint?.root?.props?.title ?? `Page 1`,
            slug: "home",
            blocks
        }
    ];
    const initialState = {
        metadata: {
            id: siteId,
            name: `New ${templateId} site`,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            version: 1
        },
        pages,
        activePageId: pageId
    };
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$src$2f$lib$2f$builder$2f$save$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveSiteState"])(siteId, initialState);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return __TURBOPACK__imported__module__$5b$project$5d2f$buildwithai$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(`${baseUrl}/builder/site/${siteId}`);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__caa7a4b1._.js.map