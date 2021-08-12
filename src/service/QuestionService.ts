import {v4 as uuidv4} from 'uuid';
import questionRepository from "../repository/QuestionRepository";
import quizService from "../service/QuizService";
import optionService from "../service/OptionService";
import QuestionDto from "../dto/QuestionDto";
import {GenericResponseMessage} from "../dto/GenericResponseMessage";
import {Messages} from "../common/Messages";
import {ApolloError} from "apollo-server-express";

class QuestionService {
    private static singleton: QuestionService;

    private constructor() {
    }

    async createQuestion(quizId: uuidv4, data: Array<QuestionDto>): Promise<Array<GenericResponseMessage>> {
        const quiz = await quizService.getQuiz(quizId);
        if (!quiz) return [new GenericResponseMessage(false, Messages.QUIZ_NOT_FOUND, "")];
        let result = [];
        for (let i = 0; i < data.length; i++) {
            const question = await questionRepository.createQuestion(data[i]);
            if (question) {
                await quiz.addQuestion(question);
                await optionService.createOption(question, data[i].answerIndex, data[i].option);
                await quiz.update({
                    numberOfQuestions: question.numberOfQuestions + 1,
                    totalMarks: question.totalMarks + question.marksPerQuestion
                })
                result.push(new GenericResponseMessage(true, Messages.QUESTION_CREATED, question.id));
            } else result.push(new GenericResponseMessage(false, Messages.SOMETHING_WENT_WRONG, ""));
        }
        return result;
    }

    async getQuestions(quizId: uuidv4, questionId: uuidv4): Promise<Array<QuestionDto>> {
        if (!questionId && !quizId) throw new ApolloError(Messages.SOMETHING_WENT_WRONG);
        if (questionId) return [await this.getQuestion(questionId)];
        const ans = await questionRepository.getQuestionsWithQuizId(quizId);
        return ans.question;
    }

    async getQuestion(id: uuidv4) {
        return await questionRepository.getQuestionById(id);
    }



    public static get Instance() {
        return this.singleton || (this.singleton = new QuestionService());
    }
}

export default QuestionService.Instance;
