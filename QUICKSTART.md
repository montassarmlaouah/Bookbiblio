# Quick Start Guide - Bookbiblio

This guide will help you get the Bookbiblio application running quickly.

## Prerequisites Check

Before starting, ensure you have:
```bash
# Check Java version (need 17+)
java -version

# Check Node.js version (need 18+)
node --version

# Check npm version
npm --version

# Check MySQL is running
mysql --version
```

## Step-by-Step Setup

### 1. Database Setup (2 minutes)

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE bookbiblio;

# Exit MySQL
exit
```

If using a password for MySQL root user, update `src/main/resources/application.properties`:
```properties
spring.datasource.password=your_password
```

### 2. Backend Setup (3 minutes)

```bash
# From project root directory
mvn clean install

# Start the backend (runs on http://localhost:8080/api)
mvn spring-boot:run
```

You should see:
```
Started BookbiblioApplication in X.XXX seconds
```

### 3. Frontend Setup (3 minutes)

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend (runs on http://localhost:4200)
npm start
```

You should see:
```
✔ Browser application bundle generation complete.
Initial Chunk Files | Names         | Size
...
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:4200
```

## First Steps

1. **Register a new account**
   - Click "Register" in the navigation bar
   - Fill in your details
   - You'll be automatically logged in

2. **Browse books**
   - Click "Books" to see the library
   - Use the search feature to find specific books

3. **Add books (Admin only)**
   - Regular users can only view books
   - To test admin features, manually update your user role in the database:
   ```sql
   UPDATE users SET role = 'ADMIN' WHERE username = 'your_username';
   ```
   - Logout and login again
   - You'll now see "Add Book", "Edit", and "Delete" buttons

## Testing the API

You can test the API using tools like Postman or curl:

### Register a user:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Login:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

Copy the token from the response.

### Get all books:
```bash
curl -X GET http://localhost:8080/api/books \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Common Issues

### Port Already in Use

**Backend (8080)**:
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>
```

**Frontend (4200)**:
```bash
# Find process using port 4200
lsof -i :4200

# Kill the process
kill -9 <PID>
```

### Database Connection Failed

- Ensure MySQL is running: `sudo service mysql status`
- Check database exists: `SHOW DATABASES;` in MySQL
- Verify credentials in `application.properties`

### Frontend Build Errors

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Development Workflow

1. **Backend changes**: 
   - Spring Boot DevTools provides auto-reload
   - Just save your Java files and the server will restart

2. **Frontend changes**:
   - Angular CLI provides hot reload
   - Save your TypeScript/HTML/CSS files and the browser will refresh

3. **Database schema changes**:
   - Hibernate auto-updates the schema (ddl-auto=update)
   - For production, use migrations instead

## Production Deployment

### Backend:
```bash
mvn clean package
java -jar target/bookbiblio-1.0.0.jar
```

### Frontend:
```bash
cd frontend
npm run build
# Serve files from frontend/dist/frontend with any web server
```

## Environment Variables (Production)

For production, use environment variables:

```bash
export DB_URL=jdbc:mysql://production-db:3306/bookbiblio
export DB_USERNAME=prod_user
export DB_PASSWORD=secure_password
export JWT_SECRET=your_long_random_secret_key
export CORS_ORIGINS=https://yourdomain.com
```

Update `application.properties`:
```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
jwt.secret=${JWT_SECRET}
cors.allowed.origins=${CORS_ORIGINS}
```

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API reference
- Explore the code structure in `src/` and `frontend/src/app/`

## Support

If you encounter issues:
1. Check the console logs (backend and frontend)
2. Review the documentation
3. Check MySQL error logs
4. Verify all ports are available
5. Ensure all prerequisites are installed

Happy coding! 🚀
