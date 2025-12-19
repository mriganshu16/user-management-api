const express = require('express');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
let users = [];
let nextId = 1;

function sanitizeUser(user) {            //helper tp hide password
   const {password, ...safe} = user;
  return safe;
}

//Create EndPoints

app.post('/users', (req, res) => {
  const { name, email, password, role } = req.body;

  //basic validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  //prevent duplicate emails
  const exists= users.some((u) => u.email === email.toLowerCase());
  if (exists) {
    return res.status(409).json({ error: 'Email already in use' });
  }

  const newUser = { 
    id: nextId++,
    name,
    email: email.toLowerCase(),
    password, //hash to be used later
    role : role || 'user',
  };
  users.push(newUser);
  res.status(201).json(sanitizeUser(newUser));
});

// Sample route
/*app.get('/ping', (req, res) => {
  res.send('Pong');
});*/

//GET /USERS
app.get('/users', (req, res) => {
  const safeUsers = users.map((user) => sanitizeUser(user)); 
  //users is your in-memory array
  //map loops through every user§
  //SanitizeUser removes password
  //result is a new array of safe users

  res.status(200).json(safeUsers);
});

//GET /USERS/:ID
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id); //req.params.id is the value from the URL :id, if URL is /users/3 then req.params.id is "3"(string)
  // If id is not a valid number
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(sanitizeUser(user));
});
/*Number(req.params.id)
	•	Convert "3" to 3 because your IDs are numbers

users.find(...)
	•	Looks through array and returns the first match

Status codes
	•	400 if the id isn’t even a number
	•	404 if id is valid but user doesn’t exist
	•	200 if found

Noob mistake:
	•	returning 200 with {} when user not found (confusing and wrong)*/



// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});