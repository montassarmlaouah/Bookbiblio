# Bookbiblio API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Public Endpoints

### Register User
Creates a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "type": "Bearer",
  "username": "johndoe",
  "email": "john@example.com",
  "role": "USER"
}
```

**Validation Rules:**
- username: 3-20 characters, required
- email: valid email format, required
- password: minimum 6 characters, required
- firstName: required
- lastName: required

**Error Responses:**
- `400 Bad Request`: Validation errors
- `409 Conflict`: Username or email already exists

---

### Login
Authenticates a user and returns a JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "type": "Bearer",
  "username": "johndoe",
  "email": "john@example.com",
  "role": "USER"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid credentials

---

## Protected Endpoints

All endpoints below require authentication via JWT token.

### Get All Books
Retrieves all books in the library.

**Endpoint:** `GET /books`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "978-0132350884",
    "publisher": "Prentice Hall",
    "publishedDate": "2008-08-01",
    "category": "Programming",
    "description": "A handbook of agile software craftsmanship",
    "availableCopies": 3,
    "totalCopies": 5,
    "coverImageUrl": "https://example.com/cover.jpg"
  }
]
```

---

### Get Book by ID
Retrieves a specific book by its ID.

**Endpoint:** `GET /books/{id}`

**Path Parameters:**
- `id`: Book ID (integer)

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "978-0132350884",
  "publisher": "Prentice Hall",
  "publishedDate": "2008-08-01",
  "category": "Programming",
  "description": "A handbook of agile software craftsmanship",
  "availableCopies": 3,
  "totalCopies": 5,
  "coverImageUrl": "https://example.com/cover.jpg"
}
```

**Error Responses:**
- `404 Not Found`: Book not found

---

### Search Books by Title
Searches for books by title (case-insensitive, partial match).

**Endpoint:** `GET /books/search/title?title={title}`

**Query Parameters:**
- `title`: Search term (string)

**Example:** `GET /books/search/title?title=clean`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Clean Code",
    ...
  }
]
```

---

### Search Books by Author
Searches for books by author name (case-insensitive, partial match).

**Endpoint:** `GET /books/search/author?author={author}`

**Query Parameters:**
- `author`: Search term (string)

**Example:** `GET /books/search/author?author=martin`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    ...
  }
]
```

---

### Get Books by Category
Retrieves all books in a specific category.

**Endpoint:** `GET /books/category/{category}`

**Path Parameters:**
- `category`: Category name (string)

**Example:** `GET /books/category/Programming`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "category": "Programming",
    ...
  }
]
```

---

## Admin-Only Endpoints

These endpoints require ADMIN role.

### Create Book
Creates a new book.

**Endpoint:** `POST /books`

**Authorization:** Requires ADMIN role

**Request Body:**
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "978-0132350884",
  "publisher": "Prentice Hall",
  "publishedDate": "2008-08-01",
  "category": "Programming",
  "description": "A handbook of agile software craftsmanship",
  "availableCopies": 3,
  "totalCopies": 5,
  "coverImageUrl": "https://example.com/cover.jpg"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  ...
}
```

**Error Responses:**
- `403 Forbidden`: User does not have ADMIN role
- `400 Bad Request`: Validation errors
- `409 Conflict`: Book with same ISBN already exists

---

### Update Book
Updates an existing book.

**Endpoint:** `PUT /books/{id}`

**Authorization:** Requires ADMIN role

**Path Parameters:**
- `id`: Book ID (integer)

**Request Body:**
```json
{
  "title": "Clean Code - Updated",
  "author": "Robert C. Martin",
  "isbn": "978-0132350884",
  "publisher": "Prentice Hall",
  "publishedDate": "2008-08-01",
  "category": "Programming",
  "description": "Updated description",
  "availableCopies": 2,
  "totalCopies": 5,
  "coverImageUrl": "https://example.com/cover.jpg"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Clean Code - Updated",
  ...
}
```

**Error Responses:**
- `403 Forbidden`: User does not have ADMIN role
- `404 Not Found`: Book not found
- `400 Bad Request`: Validation errors

---

### Delete Book
Deletes a book from the library.

**Endpoint:** `DELETE /books/{id}`

**Authorization:** Requires ADMIN role

**Path Parameters:**
- `id`: Book ID (integer)

**Response:** `204 No Content`

**Error Responses:**
- `403 Forbidden`: User does not have ADMIN role
- `404 Not Found`: Book not found

---

## Error Response Format

All error responses follow this format:

```json
{
  "timestamp": "2025-12-10T18:30:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/books"
}
```

## Status Codes

- `200 OK`: Successful GET, PUT requests
- `201 Created`: Successful POST request
- `204 No Content`: Successful DELETE request
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict (e.g., duplicate ISBN)
- `500 Internal Server Error`: Server error

## Rate Limiting

Currently, there are no rate limits implemented. This may be added in future versions.

## Versioning

The API is currently at version 1.0.0. Future versions may include version numbers in the URL path.

## CORS

CORS is configured to allow requests from:
- `http://localhost:4200` (Angular development server)

Additional origins can be configured in `application.properties`.

## Token Expiration

JWT tokens expire after 24 hours (86400000 milliseconds). Users need to login again to obtain a new token.

## Best Practices

1. **Always include the JWT token** in the Authorization header for protected endpoints
2. **Handle token expiration** gracefully in your client application
3. **Use HTTPS in production** to protect sensitive data
4. **Validate input data** before sending requests
5. **Handle errors appropriately** and display user-friendly messages
