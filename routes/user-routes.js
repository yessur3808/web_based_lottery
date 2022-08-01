const router = require('express').Router();

// Set default API response
router.get('/test', function (req, res) {
    res.json({
        status: "This API is Working well  ✔",
        message: "Welcome to Yaser's Ticket Lottery System API ",
        type: "User APIs"
    });
});


// Import controller
var userController = require('./../controllers/user-controller');

router.route('/create').post(userController.createUser);


module.exports = router;
