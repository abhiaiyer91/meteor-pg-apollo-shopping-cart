import React from 'react';
import { connect } from 'react-apollo';

function ProductItem() {
  const images = ['item-1', 'item-2', 'item-3'];
  const image = images[Math.floor(Math.random() * images.length)]
  return (
    <li className="cd-item">
      <img src={`/assets/images/${image}.jpg`} alt="Item Preview"/>
      <a href="#0" className="cd-trigger">Quick View</a>
    </li>
  );
}

function mapQueriesToProps() {
  return {
    productData: {
      query: `
          {
            products {
              title
              description
              price
            },
          }
        `,
      forceFetch: true
    }
  };
}

function ProductList({ productData }) {
  const products = productData && productData.products;
  return (
    <ul className="cd-items cd-container">
      { _.map(products, (product, index) => {
        return (
          <ProductItem index={index} key={index} {...product}/>
        );
      })}
    </ul>
  );
}

export default connect({mapQueriesToProps})(ProductList);
