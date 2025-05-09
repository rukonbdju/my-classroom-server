## This is a classroom app

#### live-link: https://my-classroom-bd.web.app

#### Client Side Code: https://github.com/rukonbdju/my-classroom-client

# 🎓 My Classroom Server

**My Classroom Server** is the backend component of a comprehensive classroom management system. It facilitates seamless interactions between students and instructors, handling functionalities such as course management, assignments, and real-time communication.

## 🌐 Live Application

- **Frontend**: [my-classroom-bd.web.app](https://my-classroom-bd.web.app)
- **Client Repository**: [rukonbdju/my-classroom-client](https://github.com/rukonbdju/my-classroom-client)

## 🚀 Features

- **User Roles**: Differentiated access for students and instructors.
- **Course Management**: Create, update, and manage courses and enrollments.
- **Assignment Handling**: Instructors can post assignments; students can submit responses.
- **Real-time Communication**: Enables instant messaging between users.
- **Authentication**: Secure login and registration using JWT.
- **RESTful API**: Structured endpoints for efficient frontend-backend communication.

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Architecture**: MVC (Model-View-Controller)
- **Deployment**: Hosted on Firebase

## 📁 Project Structure

my-classroom-server/
├── controller/ # Handles request logic
├── middleware/ # Custom middleware functions
├── routes/v1/ # API route definitions
├── utilities/ # Helper functions and utilities
├── index.js # Entry point of the application
├── package.json # Project metadata and dependencies
└── README.md # Project overview and documentation

## 🧪 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rukonbdju/my-classroom-server.git
   cd my-classroom-server
