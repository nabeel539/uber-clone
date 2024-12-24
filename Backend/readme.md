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
