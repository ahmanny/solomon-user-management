# solomon-user-management System
# User Management System

A **full-stack user management system** built with **Next.js, NestJS, PostgreSQL, Zustand, React Hook Form, and Tailwind CSS**. It allows users to **register, update profiles, upload profile pictures, and view details in a resume-like format**.

## 🚀 Features

- **User Authentication** (Signup)
- **Profile Management** (Edit, View,delete,view all users)
- **Multi-Step Form Wizard** for onboarding
- **State Management** with Zustand
- **Backend API** built with NestJS & PostgreSQL CRUD api
- **Responsive UI** with Tailwind CSS
- **Resume-like user profile display**

## 🛠️ Tech Stack

### **Frontend (Next.js)**
- TypeScript
- Zustand (State Management)
- React Hook Form (Form Handling)
- Tailwind CSS (Styling)

### **Backend (NestJS)**
- TypeScript
- PostgreSQL (Database)
- TypeORM (ORM)
- Multer (File Upload)

##### Installation and setup #####
1. git clone https://github.com/ahmanny/solomon-user-management.git
2. cd solomon-user-management


   #### Backend Setup ####
1. cd backend
2. npm install
3. configure .env file
   PORT=4000
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=test12345
   DATABASE_NAME=user_management_pgdb
   ##Run the backend server##
 5.npm run start:dev
   this will start the NestJS backend on http://localhost:4000.


   #### FRONTEND Setup ####
1. cd frontend
2. npm install
3. configure .env file
 NEXT_PUBLIC_API_PUBLIC_URL="http://localhost:4000"
   ##Run the fronted server##
 5.npm run dev
   this will start the NestJS backend on http://localhost:3000.


API Endpoints
Method	Endpoint	  Description
GET	   /users	Get   all users
GET	   /users/:id	  Get user by ID
POST	 /users	      Create a new user
PUT	   /users/:id	  Update user details
DELETE /users/:id	  Delete a user
Troubleshooting
1. Query Data Cannot Be Undefined
If you see an error like:

"Query data cannot be undefined. Please make sure to return a value other than undefined from your query function."

Ensure your backend server is running (http://localhost:4000).
Verify your API request function is returning valid data.
Check the API response in the browser console or Postman.

2. Database Connection Issues
Ensure PostgreSQL is running.
Verify your .env database credentials are correct.
Check if the database user_management_pgdb exists.

   Author
Ahman Solomon
