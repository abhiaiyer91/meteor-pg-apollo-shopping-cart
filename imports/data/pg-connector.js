import Sequelize from 'sequelize';
import casual from 'casual';
import Random from 'meteor/meteor';

export const db = new Sequelize('shoppingdb', 'abhiaiyer', null, {
  host: 'localhost',
  dialect: 'postgres'
});

const ProductModel = db.define('products', {
  title: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING},
  price: {type: Sequelize.STRING},
  createdAt: {type: Sequelize.DATE}
});

const CartModel = db.define('carts', {
  items: {type: Sequelize.ARRAY(Sequelize.STRING)},
  quantity: {type: Sequelize.STRING}
});

// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({force: true}).then(() => {
  _.times(10, () => {
    return ProductModel.create({
      title: casual.catch_phrase,
      description: casual.short_description,
      price: "20",
      createdAt: new Date()
    });
  });
});

const Products = db.models.products;
const Cart = db.models.carts;

export { Cart, CartModel, Products };
