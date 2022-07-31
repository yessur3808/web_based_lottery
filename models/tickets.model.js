const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lotterySys = new Schema({
    id: { 
        type: String,
        required: true,
        trim: true,
    },
    name: { 
        type: String,
        required: true,
        trim: true,
    },
    draw_tickets: { 
        type: Array,
        required: true,
    },
    "winning_ticket": {},
    "winner": { 
        type: String,
        required: false,
        trim: true,
    },
    "created_at": { 
        type: Date,
        required: true,
        trim: true,
    },
    "ended_at": { 
        type: Date,
        required: false,
        trim: true,
    }
});


const ticketData = module.exports = mongoose.model('ticketData', lotterySys);

ticketData.get = function(callback, limit){
    ticketData.find(callback).limit(limit);
};

module.exports  = {
    ticketData: ticketData
};
