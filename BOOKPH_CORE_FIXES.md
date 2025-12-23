# @bookph/core Package Issues (to be fixed in bookph-core repo)

## Critical Issues to Fix

### 1. ❌ REMOVE POSTINSTALL SCRIPT (BLOCKING INSTALL)

**File:** `package.json`

**Problem:**
@bookph/core has a `postinstall` script that runs `prisma generate` during dependency installation. This conflicts with bookph-web's postinstall script and fails because:

1. It tries to generate the client in a protected location
2. The consuming package (bookph-web) should control when/how to generate the client

**Terminal Error:**

```
.../node_modules/@bookph/core postinstall$ prisma generate
Generating client into /workspaces/bookph-web/node_modules/.pnpm/@bookph+core@.../node_modules/@prisma/client
This package is used by `prisma generate` and overwriting its content is not allowed.
```

**Solution:**
Remove or comment out the postinstall script from @bookph/core's package.json:

```json
{
  "scripts": {
    // "postinstall": "prisma generate"  // ❌ REMOVE THIS
  }
}
```

**Rationale:**

- bookph-web already has its own postinstall: `prisma generate --schema=./node_modules/@bookph/core/prisma/schema.prisma`
- The consuming package should control Prisma client generation
- The schema.prisma output path can remain as-is since bookph-web's postinstall will handle generation

**Impact:** BLOCKING all installs. Without removing this, `pnpm install` and `pnpm update` will fail.

---

### 2. Hardcoded Monorepo Paths

**File:** `lib/server/i18n.ts` (line 17)

**Problem:**

```typescript
const commonEN: Record<
  string,
  string
> = require("../../../apps/web/public/static/locales/en/common.json");
```

This hardcoded path assumes a monorepo structure with `apps/web/` directory, which doesn't exist when the package is installed from GitHub.

**Solution:**
Replace the hardcoded path with a configurable import or use a package-relative path:

```typescript
// Option 1: Use try/catch with fallback
let commonEN: Record<string, string> = {};
try {
  commonEN = require("../../../apps/web/public/static/locales/en/common.json");
} catch {
  // Fallback when installed as external package
  commonEN = {};
}

// Option 2: Make it configurable via environment variable
const LOCALE_PATH =
  process.env.LOCALE_PATH || "../../../apps/web/public/static/locales";
const commonEN: Record<string, string> = require(
  `${LOCALE_PATH}/en/common.json`
);

// Option 3: Remove the dependency entirely and pass translations as parameters
```

**Impact:** This breaks builds when `@bookph/core` is installed from GitHub instead of workspace.

---

### 2. Missing TypeScript Config Dependency

**File:** `features/tsconfig.json` (line 2)

**Problem:**

```json
{
  "extends": "@bookph/tsconfig/react-library.json",
  ...
}
```

The package references `@bookph/tsconfig` which is not listed in dependencies.

**Solution:**
Either:

1. Add `@bookph/tsconfig` as a dependency in `package.json`
2. Or use a standard tsconfig that doesn't rely on custom packages
3. Or include the tsconfig directly in the package

---

### 3. Package Not Built for Distribution

**Problem:**
The package contains raw TypeScript files but may not be building/compiling before distribution.

**Solution:**
Ensure the package has:

1. A `build` script in `package.json`
2. A `prepublishOnly` or `prepare` hook to build before publishing
3. Proper `main`, `module`, and `types` fields pointing to compiled output

Example `package.json`:

```json
{
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts"
}
```

---

## Recommended Approach

For packages meant to be consumed externally (via GitHub or npm), avoid:

- Hardcoded relative paths outside the package
- Dependencies on sibling packages not in npm
- Assuming specific parent directory structures

Make the package self-contained and configurable.
Replace the hardcoded path with a configurable import or use a package-relative path:

```typescript
// Option 1: Use try/catch with fallback
let commonEN: Record<string, string> = {};
try {
  commonEN = require("../../../apps/web/public/static/locales/en/common.json");
} catch {
  // Fallback when installed as external package
  commonEN = {};
}

// Option 2: Make it configurable via environment variable
const LOCALE_PATH =
  process.env.LOCALE_PATH || "../../../apps/web/public/static/locales";
const commonEN: Record<string, string> = require(
  `${LOCALE_PATH}/en/common.json`
);

// Option 3: Remove the dependency entirely and pass translations as parameters
```

**Impact:** This breaks builds when `@bookph/core` is installed from GitHub instead of workspace.

---

### 2. Missing TypeScript Config Dependency

**File:** `features/tsconfig.json` (line 2)

**Problem:**

```json
{
  "extends": "@bookph/tsconfig/react-library.json",
  ...
}
```

The package references `@bookph/tsconfig` which is not listed in dependencies.

**Solution:**
Either:

1. Add `@bookph/tsconfig` as a dependency in `package.json`
2. Or use a standard tsconfig that doesn't rely on custom packages

---

### 3. Package Not Built for Distribution

**Problem:**
The package contains raw TypeScript files but may not be building/compiling before distribution.

**Solution:**
Ensure the package has:

1. A `build` script in `package.json`
2. A `prepublishOnly` or `prepare` hook to build before publishing
3. Proper `main`, `module`, and `types` fields pointing to compiled output

Example `package.json`:

```json
{
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts"
}
```

---

## Temporary Workarounds in bookph-web

Until these are fixed in `@bookph/core`:

1. ✅ Added `@bookph/core` to `transpilePackages` in `next.config.js`
2. ⚠️ Need to add webpack plugin to redirect hardcoded paths
3. ⚠️ Or switch back to workspace dependency instead of GitHub

---

## Recommended Approach

For packages meant to be consumed externally (via GitHub or npm), avoid:

- Hardcoded relative paths outside the package
- Dependencies on sibling packages not in npm
- Assuming specific parent directory structures

Make the package self-contained and configurable.
