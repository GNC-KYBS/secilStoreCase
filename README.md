# Seçil Store Case

A modern e-commerce collection management application built with Next.js, featuring authentication.

## Core Technologies

- **Framework:** Next.js 15.4.6
- **Authentication:** NextAuth.js 5.0
- **State Management:** Zustand
- **Language:** TypeScript
- **Styling:** Material-UI (MUI)
- **Drag & Drop:** @dnd-kit
- **Container:** Docker
- **Deployment:** Docker Compose for local deployment

## Features

- 🔐 User authentication with NextAuth.js
- 📱 Material-UI design
- 📊 Product catalog with table views
- 🐳 Docker containerization
- ⚡ Turbopack for fast development

## Prerequisites

- Node.js 18+
- Docker and Docker Compose
- npm, yarn, pnpm, or bun

## Quick Start

### Option 1: Local Development

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Option 2: Docker Deployment

1. Build and run with Docker Compose:

```bash
docker-compose up --build
```

2. Access the application at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── api/            # API routes
│   ├── collections/    # Collection management pages
│   └── login/         # Authentication pages
├── components/         # Reusable UI components
├── store/             # Zustand state management
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Environment Setup

Create a `.env` file in the root directory with your NextAuth configuration:

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```
