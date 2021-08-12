import {IResolvers} from 'graphql-tools';
import studentService from "../service/StudentService"

const teacherController: IResolvers = {
    Mutation: {
        createStudent: (_, {student}) => {
            return studentService.createStudent(student);
        }
    },
    Query: {
        getStudents: (_, {studentId}) => {
            return studentService.getStudents(studentId);

        }
    }
}
export default teacherController;
