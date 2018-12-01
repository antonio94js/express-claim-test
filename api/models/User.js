import Sequelize from 'sequelize';

class User extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
          {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,   
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rol: {
                type: Sequelize.ENUM,
                values: ['admin', 'user'],
                allowNull: false,
            },
          },
          {
            modelName: 'User',
            sequelize,
          },
        );
    }

    static associate(models) {
        // this.belongsTo(models.OtherModel);
    }
}

export default User;