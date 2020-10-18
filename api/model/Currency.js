const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrencySchema = new Schema ({
    Currency: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    Open: {
        type: String,
        required: true
    },
    High: {
        type: String,
        required: true
    },
    Low: {
        type: String,
        required: true
    },
    Close: {
        type: String,
        required: true
    },
    Volume: {
        type: String,
        required: true
    },
    MarketCap: {
        type: String,
        required: true
    }
});

module.exports = Currency = mongoose.model('Currency', CurrencySchema);