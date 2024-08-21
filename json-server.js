const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');
const path = require('path');

// Create server instance
const server = jsonServer.create();

// Create a router instance with the path to your database file
const router = jsonServer.router(path.join(__dirname, 'data/db.json'));

// Load custom routes
// const routes = require(path.join(__dirname, 'data/routes.json'));

// Default middlewares (logger, static, CORS, etc.)
const middlewares = jsonServer.defaults();

// Set up the server to use the default middlewares
server.use(middlewares);

// Use CORS to allow cross-origin requests
server.use(cors());

// Use JSON Server body parser to handle JSON payloads
server.use(jsonServer.bodyParser);

// Apply custom routes from routes.json
// server.use(jsonServer.rewriter(routes));



// Apply authentication rules and middleware
// server.use(rules);
 server.use(auth);

// Custom registration route
server.post('/register', (req, res) => {
  const users = router.db.get('users');
  const newUser = req.body;
  // Check if the user already exists
  const existingUser = users.find({ username: newUser.username }).value();
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push(newUser).write();
  res.status(201).json(newUser);
});

// Bind the router db to the app after initializing the router
server.db = router.db;

// Use the JSON Server router after applying middleware and authentication
server.use(router);

// Start the server on port 8000
server.listen(8000, () => {
  console.log('JSON Server is running on port 8000');
});
