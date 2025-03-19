# Document Management System Frontend

Frontend application for the Document Management System built with Next.js 14.

## Tech Stack

- Next.js 14
- TypeScript
- Styled Components
- React Query
- Zustand

## Environment Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Configure your environment variables in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

The `.env.local` file is used for local development and is not committed to version control. For production, set these environment variables on your hosting platform.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format
```

## Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```