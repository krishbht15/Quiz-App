import {GenericResponseMessage} from "../dto/GenericResponseMessage";
import quizRepository from "../repository/QuizRepository";
import optionService from "../service/OptionService";
import studentService from "../service/StudentService";
import questionService from "../service/QuestionService";
import {ApolloError} from "apollo-server-express";

import {v4 as uuidv4} from 'uuid';
import {Messages} from "../common/Messages";
import QuizDto from "../dto/QuizDto";

class QuizService {
    private static singleton: QuizService;

    private constructor() {
    }

    async createQuiz(quiz: QuizDto): Promise<GenericResponseMessage> {
        const quizEntry = await quizRepository.createQuiz(quiz);
        if (quizEntry) return new GenericResponseMessage(true, Messages.QUIZ_CREATED, quizEntry.id)
        return new GenericResponseMessage(false, Messages.SOMETHING_WENT_WRONG, "")
    }

    async getQuizzes(id: uuidv4): Promise<Array<QuizDto>> {
        if (id) return [await this.getQuiz(id)];
        return quizRepository.getQuizzes();
    }

    async getQuiz(id: uuidv4) {
        return quizRepository.getQuizById(id);
    }

    async doQuiz(studentId: uuidv4, quizId: uuidv4) {
        const student = await studentService.getStudent(studentId);
        if (!student) throw new ApolloError(Messages.STUDENT_NOT_FOUND);
        const quiz = await this.getQuiz(quizId);
        if (!quiz) throw new ApolloError(Messages.QUIZ_NOT_FOUND);
        const studentQuiz = await student.addQuiz(quiz);
        if (typeof studentQuiz === "undefined") return new GenericResponseMessage(false, Messages.SOMETHING_WENT_WRONG, "");
        return new GenericResponseMessage(true, Messages.STUDENT_QUIZ_CREATE, studentQuiz[0].id);
    }

    async answerQuestion(studentQuizId: uuidv4, answerId: uuidv4, questionId: uuidv4) {
        const studentQuiz = await quizRepository.getStudentQuiz(studentQuizId);
        if (!studentQuiz) throw new ApolloError(Messages.SOMETHING_WENT_WRONG);
        const option = await optionService.getOption(answerId);
        if (!option) throw new ApolloError(Messages.SOMETHING_WENT_WRONG);
        const quiz = await quizRepository.getQuizById(studentQuiz.quiz_id);
        if (!quiz) throw new ApolloError(Messages.SOMETHING_WENT_WRONG);
        if (option.questionId !== questionId) throw new ApolloError(Messages.SOMETHING_WENT_WRONG);
        const question = await questionService.getQuestion(questionId)
        if (!question) throw new ApolloError(Messages.SOMETHING_WENT_WRONG);
        let questionSame = false;
        for (let i = 0; i < quiz.question.length; i++) {
            if (quiz.question[i].id === questionId) {
                questionSame = true;
                break;
            }
        }
        if (!questionSame) throw new ApolloError(Messages.SOMETHING_WENT_WRONG);
        const answerQuestion = await quizRepository.answerQuestion(studentQuizId, questionId, answerId)
        if (typeof answerQuestion === "undefined") return new GenericResponseMessage(false, Messages.SOMETHING_WENT_WRONG, "");
        return new GenericResponseMessage(true, Messages.ANSWER_SUBMITTED, answerQuestion.id);
    }

    async calculateScore(studentQuiz: any) {
        const listOfSubmission = await quizRepository.getAnswerSubmission(studentQuiz.id);
        let correctAns = 0;
        for (let i = 0; i < listOfSubmission.length; i++) {
            const currSub = listOfSubmission[i];
            const qId = currSub.questionId;
            const aId = currSub.answerId;
            const question = await questionService.getQuestion(qId);
            if (question.answer === aId) correctAns++;
        }
        const quiz = await this.getQuiz(studentQuiz.quiz_id);
        let res = correctAns * quiz.marksPerQuestion;
        await studentQuiz.update({
            result: res
        })
        return res;
    }

    async getResult(studentQuizId: uuidv4) {
        const studentQuiz = await quizRepository.getStudentQuiz(studentQuizId);
        if (!studentQuiz) throw new ApolloError(Messages.SOMETHING_WENT_WRONG);
        let ans;
        if (studentQuiz.result !== -1) ans = studentQuiz.result;
        else ans = await this.calculateScore(studentQuiz);
        return new GenericResponseMessage(true, Messages.RESULT_FOUND, ans)
    }

    public static get Instance() {
        return this.singleton || (this.singleton = new QuizService());
    }
}

export default QuizService.Instance;
