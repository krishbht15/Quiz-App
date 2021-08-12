import {DataTypes} from 'sequelize';

module.exports = (sequelize) => {
    return sequelize.define("quizzes", {
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
            description: {
                type: DataTypes.STRING
            },
            numberOfQuestions: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            totalMarks: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            marksPerQuestion: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            }
        }, {
            underscored: true,
        }
    );
}
