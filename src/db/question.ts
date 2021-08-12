import {DataTypes} from 'sequelize';
module.exports = (sequelize) => {
    return sequelize.define("questions", {
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
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },{
            underscored: true,
        }
    );
}
