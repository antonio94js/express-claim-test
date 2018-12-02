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
        this.hasOne(models.Record, { as: 'record', foreignKey: 'record_id' });
    }
    static async create(data) {
        const record = await Record.create({});
        console.log(record);
        const id = uuidv4();
        const claim = await super.create({ ...data, id, record_id: record.id });
        return claim;
    }
    static async assignToAttendant(claimId, attendantId) {
        const claim = await this.findOne({ where: { id: claimId } });
        if (claim.attendant) {
            throw new ClaimError('AlreadyTakenClaim', `The claim with the id ${claimId} has been taken`);
        } 
        await this.update({
            attendant: attendantId,
            status: 'wip',
        }, {
            where: {
                id: claimId,
            },
        });
        return true;
    }
    static async close(claimId) {
        const res = await this.update({
            status: 'resolved',
        }, {
            where: {
                id: claimId,
            },
        });
        return res;
    }
}

export default User;
