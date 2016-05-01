import Sequelize from 'sequelize';
import casual from 'casual';

export const db = new Sequelize('shopping', 'abhiaiyer', null, {
  host: 'localhost',
  dialect: 'postgres'
});

const ProductModel = db.define('product', {
  title: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING},
  price: {type: Sequelize.STRING},
  createdAt: {type: Sequelize.DATE}
});

const CartModel = db.define('cart', {
  items: {type: Sequelize.STRING},
  quantity: {type: Sequelize.STRING}
});

CartModel.hasMany(ProductModel);

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

const Products = db.models.product;
const Cart = db.models.cart;

export { Cart, Products };
