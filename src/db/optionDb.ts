import {DataTypes} from 'sequelize';

module.exports = (sequelize) => {
    return sequelize.define("options", {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull:false,
                defaultValue:DataTypes.NOW
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull:false,
                defaultValue:DataTypes.NOW
            },
            deletedAt: {
                type: DataTypes.DATE,
                defaultValue: null
            },
            title: {
                type: DataTypes.STRING,
            },
        },{
        underscored: true,
        }
    );
}


