# User Registration API Documentation

## Register User

Endpoint for registering a new user in the system.

### Endpoint

```
POST /users/register
```

### Request Body

| Field              | Type   | Description                           | Required |
| ------------------ | ------ | ------------------------------------- | -------- |
| fullname.firstname | String | User's first name (min. 3 characters) | Yes      |
| fullname.lastname  | String | User's last name (min. 3 characters)  | No       |
| email              | String | User's email address                  | Yes      |
| password           | String | User's password (min. 6 characters)   | Yes      |

### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Success Response

- **Status Code**: 201 (Created)
- **Response Body**:

```json
{
  "token": "jwt_token_string",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Responses

- **Status Code**: 400 (Bad Request)
  - Invalid email format
  - First name less than 3 characters
  - Password less than 6 characters
  - Missing required fields

### Validation Rules

- Email must be valid
- First name must be at least 3 characters
- Password must be at least 6 characters

## Login User

Endpoint for logging in an existing user.

### Endpoint

```
POST /users/login
```

### Request Body

| Field    | Type   | Description                         | Required |
| -------- | ------ | ----------------------------------- | -------- |
| email    | String | User's email address                | Yes      |
| password | String | User's password (min. 6 characters) | Yes      |

### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Success Response

- **Status Code**: 200 (OK)
- **Response Body**:

```json
{
  "token": "jwt_token_string",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Responses

- **Status Code**: 400 (Bad Request)
  - Invalid email format
  - Password less than 6 characters
  - Missing required fields
- **Status Code**: 401 (Unauthorized)
  - Invalid email or password

### Validation Rules

- Email must be valid
- Password must be at least 6 characters

## Get User Profile

Endpoint for retrieving the authenticated user's profile.

### Endpoint

```
GET /users/profile
```

### Headers

| Field         | Value              | Description              |
| ------------- | ------------------ | ------------------------ |
| Authorization | Bearer {jwt_token} | JWT authentication token |

### Success Response

- **Status Code**: 200 (OK)
- **Response Body**:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

### Error Responses

- **Status Code**: 401 (Unauthorized)
  - Missing authentication token
  - Invalid authentication token
  - Expired token

## Logout User

Endpoint for logging out the current user and invalidating their token.

### Endpoint

```
GET /users/logout
```

### Headers

| Field         | Value              | Description              |
| ------------- | ------------------ | ------------------------ |
| Authorization | Bearer {jwt_token} | JWT authentication token |

### Success Response

- **Status Code**: 200 (OK)
- **Response Body**:

```json
{
  "message": "Logged out successfully"
}
```

### Error Responses

- **Status Code**: 401 (Unauthorized)
  - Missing authentication token
  - Invalid authentication token
  - Expired token

### Notes

- The token will be blacklisted and cannot be used for future requests , both cookie and Authorization header tokens are cleared
