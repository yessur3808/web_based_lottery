// DEPENDENCIES
const cors = require('cors');
// Import express server for Node
const express = require('express');
// Import Body parser
const bodyParser = require('body-parser');

const cron = require('node-cron');
const axios = require('axios').default;

var uuid = require('uuid');

// Import Mongoose for a later version of the API for a noSQL solution
/*  
let mongoose = require('mongoose');
*/

// connect to the database via mongoose and set the connection variable
/* 
mongoose.connect('mongodb://localhost/testdb',{
   useNewUrlParser: true,
   useUnifiedTopology: true
}); 
*/

// Initialize the app
let app = express();

// Import routes
let lotteryRoutes = require("./routes/ticket-routes");
let userRoutes = require("./routes/user-routes");

app.use(express.json({ limit: '300mb' }));
app.use(express.urlencoded({ limit: '300mb', extended: true }));

// Remove Cors Policy Issue
app.use(cors());

// Setup server port
var port = process.env.port || 3030;

// Send message for default URL
app.get('/test', (req, res) => res.json({
    status: "The API is Working",
    message: "Welcome to Yaser's Ticket Lottery System API "
}));

// Use Api routes in the App
app.use('/api/lottery', lotteryRoutes);
app.use('/api/user', userRoutes);

// Launch the app to listen to the specified port
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);

    const request = axios.create({baseURL: 'http://localhost:'+port})

    cron.schedule('* * * * *', () => {

        // run a scheduler to run a new lottery every minute
        request.get('/api/lottery/create')
        .then((res) => {
            console.log('response is ', res.data);
        });


    });
});


