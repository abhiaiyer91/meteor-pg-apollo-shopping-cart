import React from 'react';
import { connect } from 'react-apollo';
import dispatchCartMutation from '/imports/client/actions/cartMutation';
/**
 * create a mutation object
 * @param productId
 * @param cartId
 * @returns {{mutation: *, variables: {id: *}}}
 */
function generateMutationObject(productId, cartId) {
  return {
    mutation: gql`
    mutation addProductToCart($productId: String, $cartId: String) {
     addToCart(productId: $productId, cartId: $cartId) {
      items
     }
    }`,
    variables: {
      productId,
      cartId
    }
  };
}

function ProductItem({ id, cartId, mutations }) {
  const images = ['item-1', 'item-2', 'item-3'];
  const image = images[Math.floor(Math.random() * images.length)];
  const addToCart = mutations.addToCart;
  return (
    <li className="cd-item">
      <img src={`/assets/images/${image}.jpg`} alt="Item Preview"/>
      <div className="cd-trigger">
        <p style={{margin: "0px"}}>
          <a href="#0" className="subtitle" onClick={function () {
            return dispatchCartMutation(id, addToCart);
          }}>
            Add To Cart
          </a>
        </p>

      </div>
    </li>
  );
}

function mapMutationsToProps() {
  return {
    addToCart: generateMutationObject
  };
}

export default connect({mapMutationsToProps})(ProductItem);
