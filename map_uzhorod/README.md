# UZH Map Frontend

Vue.js frontend application for the Uzhhorod Map Project.

## Tech Stack

- Vue.js 3
- Vuetify 3
- Leaflet (Maps)
- Pinia (State Management)
- Axios (HTTP Client)

## Quick Start

### Using Docker (Recommended)

The frontend is automatically built and served when using Docker Compose from the root directory:

```bash
docker-compose up -d
```

The application will be available at http://localhost:3000

### Local Development

1. **Install dependencies:**

```bash
npm install
```

2. **Start development server:**

```bash
npm run serve
```

The application will be available at http://localhost:8081

The frontend is configured to proxy API requests to the local backend at `http://localhost:3003` via the Vue dev server proxy.

## Project Structure

```
map_uzhorod/
├── src/
│   ├── components/        # Vue components
│   │   ├── Map/          # Map-related components
│   │   └── Statistics/   # Statistics components
│   ├── config/           # Configuration files
│   │   └── api.js        # API client configuration
│   ├── pages/            # Page components
│   ├── services/         # API service layer
│   ├── store/            # Pinia store
│   └── assets/           # Static assets
├── public/               # Public assets
├── Dockerfile            # Docker configuration
├── nginx.conf            # Nginx configuration for production
└── vue.config.js         # Vue CLI configuration
```

## API Configuration

The frontend uses a relative API URL `/api/v1` which is proxied to the backend:

- **Development**: Proxied to `http://localhost:3003/api/v1` via Vue dev server
- **Docker**: Proxied to `http://backend:3003/api/v1` via nginx

## Available Scripts

- `npm run serve` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run prettier:fix` - Format code with Prettier

## Features

- Interactive map with Leaflet
- Community/district selection and information display
- Real-time data from backend API
- Responsive design with Vuetify
- Community boundaries visualization
- Key places markers on map

## Backend Connection

The frontend connects to the NestJS backend API. Make sure the backend is running:

- **Docker**: Backend runs automatically with `docker-compose up`
- **Local**: Start backend separately on port 3003

## Environment Variables

To use a custom API URL, create a `.env.local` file:

```
VUE_APP_API_URL=http://your-api-url/api/v1
```

By default, the frontend uses relative URLs that are proxied to the local backend.
