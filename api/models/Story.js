import Sequelize from 'sequelize';

class Story extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
          {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            record_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            question: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            answer: {
                type: DataTypes.STRING,
            },
          },
          {
            modelName: 'Story',
            sequelize,
          },
        );
    }

    static associate(models) {
        this.belongsTo(models.Record, { foreignKey: 'record_id' });
    }
    // static create(data) {
    //     return super.create(data)
    // }
}

export default Story;
