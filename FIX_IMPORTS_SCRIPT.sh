#!/bin/bash
# Script to replace @calcom imports with @bookph imports
# Run this from the bookph-web root directory

# Color codes for output
RED='\033[0:31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "Starting @calcom → @bookph import replacements..."

# Backup first (optional but recommended)
echo "Creating backup..."
tar -czf ../bookph-web-backup-$(date +%Y%m%d-%H%M%S).tar.gz . --exclude=node_modules --exclude=.git 2>/dev/null || echo "Backup skipped"

# Function to replace in files
replace_imports() {
    local from="$1"
    local to="$2"
    local desc="$3"
    
    echo -e "${GREEN}Replacing ${from} → ${to}${NC}"
    
    find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" \) \
        ! -path "*/node_modules/*" \
        ! -path "*/.next/*" \
        ! -path "*/dist/*" \
        -exec sed -i "s|${from}|${to}|g" {} +
}

# Replace all @calcom imports
replace_imports "@calcom/atoms" "@bookph/core/atoms" "Atoms components"
replace_imports "@calcom/features" "@bookph/core/features" "Features"
replace_imports "@calcom/lib" "@bookph/core/lib" "Lib utilities"
replace_imports "@calcom/trpc" "@bookph/core/trpc" "tRPC"
replace_imports "@calcom/prisma" "@bookph/core/prisma" "Prisma"
replace_imports "@calcom/app-store" "@bookph/core/app-store" "App store"
replace_imports "@calcom/emails" "@bookph/core/emails" "Emails"
replace_imports "@calcom/dayjs" "@bookph/core/dayjs" "Dayjs"
replace_imports "@calcom/embed-core" "@bookph/core/embed-core" "Embed core"
replace_imports "@calcom/ui" "@bookph/ui" "UI components"
replace_imports "@calcom/ee" "@bookph/core/ee" "Enterprise Edition"

echo -e "${GREEN}✓ Replacements complete!${NC}"

# Handle @calcom/web separately (needs manual review)
WEB_IMPORTS=$(grep -rn "@calcom/web" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.mjs" . 2>/dev/null | grep -v node_modules || true)

if [ -n "$WEB_IMPORTS" ]; then
    echo -e "${RED}⚠ WARNING: Found @calcom/web imports that need manual review:${NC}"
    echo "$WEB_IMPORTS" | head -20
    echo ""
    echo "These should be replaced with local paths or removed."
fi

# Verify no @calcom imports remain (except @calcom/web which needs manual review)
REMAINING=$(grep -rn "@calcom/" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.mjs" . 2>/dev/null | grep -v node_modules | grep -v "@calcom/web" | grep -v "eslint-disable-next-line @calcom" || true)

if [ -n "$REMAINING" ]; then
    echo -e "${RED}⚠ WARNING: Some @calcom imports still remain:${NC}"
    echo "$REMAINING" | head -10
else
    echo -e "${GREEN}✓ All @calcom imports (except @calcom/web) have been replaced!${NC}"
fi

echo ""
echo "Next steps:"
echo "1. Review @calcom/web imports manually"
echo "2. Run: pnpm dev"
echo "3. Fix any remaining import errors"
