# Apartment Management API - Refactored

A clean, modular NestJS API for managing apartments with separated upload functionality, built with Prisma ORM and PostgreSQL database.

## 🏗️ Architecture Overview

The application follows a clean, modular architecture with clear separation of concerns:

```
src/
├── apartments/           # Apartment management module
│   ├── dto/             # Data Transfer Objects
│   ├── apartments.controller.ts
│   ├── apartments.service.ts
│   └── apartments.module.ts
├── upload/              # File upload module (separated)
│   ├── upload.controller.ts
│   ├── upload.service.ts
│   └── upload.module.ts
├── prisma/              # Database module (global)
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── config/              # Configuration management
│   └── configuration.ts
├── app.module.ts        # Main application module
└── main.ts             # Application bootstrap
```

## ✨ Key Improvements

### 1. **Separated Upload Logic**
- **Dedicated Upload Module**: File upload functionality is now in its own module
- **Reusable Service**: Upload service can be used by any entity type
- **Clean Separation**: Apartment module focuses only on apartment business logic

### 2. **PostgreSQL Integration**
- **Production Ready**: Switched from SQLite to PostgreSQL
- **Scalable**: Better performance and concurrent access
- **Production Database**: Suitable for production environments

### 3. **Clean Code Structure**
- **Single Responsibility**: Each module has a clear, single purpose
- **Global Prisma Module**: Database service available throughout the app
- **Configuration Management**: Centralized configuration with environment variables
- **Type Safety**: Full TypeScript implementation with proper interfaces

### 4. **Improved Error Handling**
- **Consistent Error Responses**: Standardized error handling across modules
- **Proper HTTP Status Codes**: Appropriate status codes for different scenarios
- **Validation**: Comprehensive input validation with detailed error messages

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
- `POST /api/apartments` - Create apartment
- `GET /api/apartments` - List apartments (with search & filter)
- `GET /api/apartments/:id` - Get apartment details
- `PATCH /api/apartments/:id` - Update apartment
- `DELETE /api/apartments/:id` - Delete apartment

### File Upload (Separate Module)
- `POST /api/upload/apartments/:id/images` - Upload apartment images
- `GET /api/upload/images/:filename` - Serve images
- `DELETE /api/upload/images/:fileId` - Delete single image
- `DELETE /api/upload/apartments/:id/images` - Delete all apartment images

## 🔧 Configuration

The application uses a centralized configuration system:

```typescript
// src/config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFilesPerEntity: 10,
    uploadPath: './uploads',
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  },
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  },
});
```

## 🏛️ Module Architecture

### Apartment Module
- **Purpose**: Manages apartment CRUD operations and business logic
- **Dependencies**: PrismaService (injected globally)
- **Exports**: ApartmentsService

### Upload Module
- **Purpose**: Handles file uploads for any entity type
- **Dependencies**: PrismaService, ConfigService (injected globally)
- **Exports**: UploadService
- **Features**: 
  - Generic file upload for any entity
  - File validation and size limits
  - Automatic cleanup on errors
  - Configurable upload settings

### Prisma Module (Global)
- **Purpose**: Database connection and ORM management
- **Scope**: Global module available throughout the application
- **Exports**: PrismaService

## 🔍 Search & Filter Features

The apartment listing supports comprehensive search and filtering:

```typescript
// Example API calls
GET /api/apartments?search=luxury&project=Downtown&minPrice=2000000&bedrooms=2
GET /api/apartments?unitName=penthouse&isAvailable=true&sortBy=price&sortOrder=asc
GET /api/apartments?maxArea=150&bathrooms=2&page=2&limit=5
```

**Available Filters:**
- Text search across unit name, unit number, project, description
- Exact matches: project, unit name, unit number, bedrooms, bathrooms, availability
- Range filters: price range, area range
- Pagination: page, limit
- Sorting: any field, ascending/descending

## 📁 File Upload System

### Features
- **Multiple File Support**: Upload up to 10 images per apartment
- **File Validation**: Type and size validation
- **Secure Storage**: UUID-based filenames prevent conflicts
- **Automatic Cleanup**: Files deleted when apartment is removed
- **Configurable Limits**: Adjustable file size and count limits

### Supported Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### File Management
- Files stored in `./uploads/` directory
- Automatic directory creation
- Database tracking of file metadata
- Cleanup on entity deletion

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

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

## 📦 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/nawy_db?schema=public"

# Server
PORT=3000
NODE_ENV=development

# Upload Configuration
MAX_FILE_SIZE=5242880
MAX_FILES_PER_ENTITY=10
UPLOAD_PATH=./uploads

# CORS Configuration
CORS_ORIGIN=*
CORS_METHODS=GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS
CORS_CREDENTIALS=true
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

## 🔄 Migration from SQLite

The codebase has been refactored to use PostgreSQL:

1. **Database Schema**: Updated Prisma schema for PostgreSQL
2. **Connection String**: Changed from SQLite to PostgreSQL format
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

**Note**: This refactored version provides a clean, maintainable, and scalable foundation for apartment management with separated concerns and PostgreSQL integration.