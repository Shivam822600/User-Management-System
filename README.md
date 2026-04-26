# User Management System with Image Capturing

A full-stack application built with Angular and Node.js for managing users and capturing images via webcam.

## Tech Stack
- **Frontend**: Angular 17/18, Angular Material, RxJS.
- **Backend**: Node.js, Express, MongoDB.
- **Security**: JWT Authentication, Bcrypt Password Hashing, Role-Based Access Control (RBAC).

## Features
- **Admin**: Create, view, and delete users. Assign roles (Admin, Supervisor, Worker).
- **Camera**: Capture images directly from the browser, preview, and upload.
- **RBAC**: Restrictions applied to both API routes and Frontend views.

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Shivam822600/User-Management-System.git
cd User-Management-System
```

### 2. Backend Setup
1. Go to backend: `cd backend`
2. Install dependencies: `npm install`
3. Seed admin user: `node seed.js`
4. Start backend: `npm run dev`

### 3. Frontend Setup
1. Go to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Start frontend: `npm start`

## Default Admin Credentials
- **Email**: `admin@example.com`
- **Password**: `Admin123!`
