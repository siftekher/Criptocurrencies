const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();
const Currency = require('./model/Currency')

const mongoURI = 'mongodb://localhost:27017/utu';

mongoose.connect(
   mongoURI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
   }
).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/currency', async (req, res) => {
    try {

        var currencytmp = [];

          Currency.aggregate(
            [
              {
                  $sort : {Date: -1}
              },
              {
                  $group: {
                   _id : '$Currency',
                   Currency : { $first: '$Currency' },
                   Date : { $first: "$Date" },
                   Price: { $first: "$Close" },
                   Open : { $first: '$Open' },
                   High : { $first: '$High' },
                   Low : { $first: '$Low' },
                   Close : { $first: '$Close' },
                   allPrice : { $push: '$Close' },
                   Volume : { $first: '$Volume' },
                   MarketCap : { $first: '$MarketCap' },
                   allDate: { $push: "$Date" },
                   count : { $sum: 1 }
                  }
              }
                ],
                  function (err, records) {
                    records.forEach(function (currency, i) {
                      currencytmp.push({
                        id: i,
                        Currency: currency.Currency,
                        Date: currency.Date,
                        Open: currency.Open,
                        High: currency.High,
                        Low: currency.Low,
                        Close: currency.Close,
                        Volume: currency.Volume,
                        MarketCap: currency.MarketCap,
                        allDate: currency.allDate,
                        Price: currency.Price,
                        allPrice: currency.allPrice
                      });
                    });

                res.json({
                  currency: currencytmp
                });
        });


    } catch(err){
        res.json({message: err});
    }
})

app.listen(3300);