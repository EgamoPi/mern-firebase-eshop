const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// App middlewares

/* Development middleware */
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// CORS
app.use(
	cors({
		origin: ['http://localhost:3000'],
		credentials: true,
	})
);

/* Body Parser */
app.use(express.json());

// Routes + Autoloading routes
fs.readdirSync('./routes').map((route) => {
	app.use('/api/v1', require(`./routes/${route}`));
});
// Avoid favicon warning
app.get('/favicon.ico', (req, res) => res.status(204));

module.exports = app;
