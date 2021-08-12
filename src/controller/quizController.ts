import {IResolvers} from 'graphql-tools';
import quizService from "../service/QuizService"

const quizId: IResolvers = {
    Mutation: {
        createQuiz: (_, {quiz}) => {
            return quizService.createQuiz(quiz);
        },
        doQuiz: (_, {studentId, quizId}) => {
            return quizService.doQuiz(studentId, quizId);
        },
        answerQuestion: (_, {studentQuizId, answerId, questionId}) => {
            return quizService.answerQuestion(studentQuizId, answerId, questionId);
        },
        getResult: (_, {studentQuizId}) => {
            return quizService.getResult(studentQuizId);
        }
    },
    Query: {
        getQuizzes: (_, {quizId}) => {
            return quizService.getQuizzes(quizId);
        }
    }
}
export default quizId;
