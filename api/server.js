const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Allow server to read from .env file
dotenv.config();

const app = require('./app');

// Connect to DB
mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('[+]..Connected to DB');
	})
	.catch((error) => {
		console.log(error);
	});

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server is running on port : ${port}`);
});
