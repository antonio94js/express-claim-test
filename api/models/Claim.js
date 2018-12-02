import Sequelize from 'sequelize';
import uuidv4 from 'uuid/v4';
import R from 'ramda';

class Claim extends Sequelize.Model {
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
            claimer_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            attendant_id: {
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
        this.belongsTo(models.User, { foreignKey: 'claimer_id', as: 'claimer'  });
        this.belongsTo(models.User, { foreignKey: 'attendant_id', as: 'attendant' });
        this.hasOne(models.Record, { as: 'record', foreignKey: 'claim_id' });
    }
    
    static async create(data) {
        const id = uuidv4();
        const record = await Record.create({ claim_id: id });
        const claim = await super.create({ ...data, id, record_id: record.id });
        return claim;
    }
    static async getAll(rawQuery = {}) {
        const validFiels = R.pick(['fligth_code', 'ticket_number', 'claimer_id', 'attendant_id', 'status']);
        const query = validFiels(rawQuery);
        const res = await this.findAll({
            where: {
                ...query,
            },
        });
        return res;
    }
    static async assignToAttendant(claimId, attendantId) {
        const claim = await this.findOne({ where: { id: claimId } });
        if (claim.attendant_id) {
            throw new ClaimError('AlreadyTakenClaim', `The claim with the id ${claimId} has been taken`);
        } 
        await this.update({
            attendant_id: attendantId,
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
    static async giveMeMy(userId) {
        console.log(userId);
        const res = await this.findAll({
            where: {
                $or: [
                    { claimer_id: userId },
                    { attendant_id: userId },
                ],
            },
        });
        return res;
    }

    static async getByIdAndUser(claimId, userId) {
        const claim = await this.findOne({
            include: [
                { model: User, as: 'claimer', attributes: ['name', 'email'] },
                { model: User, as: 'attendant', attributes: ['name', 'email'] },
            ],
            where: {
                id: claimId,
                $or: [
                    { claimer_id: userId },
                    { attendant_id: userId },
                ],
            },
        });
        if (!claim) {
            throw new ClaimError('ClaimNotFound', `You don't have a claim with the Id ${claimId}`)
        }
        return claim;
    }
    static async getById(claimId) {
        const claim = await this.findById(claimId);
        if (!claim) {
            throw new ClaimError('ClaimNotFound', `You don't have a claim with the Id ${claimId}`)
        }
        return claim;
    }
    static async remove(claimId) {
        await this.destroy({
            where: {
              id: claimId,
            },
        });
        return true;
    }
}

export default Claim;
