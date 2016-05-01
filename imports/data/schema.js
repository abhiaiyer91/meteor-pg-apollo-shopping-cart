export default schema = [`
  type Product {
    title: String,
    description: String,
    price: String,
    createdAt: String
  }
  type Cart {
    items: [String],
    quantity: String
  }
  type Query {
    cart: Cart,
    products: [Product]
  }
  schema {
    query: Query
  }
`];
