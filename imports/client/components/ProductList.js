import React from 'react';
import { connect } from 'react-apollo';
import ProductItem from '/imports/client/components/ProductItem';


function mapQueriesToProps() {
  return {
    productData: {
      query: gql`
          {
            products {
              id
              title
              description
              price
              cart {
                id
              }
            }
          }
        `,
      forceFetch: true
    }
  };
}

function ProductList({ productData }) {
  const products = productData && productData.products;
  const cartId = productData && productData.cart && productData.cart.id;
  return (
    <ul className="cd-items cd-container">
      { _.map(products, (product, index) => {
        return (
          <ProductItem cartId={cartId} index={index} key={index} {...product}/>
        );
      })}
    </ul>
  );
}

export default connect({mapQueriesToProps})(ProductList);
