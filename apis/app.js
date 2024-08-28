const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 5000

const propertyRoutes = require('./Routes/property.routes');
const userRoutes = require('./Routes/user.routes');
const loginRoutes = require('./Routes/login.routes');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/property', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(req.status || 404).json({
        message: "No such route exists"
    })
});

// error handler
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).json({
        message: "Error Message"
    })
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})