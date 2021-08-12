import {Sequelize} from "sequelize";
import {env} from "./EnvironmentConfig";

class Index {
    public readonly _sequelize: Sequelize;
    private static singleton: Index;

    private constructor() {
        const {DB_NAME, DB_USER_NAME, DB_PASSWORD, HOST} = env();
        this._sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, {
            host: HOST,
            dialect: 'mysql'
        });
        const db = {
            "question": require("../db/question")(this._sequelize),
            "option": require("../db/optionDb")(this._sequelize),
            "quiz": require("../db/quizDb")(this._sequelize),
            "teacher": require("../db/teacherDb")(this._sequelize),
            "student": require("../db/studentDb")(this._sequelize),
            "student_quiz": require("../db/studentQuizDb")(this._sequelize),
            "answer_question": require("../db/answerQuestionDb")(this._sequelize),
        };
        this.addMappings(db);
        this.sync();
    }

    public async sync() {
        await this.sequelize.sync();
    }

    get sequelize(): Sequelize {
        return this._sequelize;
    }

    public addMappings(db: any) {
        db.question.belongsTo(db.option, {
            as: "answer", foreignKey: "answerId", constraints: false
        });
        db.quiz.hasMany(db.question, {as: "question"});
        db.question.hasMany(db.option, {as: "option"});

        db.quiz.belongsTo(db.teacher, {
            as: "teacher", foreignKey: "teacherId", constraints: false
        });
        db.quiz.belongsToMany(db.student, {
            through: "student_quizzes",
            as: "student",
            foreignKey: "quiz_id"
        });
        db.student.belongsToMany(db.quiz, {
            through: "student_quizzes",
            as: "quiz",
            foreignKey: "student_id"
        });

    }

    public static get Instance() {
        return this.singleton || (this.singleton = new Index());
    }
}

const index = Index.Instance;
export default index;
