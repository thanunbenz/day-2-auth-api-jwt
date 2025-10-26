# 🔐 Auth API JWT

User authentication API with JWT tokens, bcrypt password hashing, and protected routes using PostgreSQL.

**Part of 30 Days Backend Challenge - Day 2**

---

## 📖 Description

A RESTful authentication API built with Node.js, Express, and PostgreSQL. This project implements secure user authentication with JWT tokens, role-based access control (RBAC), and comprehensive input validation using Joi.

---

## ✨ Features

- ✅ User registration with email validation
- ✅ Login with JWT token generation
- ✅ Password hashing with bcrypt (12 salt rounds)
- ✅ JWT-based authentication
- ✅ Role-based access control (User/Admin)
- ✅ Protected routes with middleware
- ✅ Input validation with Joi
- ✅ Email format validation
- ✅ PostgreSQL database with relational schema
- ✅ Comprehensive error handling
- ✅ RESTful API design

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Database:** PostgreSQL
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Validation:** Joi
- **Security:** Helmet (ready to use)
- **Dev Tools:** Nodemon

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v14 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd day-2-auth-api-jwt
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create PostgreSQL database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE day2_auth_api_jwt;

# Exit psql
\q
```

### 4. Run database schema

```bash
psql -U postgres -d day2_auth_api_jwt -f database/schema.sql
```

### 5. Set up environment variables

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

Edit `.env` file:
```env
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=day2_auth_api_jwt
JWT_SECRET=your_super_secret_jwt_key
PORT=3000
```

> ⚠️ **Important:** Generate a strong random string for `JWT_SECRET`

### 6. Start the server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
node index.js
```

Server will be running on `http://localhost:3000`

---

## ⚙️ Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_USER` | PostgreSQL username | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | `your_password` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `day2_auth_api_jwt` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |
| `PORT` | Server port | `3000` |

---

## 🗄️ Database Schema

The database schema is located in `database/schema.sql`

### Users Table

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | SERIAL | PRIMARY KEY |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL |
| `username` | VARCHAR(50) | UNIQUE, NOT NULL |
| `password_hash` | VARCHAR(255) | NOT NULL |
| `role` | user_role ENUM | DEFAULT 'user' |
| `is_active` | BOOLEAN | DEFAULT TRUE |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### User Roles

- `user` - Regular user (default)
- `admin` - Administrator with elevated permissions

---

## 📡 API Endpoints

### Authentication Routes

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "Password123",
  "confirm_password": "Password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe"
  }
}
```

---

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "Password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Protected Routes (Require JWT Token)

#### Get User Profile
```http
GET /api/protected/profile
Authorization: Bearer <your_jwt_token>
```

**Response (200):**
```
Welcome to your profile, johndoe
```

---

#### Admin Only Route
```http
GET /api/protected/admin
Authorization: Bearer <your_jwt_token>
```

**Response (200):**
```
Welcome to your profile, admin_user
```

> 📌 **Note:** This route requires user role to be `admin`

---

### Health Check

#### Check API Status
```http
GET /health
```

**Response (200):**
```json
{
  "status": "OK"
}
```

---

## 💻 Usage Examples

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "Test1234",
    "confirm_password": "Test1234"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "Test1234"
  }'
```

**Access Protected Route:**
```bash
curl -X GET http://localhost:3000/api/protected/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## 📁 Project Structure

```
day-2-auth-api-jwt/
├── config/
│   └── database.js          # PostgreSQL connection setup
├── controllers/
│   └── auth.js              # Authentication controllers
├── database/
│   └── schema.sql           # Database schema
├── middleware/
│   ├── jwt.js               # JWT verification middleware
│   └── validation.js        # Joi validation middleware
├── routers/
│   ├── auth.js              # Authentication routes
│   └── protected.js         # Protected routes
├── .env                     # Environment variables (not in repo)
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
├── index.js                # Application entry point
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

---

## 🔒 Security Features

- **Password Hashing:** bcrypt with 12 salt rounds
- **JWT Authentication:** Secure token-based authentication
- **Input Validation:** Joi schemas for all inputs
- **Email Validation:** Built-in email format checking
- **Environment Variables:** Sensitive data stored securely
- **Role-Based Access Control:** User and admin roles
- **SQL Injection Prevention:** Parameterized queries with pg
- **Error Handling:** Comprehensive error responses

---

## 🧪 Development

### Run in development mode:
```bash
npm run dev
```

The server will automatically restart on file changes using nodemon.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with auto-reload |
| `node index.js` | Start production server |

---

## 🚧 Future Improvements

- [ ] Add refresh token mechanism
- [ ] Implement email verification
- [ ] Add password reset functionality
- [ ] Add rate limiting to prevent brute force attacks
- [ ] Implement CORS configuration
- [ ] Add API documentation with Swagger/OpenAPI
- [ ] Add unit and integration tests
- [ ] Implement request logging
- [ ] Add password strength requirements
- [ ] Multi-factor authentication (MFA)

---

## 🐛 Troubleshooting

### Common Issues

**1. Database connection error:**
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists: `psql -l`

**2. JWT token errors:**
- Ensure `JWT_SECRET` is set in `.env`
- Check token format in Authorization header: `Bearer <token>`

**3. Validation errors:**
- Check request body format matches Joi schema
- Ensure all required fields are present

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

Created as part of the **30 Days Backend Challenge**

---

## 🙏 Acknowledgments

- Part of 30 Days Backend Challenge with PostgreSQL
- Inspired by modern authentication best practices
- Built with love for learning backend development

---

## 📚 Related

This is **Day 2** of the 30 Days Backend Challenge:
- **Day 1:** Simple REST API (Todo CRUD)
- **Day 2:** Auth API JWT (Current)
- **Day 3:** Blog API with Pagination (Next)

---

**Happy Coding! 🚀**
