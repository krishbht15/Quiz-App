import TeacherDto from "../dto/TeacherDto";
import {GenericResponseMessage} from "../dto/GenericResponseMessage";
import teacherRepository from "../repository/TeacherRepository";
import {v4 as uuidv4} from 'uuid';
import {Messages} from "../common/Messages";

class TeacherService {
    private static singleton: TeacherService;

    private constructor() {
    }

    async createTeacher(teacher: TeacherDto): Promise<GenericResponseMessage> {
        const teacherEntry = await teacherRepository.createTeacher(teacher);
        if (teacherEntry) return new GenericResponseMessage(true, Messages.TEACHER_CREATED, teacherEntry.id)
    }

    async getTeachers(id: uuidv4): Promise<Array<TeacherDto>> {
        if (id) return [await teacherRepository.getTeacherById(id)];
        return teacherRepository.getTeachers();
    }

    public static get Instance() {
        return this.singleton || (this.singleton = new TeacherService());
    }
}

export default TeacherService.Instance;
