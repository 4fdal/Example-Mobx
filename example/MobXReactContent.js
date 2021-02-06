import React, { createContext } from 'react'
import {makeObservable, observable, computed, action} from 'mobx';
import {Observer, observer} from 'mobx-react';
import { Button, Text, View } from 'react-native';

// step 1
class OrderLine {
  price = 0;
  amount = 1;

  constructor(price) {
    makeObservable(this, {
      incrementPrice: action,
      price: observable,
      amount: observable,
      total: computed,
    });
    this.price = price;
  }

  incrementPrice(number = 0) {
    this.price += 1 + number;
  }

  get total() {
    console.log('Computing...');
    return this.price * this.amount;
  }
}
const order = new OrderLine(0);

// step 2
const AppContext = createContext()

// step 4
class OrderCounter extends React.Component {
  constructor(props) {
    super(props);
  }
  render = () => (
    <AppContext.Consumer>{this._renderContext}</AppContext.Consumer>
  );
  _renderContext = (order) => (
    <Observer>{this._renderObserver(order)}</Observer>
  );
  _renderObserver = (order) => () => {
    return (
      <View>
        <Text>{order.price}</Text>
        <Button
          title="Button"
          onPress={() => {
            order.incrementPrice(1);
          }}
        />
      </View>
    );
  };
}

// step 3
export default class App extends React.Component{
    constructor(props) {
        super(props)
    }
    render = () => {
        return (
          <AppContext.Provider value={new OrderLine(0)}>
            <OrderCounter />
          </AppContext.Provider>
        );
    }
}