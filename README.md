# user-management-api
will merge with RideProApp later
USER MANAGEMENT REST API - BUILD PLAN (V1)

1) Setup Express server
   - GET /ping -> pong

2) Create in-memory users array
   - fields: id, name, email, password, role, createdAt

3) CRUD APIs
   - POST /users        (create user) + validation (name/email/password required)
   - GET /users         (get all users) (hide password)
   - GET /users/:id     (get by id) (hide password)
   - PUT /users/:id     (update user) (cannot update id)
   - DELETE /users/:id  (delete user)

4) Extra
   - Prevent duplicate emails
   - Basic error responses and status codes

5) Test all in Postman

6) Refactor later
   - routes/users.js
   - controllers/userController.js
   - middleware/errorHandler.js
   - middleware/validate.js

7) Upgrade later
   - MongoDB + Mongoose
   - bcrypt password hashing
   - JWT login + auth middleware
