import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    varieties: DataTypes.JSON,
    images: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
