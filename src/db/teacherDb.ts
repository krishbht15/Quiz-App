import {DataTypes} from 'sequelize';

module.exports = (sequelize) => {
    return sequelize.define("teachers", {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            deletedAt: {
                type: DataTypes.DATE,
                defaultValue: null
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            subject: {
                type: DataTypes.STRING
            }
        }, {
            underscored: true,
        }
    );
}
