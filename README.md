# TechMill Backend API

## Project Overview

TechMill Backend API is a **robust backend system** built with **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**.  
It serves as the backend for a marketplace platform, enabling secure authentication, product management, and user management functionalities.

### Objectives

- Implement secure **user registration and login** with JWT authentication.
- Enable **role-based access control** (User/Admin).
- Allow users to **create, update, delete products**.
- Allow admins to **approve or reject products**.
- Enable admins to **manage users** (ban, unban, promote to admin).
- Implement **input validation** using Zod.
- Centralized **error handling** for consistent responses.
- Dockerized development environment for portability.

---

## Features

- **User Authentication:** JWT-based login and registration.
- **Role-Based Access Control:** User and Admin roles.
- **Product Management:** Create, read, update, delete (CRUD) products.
- **Admin Approvals:** Admins can approve or reject products.
- **User Management:** Admins can list users, ban/unban, and promote users.
- **Validation:** Request body validation using Zod.
- **Error Handling:** Centralized middleware for consistent error responses.
- **Dockerized Environment:** Easy deployment and setup.

---

## Technology Stack

- Node.js & Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT for authentication
- Zod for validation
- Docker for containerized environment

---


## Instruction for Development Setup

### 1. Clone the Repository

`bash`
git clone [https://github.com/Azeezbank/techmill-backend.git]
cd techmill-backend


### 2. Environment Variables

Create a .env file in the root folder with the following values:

NODE_ENV=development
JWT_SECRET=<your_jwt_secret>
DATABASE_URL=<your_postgresql_connection_string>  This will be attach with the email body i will send for proper connection
PORT=5000


Replace <your_jwt_secret> with a secure secret key for JWT.

Replace <your_postgresql_connection_string> with your database connection string.



## Running the Application
1. Locally (without Docker)

**run** 
`npm install`

**Apply database migrations and generate Prisma client:**

`npx prisma generate`
`npx tsc`
`npm npm start`


API will run at http://localhost:5000.

2. Using Docker

Ensure you have Docker Desktop installed locally [https://www.docker.com/products/docker-desktop?utm_source=chatgpt.com].

**Run the application with**

`*docker-compose up --build*`

API will run at http://localhost:5000.

**Availablke endpoints**
Auth Routes
Method	Endpoint	        Access	Description
POST	/api/auth/register	Public	Register a new user (name, email, password).
POST	/api/auth/login	Public	Login a user and return JWT token.

Product Routes
Method	Endpoint	Access	Description
POST	/api/products/	Authenticated User	Create a new product (name, price, description, quantity).
PUT	/api/products/:id	Authenticated User	Update a product owned by the user.
DELETE	/api/products/:id	Authenticated User	Delete a product owned by the user.
GET	/api/products/my-products	Authenticated User	Get all products created by the logged-in user.
GET	/api/products/public	Public	Get all approved products (visible to everyone).
PUT	/api/products/:id/approve	Admin	Approve a product (admin only).
PUT	/api/products/:id/reject	Admin	Reject a product (admin only).

User Routes
Method	Endpoint	Access	Description
GET	/api/user/	Admin	Get all registered users.
PATCH	/api/user/ban/:id	Admin	Ban a user by ID.
PATCH	/api/user/unban/:id	Admin	Unban a user by ID.
PATCH	/api/user/make/admin/:id	Authenticated User	Promote a user to Admin.

## Headers for protected routes:

Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json


## Validation

All endpoints validate inputs using Zod schemas.

**Example rules:**

`Name: min 2 characters`

`Email: valid email format`

`Password: min 6 characters`


**Error Handling**

Centralized error handler returns:

{
  "success": false,
  "message": "Error description"
}


401: Unauthorized access

403: Forbidden access

400: Validation errors