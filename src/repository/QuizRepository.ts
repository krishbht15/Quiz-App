import TeacherDto from "../dto/TeacherDto";
import db from "../startup/Index";
import {v4 as uuidv4} from 'uuid';
import QuizDto from "../dto/QuizDto";
import * as process from "process";

class QuizRepository {
    private static singleton: QuizRepository;

    private constructor() {
    }

    createQuiz(quiz: QuizDto): Promise<any> {
        return db.sequelize.models.quizzes.create(quiz)
    }

    getQuizById(id: uuidv4): Promise<any>{
        return db.sequelize.models.quizzes.findOne({
            where: {
                id,
                deletedAt: null
            }, include: [{
                as: 'question',
                model: db.sequelize.models.questions,
                where: {deletedAt: null},
                required: false

            }]
        })
    }

    getQuizzes(): Promise<Array<any>> {
        return db.sequelize.models.quizzes.findAll({
            where: {
                deletedAt: null
            }
        })
    }

    createStudentQuiz(): Promise<any> {
        return db.sequelize.models.student_quizzes.create();
    }

    answerQuestion(studentQuizId: uuidv4, questionId: uuidv4, answerId: uuidv4):Promise<any> {
        return db.sequelize.models.answer_questions.create({
            studentQuizId, questionId, answerId, deletedAt: null
        });
    }

    async getStudentQuiz(id: uuidv4):Promise<any> {
        return await db.sequelize.models.student_quizzes.findOne({
            where: {
                id,
                deletedAt: null
            }
        })
    }

    async getAnswerSubmission(id: uuidv4):Promise<Array<any>> {
        return await db.sequelize.models.answer_questions.findAll({
            where: {
                studentQuizId: id,
                deletedAt: null
            }
        })
    }

    public static get Instance() {
        return this.singleton || (this.singleton = new QuizRepository());
    }
}

export default QuizRepository.Instance;
