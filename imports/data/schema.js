export default schema = [`
  type Mutation {
    addToCart(productId: String, cartId: String): Cart
  }
  type Product {
    id: String,
    title: String,
    description: String,
    price: String,
    createdAt: String
    cart: [Cart]
  }

  type Quantity {
    id: String
    quantity: String
  }
  type Cart {
    id: String,
    items: [String],
    products: [Product],
    quantity: String,
    productQuantity: [Quantity]
  }
  type Query {
    cart: [Cart],
    products: [Product]
  }
  schema {
    query: Query,
    mutation: Mutation
  }
`];
