import {IResolvers} from 'graphql-tools';
import teacherService from "../service/TeacherService"

const teacherController: IResolvers = {
    Mutation: {
        createTeacher: (_, {teacher}) => {
            return teacherService.createTeacher(teacher);
        }
    },
    Query: {
        getTeachers: (_, {teacherId}) => {
            return teacherService.getTeachers(teacherId);

        }
    }
}
export default teacherController;
