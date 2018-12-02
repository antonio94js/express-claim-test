import Sequelize from 'sequelize';
import uuidv4 from 'uuid/v4';

class User extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
          {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: uuidv4(),
            },
            fligth_code: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlphanumeric: true,
                    len: 8,   
                },
            },
            ticket_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
            },
            claimer: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            attendant: {
                type: DataTypes.INTEGER,
            },
            status: {
                type: Sequelize.ENUM,
                values: ['pending', 'wip', 'resolved'],
                allowNull: false,
                defaultValue: 'pending',
            },
            record_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
          },
          {
            modelName: 'Claim',
            sequelize,
          },
        );
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'claimer' });
        this.belongsTo(models.User, { foreignKey: 'attendant' });
    }
    static create(data) {
        console.log("aqui toy perrritoooo");
        return super.create(data)
    }
}

export default User;
