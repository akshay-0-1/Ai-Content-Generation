**Content Management System with History Tracking**

This system automatically tracks user history when content is generated on the site. It uses JWT-based authentication and provides a framework for recording search history entries.

## Architecture Overview

1. **Authentication System**:
   - JWT-based authentication
   - Token is provided on successful login
   - The token is used for all subsequent authenticated requests

2. **History Tracking System**:
   - Automatically tracks content generation events
   - Records user ID, content type, search query, and timestamp
   - Works with both explicit annotation and automatic detection

3. **Security Configuration**:
   - Stateless JWT-based authentication
   - Method-level security
   - Role-based access control

## API Endpoints

### Authentication

- **Register**: `POST /api/auth/register`
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

- **Login**: `POST /api/auth/login`
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
  Response includes JWT token:
  ```json
  {
    "userId": 1,
    "username": "your_username",
    "token": "eyJhbGciOiJIUzI1...",
    "roles": ["ROLE_USER"],
    "message": "Login successful",
    "success": true
  }
  ```

- **Logout**: `POST /api/auth/logout` (requires authentication)

### Content Generation

- **Generate Text**: `POST /api/content/generate/text`
  ```json
  {
    "prompt": "Your text generation prompt",
    "maxTokens": 100
  }
  ```



## Testing with Postman

1. **Register a new user**:
   - POST http://localhost:8080/api/auth/register
   - Body: `{"username": "testuser", "password": "password123"}`

2. **Login to get JWT token**:
   - POST http://localhost:8080/api/auth/login
   - Body: `{"username": "testuser", "password": "password123"}`
   - Save the token from the response

3. **Add Authorization header for subsequent requests**:
   - Header: `Authorization: Bearer your_jwt_token`

4. **Generate content**:
   - POST http://localhost:8080/api/content/generate/text
   - Body: `{"prompt": "Write a story about a dragon"}`


## Implementation Details

### Security and JWT Integration

JWT tokens are used to authenticate and identify users. The token contains the username, which is used to retrieve the user ID for history tracking.

## Configuration Properties

- `jwt.secret`: The secret key used for JWT token generation/validation
- `jwt.expiration`: Token expiration time in milliseconds (default 24 hours)

## Database Schema

The system uses the following main entities:

1. **User**:
   - id (PK)
   - username
   - password (encrypted)

2. **SearchHistory**:
   - id (PK)
   - user_id (FK)
   - type
   - search_query
   - timestamp**
