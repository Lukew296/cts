const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; // Use environment or default to 3000

// Middleware to parse JSON bodies for API requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Route for the root URL to redirect to login page
app.get('/', (req, res) => {
res.redirect('/login.html');
});

// --- API Endpoints ---

// Login API
app.post('/api/login', (req, res) => {
const { username, password } = req.body;
console.log('Login attempt:', { username, password });

if (username === 'user' && password === 'password') {
res.status(200).json({ success: true, message: 'Login successful!', token: 'fake-jwt-token' });
} else {
res.status(401).json({ success: false, message: 'Invalid credentials.' });
}
});

// Register API
app.post('/api/register', (req, res) => {
const { username, email, password } = req.body;
console.log('Registartion attempt:', { username, email, password });

if (username && email && password) {
res.status(201).json({ success: true, message: 'Registration successful!' });
} else {
res.status(400).json({ success: false, message: 'Missing required fields.' });
}
});

// Start the server
app.listen(PORT, () => {
console.log(`Server running on http:localhost:${PORT}`);
console.log(`Access login at http://localhost:${PORT}/login.html`);
console.log(`Access register at http://localhost:${PORT}/register.html`);
console.log(`Access dashboard at http://localhost:${PORT}/dashboard.html`);
});
