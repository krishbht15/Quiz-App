import {DataTypes} from 'sequelize';

module.exports = (sequelize) => {
    return sequelize.define("answer_questions", {
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
            questionId: {
                allowNull: false,
                type: DataTypes.UUID,
            },
            studentQuizId: {
                allowNull: false,
                type: DataTypes.UUID,
            },
            answerId: {
                allowNull: false,
                type: DataTypes.UUID,
            }
        }, {
            underscored: true
        }
    )
}
