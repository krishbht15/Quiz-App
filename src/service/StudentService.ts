import TeacherDto from "../dto/TeacherDto";
import {GenericResponseMessage} from "../dto/GenericResponseMessage";
import studentRepository from "../repository/StudentRepository";
import {v4 as uuidv4} from 'uuid';
import {Messages} from "../common/Messages";
import StudentDto from "../dto/StudentDto";

class StudentService {
    private static singleton: StudentService;

    private constructor() {
    }

    async createStudent(student: StudentDto): Promise<GenericResponseMessage> {
        const teacherEntry = await studentRepository.createStudent(student);
        if (teacherEntry) return new GenericResponseMessage(true, Messages.STUDENT_CREATED, teacherEntry.id)
        return new GenericResponseMessage(false, Messages.SOMETHING_WENT_WRONG, "")
    }

    async getStudents(id: uuidv4): Promise<Array<TeacherDto>> {
        if (id) return [await studentRepository.getStudentById(id)];
        return studentRepository.getStudents();
    }

    getStudent(id: uuidv4) {
        return studentRepository.getStudentById(id);
    }

    public static get Instance() {
        return this.singleton || (this.singleton = new StudentService());
    }
}

export default StudentService.Instance;
