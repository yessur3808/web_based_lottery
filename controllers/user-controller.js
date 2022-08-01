const fs = require('fs');
const moment = require('moment');
const { randomID } = require('../utils/utils.js');


exports.createUser = (req,res) => {

    if(req && req.body && req.body['name'] && req.body['username']){

        fs.readFile('./data/users.json', 'utf8', (err, data) => {
            if (err) {
                console.error("Error occurred: ",err);
                if(res){ res.status(400).send({msg:'There was an error', error: err}); }                
                return;
            }

            let user_name = req.body['name'],
            user_username = req.body['username'],
            user_login = (req.body['login_method'] ? req.body['login_method'] : "email"),
            user_created_date = moment().format("DD/MM/YYYY"),
            user_created_time = moment().format("HH:mm:ss"),
            user_id = req.body['username']+randomID(3,'aA0');

            let user_data = JSON.parse(data);
            let new_user_list =  [...user_data.users_list];

            let new_user_obj = {
                "id": user_id,
                "name":user_name,
                "username":user_username,
                "login_method": user_login,
                "user_level": 1,
                "created_at_date": user_created_date,
                "created_at_time": user_created_time
            };
            
            new_user_list.push(new_user_obj);

            user_data.users_list = new_user_list;

            fs.writeFile('./data/users.json', JSON.stringify(user_data), { flag: "w" }, err0 => {
                if (err0) {
                  console.error(err0);
                  res.status(400).send({msg:'There was an error when adding a new user', error: err0});
                  return;
                }
                // file written successfully
                res.status(200).json(user_data);
              });

        })
    }

    



};



