const Food = (sequelize, DataType) =>
    sequelize.define('orders', {
        name: {
            type: DataType.STRING,
            allowNull: false,
        },
        type: {
            type: DataType.INTEGER,
            allowNull: false,
        }
    });

module.exports = Food;