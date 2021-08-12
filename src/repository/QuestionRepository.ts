import db from "../startup/Index";
import QuestionDto from "../dto/QuestionDto";
import {v4 as uuidv4} from 'uuid';

class QuestionRepository {

    private static singleton: QuestionRepository;

    private constructor() {
    }

    getQuestionById(id: uuidv4): Promise<any> {
        return db.sequelize.models.questions.findOne({
            where: {
                id,
                deletedAt: null
            }
        })
    }

    getQuestionsWithQuizId(id: uuidv4): Promise<any> {
        return db.sequelize.models.quizzes.findOne({
            where: {
                id,
                deletedAt: null
            }, include: [{
                as: 'question',
                model: db.sequelize.models.questions,
                where: {deletedAt: null},
                include: [{
                    as: 'option',
                    model: db.sequelize.models.options,
                    where: {deletedAt: null},
                }]
            }]
        })
    }

    deleteQuestion(questionId: uuidv4): Promise<any> {
        return db.sequelize.models.questions.update(
            {deletedAt: new Date()},
            {
                where:
                    {
                        id: questionId,
                        deletedAt: null
                    }
            });
    }

    createQuestion(data: QuestionDto): Promise<any> {
        return db.sequelize.models.questions.create(data);
    }

    getQuestion(id: uuidv4): Promise<any> {
        return db.sequelize.models.questions.findOne({
            where: {
                id,
                deletedAt: null
            }
        })
    }

    updateQuestion(question: any, questionDto: QuestionDto): Promise<any> {
        return question.update({title: questionDto.title});
    }

    public static get Instance() {
        return this.singleton || (this.singleton = new QuestionRepository());
    }
}

export default QuestionRepository.Instance;
