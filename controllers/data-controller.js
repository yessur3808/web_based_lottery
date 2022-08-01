const { generateTickets, randomInteger, randomID } = require('../utils/utils.js');
const fs = require('fs');
const moment = require('moment');

// Method for listing tickets
exports.listTickets = (req, res) => {
    fs.readFile('./data/lottery.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error occurred: ",err);
            if(res){ res.status(400).send({msg:'There was an error while Listing out the current tickets', error: err}); }                
            return;
        }
        var cur_lottery = findCurrentLottery(req, res, (data) => {
            console.log('buy data ', data);
        });
    



    });

}

// Method for generating unique tickets
exports.genTickets = (req, res) => {
    generateTickets();
}

exports.buyTickets = (req, res) => {
    var numTickets = req.params.number ? req.params.number : 1;
    var cur_lottery = findCurrentLottery(req, res, (data) => {
        console.log('buy data ', data);
    });


 
    
    

}


// functin to create a new lottery
exports.createLottery = async (req,res) => {
    await removeOldLotteries(undefined, undefined, async function(){
        await createNewLottery(req,res);
    });
    


   
}

exports.removeLottery = (req,res) => {
    removeOldLotteries(req,res);
   


}

// Method for checking winning ticket
exports.checkWinningTicket = (req, res) => {
    if(req && req.params && req.params.ticketid){
        var usersTicket = req.params.ticketid;

        fs.readFile('./data/lottery.json', 'utf8', (err, data) => {
            if (err) {
                console.error("Error occurred: ",err);
                if(res){
                    res.status(400).send({msg:'There was an error', error: err});
                }                
                return;
            }

            var lottery_data = JSON.parse(data);
            var winner_lottery = lottery_data.lottery_list[lottery_data.current_lottery].winner;
            var winning_ticket_lottery = lottery_data.lottery_list[lottery_data.current_lottery].winning_ticket;

            const winObj = {
                winner: winner_lottery,
                winning_ticket_lottery: winning_ticket_lottery
            };

            res.status(200).json(winObj);
        });

    }
}



const findCurrentLottery = (req, res, callback) => {
    try {
        fs.readFile('./data/lottery.json', 'utf8', (err, data) => {
            if (err) {
                console.error("Error occurred: ",err);
                if(res){
                    res.status(400).send({msg:'There was an error', error: err});
                }
                
                return;
            }
            var lottery_data = JSON.parse(data);
            var current_lottery_Id = lottery_data.current_lottery;
            var current_lottery = lottery_data.lottery_list[current_lottery_Id];

            if(current_lottery){
                if(res){
                    console.log("file overwritten successfully");
                    res.status(200).json(current_lottery);
                }
                callback(current_lottery);
            }else{
                if(res){
                    res.status(400).send({msg:'There was an error', error: err});
                }
            }

        });
       
    } catch (e) {
        console.error('Error: ', e);
    }
}



async function createNewLottery(req,res){
    const lottery_id =  randomID(6,'aA0');
    let new_tickets = await generateTickets();
    const new_lottery = {
        "id": lottery_id,
        "name": "Lottery #"+lottery_id,
        "draw_tickets":[...new_tickets],
        "winning_ticket":"",
        "winner":"",
        "created_at": moment().format('DD/MM/YYYY - HH:mm:ss')
    };

    const rand_ticket_num = randomInteger(0, new_lottery.draw_tickets.length-1);
    let rand_winning_ticket = new_lottery.draw_tickets[rand_ticket_num];
    new_lottery.winning_ticket = rand_winning_ticket;
    new_lottery.winning_ticket.idx = rand_ticket_num;
    new_lottery.winner = rand_winning_ticket.purchased_by;

    fs.readFile('./data/lottery.json', 'utf8', function (err, data) {
        if (err) {
            console.error("Error occurred: ",err);
            res.status(400).send({msg:'There was an error', error: err});
            return;
          }
        var cur_data = JSON.parse(data);
        cur_data.lottery_list[lottery_id] = new_lottery;
        cur_data.current_lottery = lottery_id;
        fs.writeFile('./data/lottery.json', JSON.stringify(cur_data), { flag: "w" }, err0 => {
            if (err0) {
              console.error(err0);
              res.status(400).send({msg:'There was an error while creating a new lottery', error: err0});
              return;
            }
            // file written successfully
            res.status(200).json(cur_data);
          });
    });
    return new_lottery;
}


async function removeOldLotteries(req,res, callback){
    fs.readFile('./data/lottery.json', 'utf8', function (err, data) {
        if (err) {
            console.error("Error occurred: ",err);
            if(res){
                res.status(400).send({msg:'There was an error while removing previous lotteries', error: err});
            }
            return;
        }


        if(data){
            var cur_data = JSON.parse(data);
            var ongoing_lotteries = cur_data.lottery_list;
            var expired_lotteries = cur_data.expired_lottery_list;
            var keys = Object.keys(ongoing_lotteries);

            for(var i = 0; i < keys.length; i++){
                var cur_key = keys[i];
                expired_lotteries[cur_key] = JSON.parse(JSON.stringify(ongoing_lotteries[cur_key]));
                cur_data.current_lottery = false;
                expired_lotteries[cur_key].ended_at = moment().format('DD/MM/YYYY - HH:mm:ss');
                delete ongoing_lotteries[cur_key];
            }


            fs.writeFile('./data/lottery.json', JSON.stringify(cur_data), { flag: "w" }, err0 => {
                if (err0) {
                console.error(err0);
                if(res){
                    res.status(400).send({msg:'There was an error while removing previous lotteries', error: err0});
                }
                return;
                }
                // file written successfully
                if(res){
                    console.log("file overwritten successfully");
                    res.status(200).json(cur_data);
                }
                callback();
            });
        }else{
            callback();
        }
    });
}