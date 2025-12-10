# Bookbiblio - Library Management System

A full-stack web application for managing a book library with user authentication and authorization.

## Technologies Used

### Backend
- **Spring Boot 3.3.6** - Java-based backend framework
- **Spring Security + JWT** - Authentication and authorization
- **JPA/Hibernate** - Database ORM for entity management
- **MySQL** - Relational database
- **Maven** - Dependency management and build tool

### Frontend
- **Angular 17 (Standalone)** - Modern frontend framework with standalone components
- **Bootstrap 5** - Responsive UI framework
- **RxJS** - Reactive programming for HTTP requests

## Features

### User Management
- User registration with email validation
- Secure login with JWT token-based authentication
- Role-based access control (USER and ADMIN roles)
- Persistent login state using local storage

### Book Management
- Browse all books in the library
- Search books by title, author, or category
- View detailed information about each book
- Admin capabilities:
  - Add new books
  - Edit existing books
  - Delete books
  - Track available copies

### Security
- JWT token authentication
- HTTP interceptor for automatic token inclusion
- Route guards for protected pages
- Password encryption with BCrypt
- CORS configuration for frontend-backend communication

## Project Structure

```
Bookbiblio/
├── src/                          # Backend source code
│   └── main/
│       ├── java/
│       │   └── com/bookbiblio/app/
│       │       ├── config/       # Security and application configuration
│       │       ├── controller/   # REST API endpoints
│       │       ├── dto/          # Data Transfer Objects
│       │       ├── entity/       # JPA entities
│       │       ├── repository/   # Data access layer
│       │       ├── security/     # JWT and authentication filters
│       │       └── service/      # Business logic
│       └── resources/
│           └── application.properties
├── frontend/                     # Angular application
│   └── src/
│       └── app/
│           ├── components/       # UI components
│           ├── models/           # TypeScript interfaces
│           └── services/         # HTTP and authentication services
└── pom.xml                       # Maven configuration
```

## Prerequisites

- **Java 17** or higher
- **Node.js 18+** and npm
- **MySQL 8.0** or higher
- **Maven 3.6+**

## Installation and Setup

### 1. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE bookbiblio;
```

Update the database credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bookbiblio?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 2. Backend Setup

Navigate to the project root directory:

```bash
# Install dependencies and build the project
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080/api`

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The Angular application will start on `http://localhost:4200`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Books (Protected Routes)
- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get book by ID
- `POST /api/books` - Create a new book (Admin only)
- `PUT /api/books/{id}` - Update a book (Admin only)
- `DELETE /api/books/{id}` - Delete a book (Admin only)
- `GET /api/books/search/title?title={title}` - Search books by title
- `GET /api/books/search/author?author={author}` - Search books by author
- `GET /api/books/category/{category}` - Get books by category

## Default User Roles

The application supports two user roles:
- **USER**: Can view and search books
- **ADMIN**: Can perform all USER actions plus create, edit, and delete books

To create an admin user, you can:
1. Register a normal user
2. Manually update the role in the database to 'ADMIN'

## Configuration

### JWT Configuration
The JWT secret and expiration time can be configured in `application.properties`:

```properties
jwt.secret=your_base64_encoded_secret_key
jwt.expiration=86400000  # 24 hours in milliseconds
```

### CORS Configuration
Allowed origins for CORS can be configured in `application.properties`:

```properties
cors.allowed.origins=http://localhost:4200
```

## Build for Production

### Backend
```bash
mvn clean package
java -jar target/bookbiblio-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
```

The production build will be available in `frontend/dist/frontend`

## Development

### Backend Development
- The application uses Spring Boot DevTools for hot reload
- Database schema is automatically created/updated using Hibernate DDL

### Frontend Development
- Angular CLI provides hot reload during development
- Run `npm run build` to create a production build
- Run `npm test` to execute unit tests

## Security Considerations

- JWT tokens are stored in browser's local storage
- All passwords are encrypted using BCrypt
- CSRF protection is disabled (using JWT tokens)
- CORS is configured to accept requests from the Angular frontend
- All book management endpoints require authentication
- Admin endpoints have additional role-based authorization

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check database credentials in `application.properties`
   - Ensure the database `bookbiblio` exists

2. **CORS Errors**
   - Verify the frontend URL in `cors.allowed.origins` matches your Angular dev server
   - Check that both backend and frontend are running on correct ports

3. **JWT Token Errors**
   - Clear browser local storage and login again
   - Verify JWT secret is properly configured

4. **Build Errors**
   - Ensure Java 17+ and Node.js 18+ are installed
   - Run `mvn clean install` and `npm install` to refresh dependencies

## License

This project is open source and available for educational purposes.

## Contributors

- Montassar Mlaouah

## Support

For issues or questions, please create an issue in the GitHub repository.
