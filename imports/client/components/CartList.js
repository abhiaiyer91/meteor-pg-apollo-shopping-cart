import React from 'react';
import { connect } from 'react-apollo';
import dispatchCartMutation from '/imports/client/actions/cartMutation';
function findQuantityForProduct(productQuantity, itemId) {
  return _.find(productQuantity, (item) => {
    return itemId === item.id;
  }).quantity;
}

/**
 * create a mutation object
 * @param productId
 * @param cartId
 * @returns {{mutation: *, variables: {id: *}}}
 */
function generateMutationObject(productId) {
  return {
    mutation: `
    mutation removeProductFromCart($productId: String) {
     removeFromCart(productId: $productId) {
      items
     }
    }`,
    variables: {
      productId
    }
  };
}

class CartList extends React.Component {
  componentWillMount() {
    this.props.cartData.refetch();
  }

  render() {
    const { cartData, mutations } = this.props;
    const cart = _.first(cartData && cartData.cart);
    const products = cart && cart.products || [];
    const productQuantity = cart && cart.productQuantity;
    const totalPrice = _.map(products, (item) => {
      const quantity = findQuantityForProduct(productQuantity, item.id);
      return item && item.price * quantity;
    });
    const removeFromCart = mutations.removeFromCart;
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
                <a href="#0"
                   onClick={function () {
                return dispatchCartMutation(id, removeFromCart, cartData && cartData.refetch);
                }}
                   className="cd-item-remove cd-img-replace">Remove</a>
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

function mapMutationsToProps() {
  return {
    removeFromCart: generateMutationObject
  };
}

export default connect({mapQueriesToProps, mapMutationsToProps})(CartList)
