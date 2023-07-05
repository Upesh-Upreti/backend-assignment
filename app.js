const express = require('express');
const cors = require('cors');
const sequelize = require('./utils/database');
require('dotenv').config();

const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.get('/', (req, res) => {
    res.send('<h1>Upesh Upreti</h1>');
});

//routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/user', require('./routes/users'));
app.use('/api/v1/admin', require('./routes/admin'));
app.use('/api/v1/products', require('./routes/products'));

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

const syncDatabase = async () => {
    await sequelize.sync()
};

syncDatabase();
