const fs = require('fs');
const moment = require('moment');

const generateTickets = async () => {

    let rawdata = await fs.readFileSync('./data/users.json');
    let user_data = JSON.parse(rawdata);
    let user_list = user_data.users_list;

    var lotteryTickets = [];
    // generate tickets
    for(var i = 0; i < user_list.length; i++){
        var random_user_num = randomInteger(0, user_list.length-1)
        var newTicket = {
            id: randomID(8,'aA0'),
            numbers: generateTicketNum(),
            created_at: moment().format('DD/MM/YYYY - HH:mm:ss'),
            purchased_by: user_list[random_user_num]
        };
        lotteryTickets.push(newTicket);
    }
    return lotteryTickets;
}

const resetLottery = () => {

}

generateTicketNum = () => {
    var numArr = [];

    for(var i = 0 ; i < 6; i++){
        var add = true;
        var randomNumber = Math.floor(Math.random() * 50) + 1;
		for(var j = 0; j < 50; j++) {
			if(numArr[j] == randomNumber) {
				add = false;
			}
		}
		if(add) {
			numArr.push(randomNumber);
		} else {
			i--;
		}
	}
  
	var highestNumber = 0;
	for(var i = 0; i < numArr.length; i++) {

		for(var j = i + 1; j < numArr.length; j++) {
			if(numArr[j] < numArr[i]) {
				highestNumber = numArr[i];
				numArr[i] = numArr[j];
				numArr[j] = highestNumber;
			}
		}
	}
    return numArr.join(" - ");
}

function randomID(num){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < num; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    randomInteger, 
    randomID, 
    generateTickets
}