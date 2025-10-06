# Nawy Backend API

A clean, modular NestJS API for managing apartments with integrated file upload functionality, built with Prisma ORM and PostgreSQL database.

## 🏗️ Architecture Overview

The application follows a clean, modular architecture with clear separation of concerns:

```
src/
├── apartments/           # Apartment management module
│   ├── dto/             # Data Transfer Objects
│   │   ├── request/     # Request DTOs
│   │   └── response/    # Response DTOs
│   ├── apartments.controller.ts
│   ├── apartments.service.ts
│   └── apartments.module.ts
├── prisma/              # Database module (global)
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── config/              # Configuration management
│   └── configuration.ts
├── common/              # Shared utilities
│   └── dto/             # Common DTOs (pagination, etc.)
├── pipe/                # Custom validation pipes
│   └── upload-validation/
├── app.module.ts        # Main application module
└── main.ts             # Application bootstrap
```

## ✨ Key Features

### 1. **Integrated File Upload**
- **Built-in Upload Support**: File upload functionality integrated directly into apartment creation
- **Image Validation**: Custom validation pipe for file type and size validation
- **Multiple Images**: Support for up to 5 images per apartment
- **Secure Storage**: Files stored with UUID-based naming

### 2. **PostgreSQL Integration**
- **Production Ready**: Built with PostgreSQL for production environments
- **Scalable**: Better performance and concurrent access
- **Prisma ORM**: Type-safe database operations with Prisma

### 3. **Clean Code Structure**
- **Single Responsibility**: Each module has a clear, single purpose
- **Global Prisma Module**: Database service available throughout the app
- **Configuration Management**: Centralized configuration with environment variables
- **Type Safety**: Full TypeScript implementation with proper interfaces

### 4. **Comprehensive API**
- **RESTful Endpoints**: Clean REST API design
- **Swagger Documentation**: Auto-generated API documentation
- **Input Validation**: Comprehensive validation using class-validator
- **Error Handling**: Consistent error responses with proper HTTP status codes

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone and Install**
   ```bash
   cd nawy
   npm install
   ```

2. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb nawy_db
   
   # Update .env file with your database credentials
   DATABASE_URL="postgresql://username:password@localhost:5432/nawy_db?schema=public"
   ```

3. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start Development Server**
   ```bash
   npm run start:dev
   ```

## 📚 API Endpoints

### Apartment Management
- `POST /api/v1/apartments` - Create apartment (with optional image upload)
- `GET /api/v1/apartments` - List apartments (with search & filter)
- `GET /api/v1/apartments/:id` - Get apartment details

### API Documentation
- `GET /api/v1/docs` - Swagger API documentation

### Static File Serving
- `GET /uploads/:filename` - Serve uploaded images

## 🔧 Configuration

The application uses a centralized configuration system:

```typescript
// src/config/configuration.ts
export default () => ({
  port: Number(process.env.PORT) || 3000,
  app_prefix: process.env.APP_PREFIX || 'api',
  database: {
    url: process.env.DATABASE_URL,
  },
  pagination: {
    defaultPage: Number(process.env.DEFAULT_PAGE) || 1,
    defaultPageSize: Number(process.env.DEFAULT_PAGE_SIZE) || 10,
  },
  upload: {
    maxFileSize: Number(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
    maxFilesPerEntity: Number(process.env.MAX_FILES_PER_ENTITY) || 10,
    uploadPath: process.env.UPLOAD_PATH || './uploads',
    allowedMimeTypes: ['image/jpeg', 'image/png'],
  },
});
```

## 🏛️ Module Architecture

### Apartment Module
- **Purpose**: Manages apartment CRUD operations and business logic
- **Dependencies**: PrismaService (injected globally)
- **Exports**: ApartmentsService
- **Features**:
  - Create apartments with optional image uploads
  - List apartments with advanced filtering and pagination
  - Get individual apartment details
  - Integrated file upload handling

### Prisma Module (Global)
- **Purpose**: Database connection and ORM management
- **Scope**: Global module available throughout the application
- **Exports**: PrismaService
- **Features**:
  - PostgreSQL connection management
  - Type-safe database operations
  - Connection pooling and optimization

### Upload Validation Pipe
- **Purpose**: Validates uploaded files for apartments
- **Features**:
  - File type validation (JPEG, PNG only)
  - File size limits (configurable)
  - Multiple file support (up to 5 images)

## 🔍 Search & Filter Features

The apartment listing supports comprehensive search and filtering:

```typescript
// Example API calls
GET /api/v1/apartments?search=luxury&project=Downtown&minPrice=2000000&bedrooms=2
GET /api/v1/apartments?unitName=penthouse&isAvailable=true&sortBy=price&sortOrder=asc
GET /api/v1/apartments?maxArea=150&bathrooms=2&page=2&limit=5
```

**Available Filters:**
- Text search across unit name, unit number, project, description
- Exact matches: project, unit name, unit number, bedrooms, bathrooms, availability
- Range filters: price range, area range
- Pagination: page, limit
- Sorting: any field, ascending/descending

## 📁 File Upload System

### Features
- **Multiple File Support**: Upload up to 5 images per apartment
- **File Validation**: Type and size validation with custom pipe
- **Secure Storage**: UUID-based filenames prevent conflicts
- **Integrated Upload**: File upload integrated into apartment creation endpoint
- **Configurable Limits**: Adjustable file size and count limits

### Supported Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)

### File Management
- Files stored in `./uploads/` directory
- Automatic directory creation
- Database tracking of file metadata
- Static file serving through NestJS

## 🛡️ Security Features

- **Input Validation**: Comprehensive validation using class-validator
- **File Type Validation**: Only allowed image formats accepted
- **File Size Limits**: Configurable maximum file size
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **CORS Configuration**: Configurable cross-origin settings
- **Error Handling**: Secure error responses without sensitive information

## 🧪 Testing

```bash
# Run unit tests
npm run test



# Run tests in watch mode
npm run test:watch
```

## 📦 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/nawy_db?schema=public"

# Server
PORT=3000
NODE_ENV=development
APP_PREFIX=api

# Pagination
DEFAULT_PAGE=1
DEFAULT_PAGE_SIZE=10

# Upload Configuration
MAX_FILE_SIZE=5242880
MAX_FILES_PER_ENTITY=10
UPLOAD_PATH=./uploads
```

## 🚀 Production Deployment

1. **Database Setup**
   ```bash
   # Create production database
   npx prisma migrate deploy
   ```

2. **Build Application**
   ```bash
   npm run build
   ```

3. **Start Production Server**
   ```bash
   npm run start:prod
   ```

## 🔄 Database Schema

The application uses PostgreSQL with Prisma ORM:

1. **Database Schema**: Defined in `prisma/schema.prisma`
2. **Migrations**: Database migrations managed by Prisma
3. **Data Types**: Optimized for PostgreSQL data types
4. **Performance**: Better concurrent access and scalability

## 📈 Performance Optimizations

- **Global Prisma Module**: Single database connection pool
- **Efficient Queries**: Optimized Prisma queries with proper indexing
- **File Streaming**: Efficient file serving with streams
- **Pagination**: Efficient pagination for large datasets
- **Caching**: Ready for Redis integration if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Note**: This API provides a clean, maintainable, and scalable foundation for apartment management with integrated file upload functionality and PostgreSQL integration.