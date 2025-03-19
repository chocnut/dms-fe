# Document Management System Frontend

Frontend application for the Document Management System built with Next.js 14.

## Tech Stack

- Next.js 14
- TypeScript
- Styled Components
- React Query
- Vitest for testing
- ESLint + Prettier for code quality

## Prerequisites

- Node.js 20.x
- pnpm 8.15.4+

## Environment Setup

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

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