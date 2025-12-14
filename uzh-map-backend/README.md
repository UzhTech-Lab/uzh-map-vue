# UZH Map Backend API

NestJS backend API for the Uzhhorod Map Project.

## Tech Stack

- NestJS 11
- TypeORM
- PostgreSQL
- Swagger (API Documentation)

## Quick Start

### Using Docker (Recommended)

The backend is automatically built and started when using Docker Compose from the root directory:

```bash
docker-compose up -d
```

The API will be available at http://localhost:3003

### Local Development

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Create a `.env` file in the backend root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=uzh_map
PORT=3003
```

3. **Start PostgreSQL database:**

Using Docker:
```bash
docker-compose up -d db
```

Or use a local PostgreSQL instance.

4. **Run database migrations:**

The application uses TypeORM with `synchronize: true` in development, which automatically creates/updates the database schema.

5. **Seed the database:**

The application automatically runs seed data on startup via `SeedService`.

6. **Start the development server:**

```bash
npm run start:dev
```

The API will be available at http://localhost:3003

## API Documentation

Once the server is running, Swagger documentation is available at:

http://localhost:3003/api-docs

## Available Scripts

- `npm run start` - Start production server
- `npm run start:dev` - Start development server with hot reload
- `npm run start:debug` - Start with debugging enabled
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

## API Endpoints

### Community

- `GET /api/v1/community` - Get all communities
- `GET /api/v1/community/:id` - Get community by ID
- `GET /api/v1/community/list` - Get community names list
- `POST /api/v1/community` - Create community
- `POST /api/v1/community/full` - Create full community with related data
- `PATCH /api/v1/community/:id` - Update community
- `DELETE /api/v1/community/:id` - Delete community

### OTG Data

- `GET /api/v1/otg-data` - Get all OTG data
- `GET /api/v1/otg-data/:id` - Get OTG data by ID
- `GET /api/v1/otg-data/search` - Search OTG data

### Related Data

- `GET /api/v1/infrastructure/community/:id` - Get infrastructure for community
- `GET /api/v1/economy/community/:id` - Get economy data for community
- `GET /api/v1/education/community/:id` - Get education data for community
- `GET /api/v1/geography/community/:id` - Get geography data for community
- `GET /api/v1/population/community/:id` - Get population data for community
- `GET /api/v1/agriculture/community/:id` - Get agriculture data for community

## Database Schema

The application uses PostgreSQL with the following main entities:

- **Community** - Main community/district entity
- **Population** - Population statistics
- **Economy** - Economic data
- **Infrastructure** - Infrastructure information
- **Education** - Education places
- **Agriculture** - Agriculture places
- **Geography** - Geography places
- **OtgData** - OTG (Об'єднані територіальні громади) data

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_USERNAME` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `DB_NAME` | Database name | `uzh_map` |
| `PORT` | API server port | `3003` |

## Project Structure

```
uzh-map-backend/
├── src/
│   ├── community/        # Community module
│   ├── otg-data/         # OTG data module
│   ├── infrastructure/   # Infrastructure module
│   ├── economy/          # Economy module
│   ├── education/        # Education module
│   ├── geography/        # Geography module
│   ├── population/       # Population module
│   ├── agriculture/      # Agriculture module
│   └── main.ts           # Application entry point
├── seed/                 # Database seed data
└── test/                 # E2E tests
```

## CORS Configuration

The backend has CORS enabled for all origins in development. For production, configure specific origins in `src/main.ts`.
