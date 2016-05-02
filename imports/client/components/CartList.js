import React from 'react';
import { connect } from 'react-apollo';

function findQuantityForProduct(productQuantity, itemId) {
  return _.find(productQuantity, (item) => {
    return itemId === item.id;
  }).quantity;
}

class CartList extends React.Component {
  componentWillMount() {
    this.props.cartData.refetch();
  }
  render() {
    const { cartData } = this.props;
    const cart = _.first(cartData && cartData.cart);
    const products = cart && cart.products || [];
    const productQuantity = cart && cart.productQuantity;
    const totalPrice = _.map(products, (item) => {
      const quantity = findQuantityForProduct(productQuantity, item.id);
      return item && item.price * quantity;
    });
    if (cartData && cartData.loading) {
      return (
        <div>Loading</div>
      );
    }
    return (
      <div>
        <ul className="cd-cart-items">
          {_.map(products, ({ id, title, price, description }) => {
            const quantity = findQuantityForProduct(productQuantity, id);
            return (
              <li>
                <span className="cd-qty">{quantity}x</span> {title}
                <p>{description}</p>
                <div className="cd-price">${price}.00</div>
                <a href="#0" className="cd-item-remove cd-img-replace">Remove</a>
              </li>
            );
          })}
        </ul>

        <div className="cd-cart-total">
          <p>Total <span>${totalPrice && totalPrice.reduce((previousValue, currentValue) => {
            return parseInt(previousValue, 10) + parseInt(currentValue, 10);
          }, 0)}</span></p>
        </div>
      </div>
    );
  }
}

function mapQueriesToProps() {
  return {
    cartData: {
      query: `
          {
            cart {
             products {
                id
                title
                description
                price
             }
             quantity
             productQuantity {
                id
                quantity
             }
            }
          }
        `,
      forceFetch: true
    }
  };
}

export default connect({mapQueriesToProps})(CartList)
