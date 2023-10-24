import { Model, QueryInterface, DataTypes } from 'sequelize';
import IBill from '../../Interfaces/IBill';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IBill>>('bills', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      value: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        }
      },
    })
  },
  
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('bills');
  },
}