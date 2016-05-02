import { Cart, CartModel, Products } from '/imports/data/pg-connector';
const _ = require('underscore');

const resolvers = {
  Query: {
    async cart(root, args) {
      return CartModel.findAll({});
    },
    async products(root, args) {
      return Products.findAll({});
    }
  },
  Mutation: {
    async addToCart(_, { productId}) {
      return Cart.findOrCreate({
          defaults: {
            items: [],
            quantity: "0"
          },
          where: {
            id: "1"
          }
        }
      ).then((data) => {
        const dataValueItem = data && data[0];
        const previous = dataValueItem && dataValueItem._previousDataValues && dataValueItem._previousDataValues;
        const items = previous && previous.items || [];
        const quantity = previous && previous.quantity || 0;
        if (previous) {
          return CartModel.update({
            items: [productId, ...items],
            quantity: parseInt(quantity, 10) + 1
          }, {where: {id: "1"}});
        }
      });
    }
  },
  Product: {
    async cart() {
      return Cart.findAll({});
    }
  },
  Cart: {
    async products(data) {
      const dataValues = data && data.dataValues;
      const items = dataValues && dataValues.items || [];
      if (items.length) {
        return Products.findAll({where: {id: {$in: items}}});
      }
    },
    async productQuantity(data) {
      const dataValues = data && data.dataValues;
      const items = dataValues && dataValues.items || [];
      const quantities = [];
      const countItems = _.countBy(items);
      _.each(countItems, (value, key) => {
        return quantities.push({
          id: key,
          quantity: value
        });
      });
      return quantities;
    }
  }
};

export default resolvers;
