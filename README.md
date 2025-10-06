# Nawy - Apartment Management System

A modern apartment management system built with Next.js frontend and NestJS backend, featuring a PostgreSQL database and Docker containerization.

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running

### Run the Application
```bash
# Clone the repository
git clone <your-repo-url>
cd Nawy

# Start all services with a single command
docker-compose up --build
```

That's it! The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api/v1
- **API Documentation**: http://localhost:3001/api/v1/docs

## 🏗️ Architecture

- **Frontend**: Next.js 15 with React 19 and Tailwind CSS
- **Backend**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Containerization**: Docker & Docker Compose

## 📁 Project Structure

```
Nawy/
├── nawy-frontend/          # Next.js frontend application
├── nawy-backend/           # NestJS backend API
├── docker-compose.yaml     # Docker services configuration
├── DOCKER_SETUP.md         # Detailed Docker setup guide
└── README.md              # This file
```

## 🛠️ Development

### Docker Commands
```bash
# Start all services
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📚 API Documentation

Once the application is running, visit http://localhost:3001/api/v1/docs for interactive API documentation.

## 🗄️ Database

- **Type**: PostgreSQL
- **Port**: 15433
- **Database**: nawy_db
- **Credentials**: postgres/nawy123

## 📝 Features

- Apartment listing and management
- Image upload and storage
- Pagination and filtering
- Responsive design
- API documentation with Swagger
- Docker containerization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

For detailed setup instructions, see the individual README files in the frontend and backend directories.
