import { Cart, Products } from '/imports/data/pg-connector';

const resolvers = {
  Query: {
    cart(root, args) {
      return Cart.findAll({});
    },
    products(root, args) {
      return Products.findAll({});
    }
  },
  Cart: {
    products(cart){
      const cartItems = cart.items;
      return Products.findAll({where: {$in: cartItems}});
    }
  }
};

export default resolvers;
