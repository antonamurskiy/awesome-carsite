import React from 'react';
import ReactDOM from 'react-dom';

var Header = React.createClass({
    render: function() {
      return <div className='header'>
               <h2>Available cars</h2>
               <p>You can adjust the purchase price and/or trade-in value of your loan. The cars for which you qualify will update accordingly.</p>
             </div>
    }
});

var SearchCars = React.createClass({
    getInitialState: function(){
        return { purchasePrice: 40000, tradeInPrice: '0', tradeInPercentage: '0' };
    },

    purchasePriceChange: function(e){
      if(e) {      
        this.setState({purchasePrice:Math.floor(e.target.value)},this.tradeInChange());
      } else {
        this.setState({purchasePrice:0},this.tradeInChange());
      }
    },

    tradeInChange: function(e){
      if(e) {
        this.setState({tradeInPrice:e.target.value});
      } else {
        this.setState({tradeInPrice:Math.floor(((this.state.tradeInPercentage / 100) * this.state.purchasePrice))});
      }
    },

    tradeInPercentageChange: function(e){
      this.setState({tradeInPercentage:e.target.value},this.tradeInChange());
    },

    render: function() {
        var cars = this.props.items,
            purchasePrice = this.state.purchasePrice;
            var tradeInPrice = this.state.tradeInPrice;

        cars = cars.filter(function(car){
            if(car.price <= (purchasePrice+tradeInPrice)) {
              return car;
            }

        });

        return <div>
                <Header />
                <div className='filters col-lg-3 col-md-4 col-sm-5'>
                  <form className='filter-form'>
                    <label>Purchase price</label>
                    <div className='form-wrap'>
                      <span className="purchase-price">$<input type="number" name="currency" value={this.state.purchasePrice} onChange={this.purchasePriceChange}/></span>
                    </div>
                    <input type="range" name="points" min="0" max="100000" onChange={this.purchasePriceChange} value={this.state.purchasePrice} />
                    <div className="range-sub">
                      <div className="left">$0</div>
                      <div className="right">$100,000</div>
                    </div>
                    <label>Trade-in value</label>
                    <div className='form-wrap left'>
                      <span className="purchase-price">$<input type="number" name="currency" value={this.state.tradeInPrice} onChange={this.tradeInChange}/></span>
                    </div>
                    <div className='form-wrap right'>
                      <span className="purchase-price"><input type="number" name="currency" value={this.state.tradeInPercentage} onChange={this.tradeInPercentageChange} />%</span>
                    </div>
                    <input type="range" value={this.state.tradeInPercentage} name="points" min="0" max="100" onChange={this.tradeInPercentageChange} />
                    <div className="range-sub">
                      <div className="left">0%</div>
                      <div className="right">100%</div>
                    </div>
                  </form>
                </div>
                <ul className='cars col-lg-9 col-md-8 col-sm-7'> 
                    { cars.map(function(l){
                        return <li className='car col-lg-6 col-md-6 col-sm-6'>
                          <div className='car-box'>
                            <div className='header'>
                              <div className='name'>{l.name}</div> 
                              <div className='price'>${l.price.toLocaleString()}</div> 
                            </div>
                            <img className='image' src={l.img}/>
                          </div>
                        </li>
                    }) }
                </ul>

                </div>;

    }
});

                                                                                                                                                             
var cars = [

    { name: 'Red car', price: 30000, img: 'http://i.imgur.com/Hv8ScIh.png'},
    { name: 'Gray car', price: 70000, img: 'http://i.imgur.com/5qGQuM1.png'},
    { name: 'Black car', price: 80000, img: 'http://i.imgur.com/ZaCpRyp.png'},
    { name: 'Blue car', price: 60000, img: 'http://i.imgur.com/VG1WMSH.png'},
    { name: 'Green car car', price: 20000, img: 'http://i.imgur.com/cRhIFVG.png'},
    { name: 'Yellow car', price: 10000, img: 'http://i.imgur.com/5QZAAW2.png'}

];

ReactDOM.render(
    <SearchCars items={ cars } />,
    document.getElementById('app')
);