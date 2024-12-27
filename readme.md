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

### ** Captain Endpoints**

## Register Captain

Create a new captain account with vehicle details.

#### `POST /captains/register`

#### Request Headers

| Field        | Type   | Description      |
| ------------ | ------ | ---------------- |
| Content-Type | String | application/json |

#### Request Body

| Field               | Type   | Required | Description         |
| ------------------- | ------ | -------- | ------------------- |
| fullname.firstname  | String | Yes      | Min 3 chars         |
| fullname.lastname   | String | No       | Min 3 chars         |
| email               | String | Yes      | Valid email         |
| password            | String | Yes      | Min 6 chars         |
| vehicle.color       | String | Yes      | Min 3 chars         |
| vehicle.plate       | String | Yes      | Min 3 chars         |
| vehicle.capacity    | Number | Yes      | Min 1               |
| vehicle.vehicleType | String | Yes      | car/motorcycle/auto |

#### Example Request

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Success Response

- **Status Code**: 201 (Created)
- **Response Body**:

```json
{
  "captain": {
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "jwt_token_string"
}
```

### Error Responses

- **Status Code**: 400 (Bad Request)
- **Response Body**:

```json
{
  "message": "Captain already exists"
}
```

### Validation Rules

- Invalid email format
- First name less than 3 characters
- Password less than 6 characters
- Vehicle color less than 3 characters
- Vehicle plate less than 3 characters
- Invalid vehicle type
- Missing required fields

## Login Captain

Authenticate an existing captain account.

#### `POST /captains/login`

### Request Body

| Field    | Type   | Description                            | Required |
| -------- | ------ | -------------------------------------- | -------- |
| email    | String | Captain's email address                | Yes      |
| password | String | Captain's password (min. 6 characters) | Yes      |

```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

### Success Response

- **Status Code**: 200 (OK)

```json
{
  "captain": {
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  },
  "token": "jwt_token_string"
}
```

### Error Response

- **Status Code**: 401 (Unauthorized)

```json
{
  "message": "Invalid email or password"
}
```

### Get Captain Profile

Retrieve authenticated captain's profile information.

### Endpoint

#### `GET /captains/profile`

### Request Headers

| Header          | Type   | Description                  | Required |
| --------------- | ------ | ---------------------------- | -------- |
| `Authorization` | string | JWT token for authentication | `true`   |

### Response

- **Status Code**: 200 (OK)

```json
{
  "captain": {
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

### Error Response

- **Status Code**: 401 (Unauthorized)

```json
{
  "message": "Unauthorized"
}
```

## Logout Captain

Log out the currently authenticated captain.

### Endpoint

#### `GET /captains/logout`

### Headers

| field           | value              | Description |
| --------------- | ------------------ | ----------- |
| `Authorization` | Bearer {jwt_token} | JWT token   |

### Response

- **Status Code**: 200 (OK)

```json
{
  "message": "Logged out successfully"
}
```

### Error Response

- **Status Code**: 401 (Unauthorized)

```json
{
  "message": "Unauthorized"
}
```

### Notes

- Token will be blacklisted after logout
- Both cookie and Authorization header tokens are cleared
- Blacklisted tokens cannot be reused
