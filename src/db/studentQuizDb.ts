import {DataTypes} from 'sequelize';

module.exports = (sequelize) => {
    return sequelize.define("student_quizzes", {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
            deletedAt: {
                type: DataTypes.DATE,
                defaultValue: null
            },
            result: {
                type: DataTypes.FLOAT,
                defaultValue: -1
            }
        }, {
            underscored: true
        }
    )
}