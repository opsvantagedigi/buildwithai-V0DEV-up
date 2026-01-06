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
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/operator-auth-node.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSignedSessionToken",
    ()=>createSignedSessionToken,
    "createUser",
    ()=>createUser,
    "deleteUser",
    ()=>deleteUser,
    "findUser",
    ()=>findUser,
    "loginOperator",
    ()=>loginOperator,
    "readUsers",
    ()=>readUsers,
    "setUserRole",
    ()=>setUserRole,
    "writeUsers",
    ()=>writeUsers
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/bcryptjs@3.0.3/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
;
const USER_STORE = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "data", "operator-users.json");
const SESSION_SECRET = process.env.OPERATOR_SESSION_SECRET || "dev-operator-session-secret";
async function ensureUserStoreDir() {
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(USER_STORE), {
        recursive: true
    });
}
function normalizeEmail(email) {
    return email.trim().toLowerCase();
}
async function readUsers() {
    try {
        await ensureUserStoreDir();
        const raw = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(USER_STORE, "utf8");
        return JSON.parse(raw);
    } catch (err) {
        return [];
    }
}
async function writeUsers(users) {
    await ensureUserStoreDir();
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(USER_STORE, JSON.stringify(users, null, 2), "utf8");
}
async function findUser(email) {
    const users = await readUsers();
    const key = normalizeEmail(email);
    return users.find((u)=>normalizeEmail(u.email) === key);
}
async function setUserRole(email, role) {
    const users = await readUsers();
    const key = normalizeEmail(email);
    const idx = users.findIndex((u)=>normalizeEmail(u.email) === key);
    if (idx === -1) return null;
    const updated = {
        ...users[idx],
        role
    };
    users[idx] = updated;
    await writeUsers(users);
    return updated;
}
async function deleteUser(email) {
    const users = await readUsers();
    const key = normalizeEmail(email);
    const idx = users.findIndex((u)=>normalizeEmail(u.email) === key);
    if (idx === -1) return false;
    users.splice(idx, 1);
    await writeUsers(users);
    return true;
}
async function createUser(email, password, role) {
    const users = await readUsers();
    const key = normalizeEmail(email);
    if (users.some((u)=>normalizeEmail(u.email) === key)) {
        return null;
    }
    const passwordHash = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, 10);
    const user = {
        email,
        passwordHash,
        role,
        createdAt: new Date().toISOString()
    };
    users.push(user);
    await writeUsers(users);
    return user;
}
async function loginOperator(email, password) {
    const user = await findUser(email);
    if (!user) return null;
    const ok = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(password, user.passwordHash);
    if (!ok) return null;
    return {
        email: user.email,
        role: user.role,
        ts: Date.now()
    };
}
function createSignedSessionToken(payload) {
    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signature = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac("sha256", SESSION_SECRET).update(payloadB64).digest("hex");
    return `${payloadB64}.${signature}`;
}
}),
"[project]/lib/operator-audit.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logOperatorAction",
    ()=>logOperatorAction,
    "readAudit",
    ()=>readAudit,
    "writeAudit",
    ()=>writeAudit
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
const AUDIT_STORE = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "data", "operator-audit.json");
async function ensureAuditDir() {
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(AUDIT_STORE), {
        recursive: true
    });
}
async function readAudit() {
    try {
        await ensureAuditDir();
        const raw = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(AUDIT_STORE, "utf8");
        return JSON.parse(raw);
    } catch (err) {
        return [];
    }
}
async function writeAudit(entries) {
    await ensureAuditDir();
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(AUDIT_STORE, JSON.stringify(entries, null, 2), "utf8");
}
async function logOperatorAction(entry) {
    const existing = await readAudit();
    const record = {
        id: __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomUUID(),
        ts: Date.now(),
        ...entry
    };
    existing.push(record);
    await writeAudit(existing);
    return record;
}
}),
"[project]/app/api/operator/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$operator$2d$auth$2d$node$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/operator-auth-node.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$operator$2d$audit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/operator-audit.ts [app-route] (ecmascript)");
;
;
;
const runtime = "nodejs";
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const loginAttempts = new Map();
function getClientMeta(request) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || undefined;
    const userAgent = request.headers.get("user-agent") || undefined;
    return {
        ip,
        userAgent
    };
}
function normalizeKey(email) {
    return email.trim().toLowerCase();
}
function isRateLimited(key) {
    const now = Date.now();
    const entry = loginAttempts.get(key);
    if (!entry) return false;
    if (now - entry.first > ATTEMPT_WINDOW_MS) {
        loginAttempts.delete(key);
        return false;
    }
    return entry.count >= MAX_ATTEMPTS;
}
function recordFailedAttempt(key) {
    const now = Date.now();
    const entry = loginAttempts.get(key);
    if (!entry || now - entry.first > ATTEMPT_WINDOW_MS) {
        loginAttempts.set(key, {
            count: 1,
            first: now
        });
    } else {
        loginAttempts.set(key, {
            count: entry.count + 1,
            first: entry.first
        });
    }
}
function clearAttempts(key) {
    loginAttempts.delete(key);
}
async function POST(request) {
    try {
        const body = await request.json().catch(()=>null);
        const email = body?.email;
        const password = body?.password;
        const meta = getClientMeta(request);
        if (!email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Email and password are required"
            }, {
                status: 400
            });
        }
        const key = normalizeKey(email);
        if (isRateLimited(key)) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$operator$2d$audit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logOperatorAction"])({
                action: "access-denied",
                targetEmail: email,
                details: "login rate limited",
                ...meta
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Too many login attempts. Please try again later."
            }, {
                status: 429
            });
        }
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$operator$2d$auth$2d$node$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loginOperator"])(email, password);
        if (!session) {
            recordFailedAttempt(key);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$operator$2d$audit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logOperatorAction"])({
                action: "login-failed",
                targetEmail: email,
                details: "invalid credentials",
                ...meta
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid credentials"
            }, {
                status: 401
            });
        }
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$operator$2d$auth$2d$node$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSignedSessionToken"])(session);
        const res = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
        res.cookies.set("operator_session", token, {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24
        });
        clearAttempts(key);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$operator$2d$audit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logOperatorAction"])({
            action: "login-success",
            actorEmail: session.email,
            actorRole: session.role,
            ...meta
        });
        return res;
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unexpected error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f089d453._.js.map