import Sequelize from 'sequelize';

class Record extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
          {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
          },
          {
            modelName: 'Record',
            sequelize,
          },
        );
    }

    static associate(models) {
        this.hasMany(models.Story, { foreignKey: 'record_id' });
        this.belongsTo(models.Claim, { foreignKey: 'record_id' });
    }
}

export default Record;
