# 🚨 Critical Issues in bookph-web Codebase

## RESOLVED MAPPING: @calcom → @bookph

Your codebase is a Cal.com fork that's been renamed and restructured. All `@calcom/*` imports need to be updated to `@bookph/*`.

### Correct Import Mapping:

```
@calcom/atoms/*          → @bookph/core/atoms/*
@calcom/features/*       → @bookph/core/features/*
@calcom/lib/*            → @bookph/core/lib/*
@calcom/trpc/*           → @bookph/core/trpc/*
@calcom/prisma/*         → @bookph/core/prisma/*
@calcom/app-store/*      → @bookph/core/app-store/*
@calcom/emails/*         → @bookph/core/emails/*
@calcom/dayjs            → @bookph/core/dayjs
@calcom/embed-core/*     → @bookph/core/embed-core/*
@calcom/ui/*             → @bookph/ui/*
@calcom/web/*            → Keep in bookph-web or remove (cache/components local to web)
```

### Files That Need Updating (50+ locations)

Run this to see all files that need changes:

```bash
grep -r "@calcom/" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.mjs" . | grep -v node_modules | wc -l
```

### next.config.js Updates Needed

Update these sections:

**Line 218:**

```javascript
// BEFORE
optimizePackageImports: ["@calcom/ui"],

// AFTER
optimizePackageImports: ["@bookph/ui"],
```

**Lines 234-241:**

```javascript
// BEFORE
transpilePackages: [
  "@calcom/app-store",
  "@calcom/dayjs",
  "@calcom/emails",
  "@calcom/embed-core",
  "@calcom/features",
  "@calcom/lib",
  "@calcom/prisma",
  "@calcom/trpc",
],

// AFTER - Already partially done, but missing @calcom packages should be removed
transpilePackages: [
  "@bookph/core",
  "@bookph/ui",
],
```

**Lines 244-247:**

```javascript
// BEFORE
modularizeImports: {
  "@calcom/features/insights/components": {
    transform: "@calcom/features/insights/components/{{member}}",
    ...
  }
}

// AFTER
modularizeImports: {
  "@bookph/core/features/insights/components": {
    transform: "@bookph/core/features/insights/components/{{member}}",
    ...
  }
}
```

### Bulk Find-Replace Script

⚠️ **BACKUP YOUR CODE FIRST!**

```bash
# Preview changes
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" \) \
  ! -path "*/node_modules/*" \
  -exec grep -l "@calcom/" {} \;

# Apply replacements (run each carefully!)
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" \) \
  ! -path "*/node_modules/*" \
  -exec sed -i 's/@calcom\/atoms/@bookph\/core\/atoms/g' {} +

find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" \) \
  ! -path "*/node_modules/*" \
  -exec sed -i 's/@calcom\/features/@bookph\/core\/features/g' {} +

find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" \) \
  ! -path "*/node_modules/*" \
  -exec sed -i 's/@calcom\/lib/@bookph\/core\/lib/g' {} +

find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" \) \
  ! -path "*/node_modules/*" \
  -exec sed -i 's/@calcom\/trpc/@bookph\/core\/trpc/g' {} +

find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" \) \
  ! -path "*/node_modules/*" \
  -exec sed -i 's/@calcom\/prisma/@bookph\/core\/prisma/g' {} +

find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" \) \
  ! -path "*/node_modules/*" \
  -exec sed -i 's/@calcom\/app-store/@bookph\/core\/app-store/g' {} +

find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" \) \
  ! -path "*/node_modules/*" \
  -exec sed -i 's/@calcom\/emails/@bookph\/core\/emails/g' {} +

find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" \) \
  ! -path "*/node_modules/*" \
  -exec sed -i 's/@calcom\/dayjs/@bookph\/core\/dayjs/g' {} +

find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" \) \
  ! -path "*/node_modules/*" \
  -exec sed -i 's/@calcom\/embed-core/@bookph\/core\/embed-core/g' {} +

find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" \) \
  ! -path "*/node_modules/*" \
  -exec sed -i 's/@calcom\/ui/@bookph\/ui/g' {} +
```

### Handle @calcom/web Separately

`@calcom/web` imports are special - they reference components that should be in bookph-web itself. Check each one:

```bash
grep -rn "@calcom/web" --include="*.ts" --include="*.tsx" . | grep -v node_modules
```

These might need to be:

- Moved to local `@components` or `@lib`
- Or converted to `@bookph/core` if they're actually in core

### After Making Changes

1. **Verify no @calcom imports remain:**

   ```bash
   grep -r "@calcom/" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.mjs" . | grep -v node_modules
   ```

2. **Try running dev server:**

   ```bash
   pnpm dev
   ```

3. **Check for TypeScript errors:**
   ```bash
   pnpm type-check
   ```

---

## Summary

This is the main blocker. Once all `@calcom/*` imports are replaced with `@bookph/*` equivalents, the module resolution errors will be fixed and your app should compile.

### Problem

The codebase has **extensive** imports from `@calcom/*` packages that are **NOT installed**:

**Missing packages include:**

- `@calcom/atoms`
- `@calcom/features`
- `@calcom/web`
- `@calcom/app-store`
- `@calcom/dayjs`
- `@calcom/emails`
- `@calcom/embed-core`
- `@calcom/lib`
- `@calcom/prisma`
- `@calcom/trpc`
- `@calcom/ui`

### Impact

