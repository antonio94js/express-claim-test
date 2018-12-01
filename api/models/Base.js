import Sequelize from 'sequelize';

class Base extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
          {
            myField: DataTypes.STRING,
          },
          {
            modelName: 'Base',
            sequelize,
          },
        );
    }

    // static associate(models) {
    //     this.belongsTo(models.OtherModel);
    // }
}

export default Base;
