import {IResolvers} from 'graphql-tools';
import questionService from "../service/QuestionService"

const questionController: IResolvers = {
    Mutation: {
        createQuestions: (_, {quizId, questions}) => {
            return questionService.createQuestion(quizId, questions);
        }
    },
    Query: {
        getQuestions: (_, {quizId, questionId}) => {
            return questionService.getQuestions(quizId, questionId);
        }
    }

}
export default questionController;