This will cause **build failures** everywhere because these modules cannot be resolved.

### Examples of Broken Imports

```typescript
// pages/_app.tsx:41
import("@calcom/features/auth/lib/getLocale");

// pages/_document.tsx:15
import("@calcom/features/auth/lib/getLocale");

// components/apps/CalendarListContainer.tsx:6-7
import { DestinationCalendarSettingsWebWrapper } from "@calcom/atoms/destination-calendar/wrappers/DestinationCalendarSettingsWebWrapper";
import { SelectedCalendarsSettingsWebWrapper } from "@calcom/atoms/selected-calendars/wrappers/SelectedCalendarsSettingsWebWrapper";

// components/apps/AppSetupPage.tsx
import("@calcom/web/components/apps/stripepayment/Setup");
import("@calcom/web/components/apps/paypal/Setup");
import("@calcom/web/components/apps/alby/Setup");
// ... and many more

// app/(use-page-wrapper)/event-types/[type]/page.tsx:9
import { EventTypeWebWrapper } from "@calcom/atoms/event-types/wrappers/EventTypeWebWrapper";

// modules/availability/troubleshoot/troubleshoot-view.tsx:10
import("@calcom/features/troubleshooter/Troubleshooter");

// components/PageWrapper.tsx:19
import "@calcom/embed-core/src/embed-iframe";

// And 50+ more locations...
```

### Solutions

**Option 1: Install Missing Packages** (if available on npm/GitHub)

```bash
pnpm add @calcom/atoms @calcom/features @calcom/web @calcom/app-store @calcom/dayjs @calcom/emails @calcom/embed-core @calcom/lib @calcom/prisma @calcom/trpc @calcom/ui
```

**Option 2: Replace with @bookph equivalents**
If Cal.com packages have been forked/renamed to @bookph:

1. Find-replace all `@calcom/` → `@bookph/core/` or `@bookph/ui/`
2. Update `next.config.js` transpilePackages
3. Verify all imports resolve

**Option 3: Remove Unused Features**
If these features aren't needed, remove the components/pages that depend on them.

---

## Issues in next.config.js

### References to Non-existent Packages

**Lines 218, 234-241, 244-245:**

```javascript
optimizePackageImports: ["@calcom/ui"],  // ❌ Package doesn't exist

transpilePackages: [
  "@calcom/app-store",      // ❌ Not installed
  "@calcom/dayjs",          // ❌ Not installed
  "@calcom/emails",         // ❌ Not installed
  "@calcom/embed-core",     // ❌ Not installed
  "@calcom/features",       // ❌ Not installed
  "@calcom/lib",            // ❌ Not installed
  "@calcom/prisma",         // ❌ Not installed
  "@calcom/trpc",           // ❌ Not installed
],

modularizeImports: {
  "@calcom/features/insights/components": {  // ❌ Package doesn't exist
    transform: "@calcom/features/insights/components/{{member}}",
    ...
  }
}
```

**Fix:** Either install these packages or replace with `@bookph/*` equivalents in all config and code files.

---

## Files Using @calcom Packages (Partial List)

**High Priority Files (currently breaking):**

- `pages/_app.tsx`
- `pages/_document.tsx`
- `pages/_error.tsx`
- `components/PageWrapper.tsx`
- `components/PageWrapperAppDir.tsx`
- `components/apps/CalendarListContainer.tsx`
- `components/apps/AppSetupPage.tsx`
- `lib/app-providers.tsx`
- `lib/app-providers-app-dir.tsx`

**App Router Pages:**

- `app/(use-page-wrapper)/event-types/[type]/page.tsx`
- `app/(use-page-wrapper)/settings/**/page.tsx` (multiple files)
- `app/(use-page-wrapper)/apps/routing-forms/**/*.tsx` (multiple files)
- `app/(use-page-wrapper)/payment/[uid]/PaymentPage.tsx`

**Modules:**

- `modules/availability/troubleshoot/troubleshoot-view.tsx`
- `modules/bookings/views/bookings-single-view.tsx`
- `modules/signup-view.tsx`
- `modules/auth/sso/direct-view.tsx`

---

## Immediate Action Required

### Priority 1: Resolve @calcom Dependencies (BLOCKING)

1. Determine if `@calcom/*` packages are:
   - Available on npm/GitHub (install them)
   - Renamed to `@bookph/*` (update imports)
   - Not needed (remove features)

2. Once decided, execute the chosen solution consistently across all files

### Priority 2: Update Configuration

1. Update `next.config.js` transpilePackages to match installed packages
2. Remove or update `optimizePackageImports` references
3. Fix `modularizeImports` paths

### Priority 3: Test Build

```bash
pnpm dev  # Should complete without module resolution errors
```

---

## Search and Replace Script

If replacing `@calcom/*` with `@bookph/*`:

```bash
# Find all occurrences (to review)
grep -r "@calcom/" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" .

# After reviewing, replace (be careful!)
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -exec sed -i 's/@calcom\//@bookph\/core\//g' {} +
```

**⚠️ Warning:** Review changes carefully before committing!

---

## Summary

The main blocker is that **your codebase imports dozens of `@calcom/*` packages that don't exist in your dependencies**. This is likely because:

1. The code was copied from Cal.com but packages weren't set up
2. Package names changed from `@calcom/*` to `@bookph/*`
3. The monorepo structure is expected but not present

**You need to decide:** Install the missing packages OR update all imports to use `@bookph/*` equivalents.
