import React from 'react'

import {makeObservable, observable, computed, action } from 'mobx';
import { Observer, observer } from 'mobx-react';
import { Button, Text, View } from 'react-native';

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

  incrementPrice (number=0) {
    this.price += 1 + number
  };

  get total() {
    console.log('Computing...');
    return this.price * this.amount;
  }
}

const order = new OrderLine(0);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => console.log(this.props);
  render = () => {
    return (
      <Observer>
        {() => (
          <View>
            <Text>{order.price}</Text>
            <Button
              title="Button"
              onPress={() => {
                order.incrementPrice(60);
              }}
            />
          </View>
        )}
      </Observer>
    );
  };
}

// export default observer(
//   class App extends React.Component {
//     constructor(props) {
//       super(props);
//     }
//     componentDidMount = () => console.log(this.props);
//     render = () => {
//       return (
//         <Observer>
//           {() => (
//             <View>
//               <Text>{order.price}</Text>
//               <Button
//                 title="Button"
//                 onPress={() => {
//                   order.incrementPrice(60);
//                 }}
//               />
//             </View>
//           )}
//         </Observer>
//       );
//     };
//   },
// );