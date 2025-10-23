# LIS - Laboratory Information System

A comprehensive Laboratory Information System built with Spring Boot, React, and PostgreSQL.

## Project Structure

```
test_lis/
├── backend/                 # Spring Boot backend application
├── frontend/                # React frontend application
├── docker-compose.yml       # Docker configuration for PostgreSQL
└── README.md
```

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Build Tool**: Maven
- **Database**: PostgreSQL 15
- **ORM**: Spring Data JPA / Hibernate
- **Security**: Spring Security + JWT
- **Database Migration**: Flyway
- **API Documentation**: SpringDoc OpenAPI (Swagger)

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context API + React Query
- **Form Handling**: Formik + Yup
- **UI Library**: Material-UI
- **Notifications**: React Toastify

### Database
- **RDBMS**: PostgreSQL 15
- **Admin Tool**: pgAdmin 4 (included in docker-compose)

## Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- Maven 3.8+
- Docker and Docker Compose (for PostgreSQL)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd test_lis
```

### 2. Start Database Services

Start PostgreSQL and pgAdmin using Docker Compose:

```bash
docker-compose up -d
```

This will start:
- PostgreSQL on port 5432
- pgAdmin on port 5050 (http://localhost:5050)
  - Email: admin@lis.com
  - Password: admin

### 3. Backend Setup

Navigate to the backend directory and run:

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend API will be available at:
- **API Base URL**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/api/swagger-ui.html
- **API Docs**: http://localhost:8080/api/api-docs

### 4. Frontend Setup

Navigate to the frontend directory and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will be available at:
- **Frontend URL**: http://localhost:3000

## Default Credentials

Currently, you need to add a user manually to the database or create a registration endpoint. The system uses BCrypt password encoding.

## API Documentation

Once the backend is running, visit the Swagger UI at:
http://localhost:8080/api/swagger-ui.html

## Database Schema

The application includes the following main tables:

- **users** - System users (lab technicians, doctors, admins)
- **roles** - User roles
- **patients** - Patient information
- **test_catalog** - Available laboratory tests
- **samples** - Sample tracking
- **test_orders** - Test orders for patients
- **test_results** - Test results

## Development

### Backend Development

- Use Spring Boot DevTools for hot reload
- Run tests: `mvn test`
- Build: `mvn clean package`

### Frontend Development

- Hot reload is enabled by default with Vite
- Run linter: `npm run lint`
- Build for production: `npm run build`

## Project Features

### Implemented
- User authentication with JWT
- Role-based access control
- Patient management (CRUD operations)
- Test catalog management
- Sample tracking
- Test order management
- Test result management
- RESTful API with proper error handling
- Database migrations with Flyway
- Responsive React frontend
- Protected routes
- API documentation with Swagger

### Coming Soon
- Advanced search and filtering
- Report generation (PDF)
- Dashboard analytics
- Barcode generation for samples
- Email notifications
- Audit logging
- Advanced statistics and charts

## Environment Variables

### Backend (.env or application.properties)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/lis_db
spring.datasource.username=lis_user
spring.datasource.password=lis_password
jwt.secret=YourSuperSecretKey
jwt.expiration=86400000
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=LIS Application
```

## Deployment

### Backend
```bash
cd backend
mvn clean package
java -jar target/lis-backend-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
# Serve the 'build' directory with your preferred web server
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository.
