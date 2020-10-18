import React from 'react';
import PropTypes from "prop-types";
import { MDBDataTable } from 'mdbreact';
import withStyles from "@material-ui/core/styles/withStyles.js";

const HomeStyles = {
  textalignright: {
    textAlign: 'right',
  },
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       isLoading: false,
       data : [],
       datafromApi: []
    }
  }

  componentDidMount() {
        fetch("http://localhost:3300/currency")
            .then(res => res.json())
            .then(data => {
                let dataFromApi = data.currency.map(currency => {
                    return {
                        Currency: currency.Currency,
                        Date: currency.Date,
                        Open: currency.Open,
                        High: currency.High,
                        Low: currency.Low,
                        Close: currency.Close,
                        Volume: currency.Volume,
                        MarketCap: currency.MarketCap,
                        Price: currency.Price,
                        change24h: this.calculatePercentage(currency.allPrice, 1),
                        change7d: this.calculatePercentage(currency.allPrice, 7),
                        monthchange1: this.calculatePercentage(currency.allPrice, 30),
                    }
                })

                this.setState({
                    datafromApi: dataFromApi
                });
                
                var dataTable = {
                columns: [
                  {
                    label: 'Currency',
                    field: 'Currency',
                    sort: 'asc',
                    width: 150
                  },
                  {
                    label: 'Price',
                    field: 'Close',
                    sort: 'asc',
                    width: 100
                  },
                  {
                    label: '24h change difference',
                    field: 'change24h',
                    sort: 'asc',
                    width: 100
                  },
                  {
                    label: '7d change difference',
                    field: 'change7d',
                    sort: 'asc',
                    width: 100
                  },
                  {
                    label: '1month change difference',
                    field: 'monthchange1',
                    sort: 'asc',
                    width: 100
                  },
                  {
                    label: '24h Volume',
                    field: 'Volume',
                    sort: 'asc',
                    width: 200
                  },
                  {
                    label: 'Market Cap',
                    field: 'MarketCap',
                    sort: 'desc',
                    width: 200
                  }
                ],
                
            rows: [...this.state.datafromApi.map((currency, i) => (
                        {
                            id: i,
                            Currency: currency.Currency,
                            Date: currency.Date,
                            Open: currency.Open,
                            High: currency.High,
                            Low: currency.Low,
                            Close: currency.Close,
                            Volume: currency.Volume,
                            MarketCap: currency.MarketCap,
                            change24h: currency.change24h,
                            change7d: currency.change7d,
                            monthchange1: currency.monthchange1
                        }
                    ))]

                }
                
                this.setState({
                    data: dataTable,
                    isLoading: true
                });

            })
            .catch(error => {
                console.log(error);
            });
  }
  
  calculatePercentage(value, duration){
      var firstValue = parseFloat(value[0]);
      var lastValue  = parseFloat(value[duration]);
      var changes = ((firstValue - lastValue) / ( (firstValue+lastValue)/2 ) ) * 100;
      
      //console.log(firstValue+"<>"+lastValue+"<>"+changes)
      return changes.toFixed(4) + "%";
  };
  
  render() {
    const isLoading = this.state.isLoading;
    if (!isLoading) {
      return null;
    }

    return (
       <MDBDataTable 
          bordered 
          hover 
          data={this.state.data} 
          order={['MarketCap', 'desc']}/>
    );
  }
}
 
Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(HomeStyles)(Home);


