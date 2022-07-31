const router = require('express').Router();

// Set default API response
router.get('/test', function (req, res) {
    res.json({
        status: "This API is Working well  ✔",
        message: "Welcome to Yaser's Ticket Lottery System API ",
    });
});


// Import controller
var dataController = require('./../controllers/data-controller');


router.route('/create').get(dataController.createLottery);
router.route('/:lotteryid/remove').get(dataController.removeLottery);



router.route('/:lotteryid/list').post(dataController.listTickets);
router.route('/:lotteryid/generate').post(dataController.genTickets);
router.route('/:lotteryid/buy/:number').get(dataController.buyTickets);

router.route('/:lotteryid/winner/').get(dataController.checkWinningTicket);







module.exports = router;