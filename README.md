# DMS Frontend

![Test Status](https://github.com/chocnut/dms-fe/actions/workflows/test.yml/badge.svg)

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

## Usage Guide

### File Upload

The system uses a mock file upload process:

1. Click the "Upload Files" button in the interface
2. When you select files from your computer:
   - The system will NOT upload your actual files
   - Instead, it will generate random mock documents
   - These mock documents will be saved to the database
   - Each document will have a randomly generated name and type

Note: This is a demo feature that simulates file upload without actually processing real files.

### Folder Management

Creating new folders:

1. Click the "New Folder" button
2. Enter a name for your folder in the input field
3. Click "Create" to save
4. The new folder will be:
   - Created in the current location
   - Saved to the database
   - Immediately visible in the interface

Folder features:
- Create folders at any level in the hierarchy
- View folder contents
- Navigate through folder structure

### File and Folder Organization

The system supports a hierarchical structure:
- Root level folders and files
- Nested subfolders
- Breadcrumb navigation for easy folder traversal

