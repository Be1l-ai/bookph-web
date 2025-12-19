# bookph-web

Main web application for BookPH - a booking and scheduling platform.

## Prerequisites

- Node.js 20.x or higher
- pnpm 10.x or higher
- PostgreSQL database (Supabase recommended)

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Be1l-ai/bookph-web.git
   cd bookph-web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   
   **Note**: This will automatically install `@bookph/core` and `@bookph/ui` from GitHub.

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - Database credentials
   - NextAuth settings
   - Email/SMTP settings
   - API keys for integrations

4. **Set up the database**
   
   Since this project uses `@bookph/core` for Prisma, you need to set up the database through the core package:
   
   ```bash
   # Navigate to bookph-core (if cloned separately)
   cd ../bookph-core
   npx prisma db push
   
   # OR if using node_modules version
   cd node_modules/@bookph/core
   npx prisma db push
   ```

5. **Build and run**
   ```bash
   pnpm build
   pnpm start
   
   # OR for development
   pnpm dev
   ```

6. **Access the application**
   - Web app: http://localhost:3000

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Run tests
pnpm test
```

## Environment Variables

Key variables you need to set in `.env`:

- `DATABASE_URL` - PostgreSQL connection (with pooler for Supabase)
- `DATABASE_DIRECT_URL` - Direct PostgreSQL connection for migrations
- `NEXTAUTH_SECRET` - Generate with `openssl rand -hex 32`
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for local)
- `EMAIL_FROM` - Sender email address
- `EMAIL_SERVER_*` - SMTP configuration

See `.env.example` for complete list.

## Monorepo Setup (Recommended)

For easier development, you can set up all three packages in a pnpm workspace:

```bash
# Create workspace directory
mkdir bookph-workspace
cd bookph-workspace

# Clone all repos
git clone https://github.com/Be1l-ai/bookph-core.git
git clone https://github.com/Be1l-ai/bookph-ui.git
git clone https://github.com/Be1l-ai/bookph-web.git

# Create pnpm-workspace.yaml
cat > pnpm-workspace.yaml << EOF
packages:
  - 'bookph-core'
  - 'bookph-ui'
  - 'bookph-web'
EOF

# Install all dependencies
pnpm install

# Set up database (from bookph-core)
cd bookph-core
npx prisma generate
npx prisma db push
cd ..

# Run the app
cd bookph-web
pnpm dev
```

## Troubleshooting

### Database Connection Failed
- Verify your `DATABASE_URL` in `.env`
- Ensure Prisma client is generated: `cd node_modules/@bookph/core && npx prisma generate`
- Check if database is accessible from your network

### Module Not Found Errors
```bash
pnpm install --force
```

### Prisma Client Out of Sync
```bash
# If using local workspace
cd ../bookph-core && npx prisma generate && cd ../bookph-web

# If using node_modules
cd node_modules/@bookph/core && npx prisma generate && cd ../../..
```

### Port Already in Use
```bash
# Change port in .env
NEXT_PUBLIC_WEBAPP_URL='http://localhost:3001'
# Then run: PORT=3001 pnpm dev
```