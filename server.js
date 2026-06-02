require('dotenv').config();  // .env file se environment variables ko load krna

const app = require('./src/app');


app.listen(5000, () => {
    console.log('Server is running on port 5000');   
});