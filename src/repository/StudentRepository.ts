import TeacherDto from "../dto/TeacherDto";
import db from "../startup/Index";
import {v4 as uuidv4} from 'uuid';
import StudentDto from "../dto/StudentDto";

class StudentRepository {
    private static singleton: StudentRepository;

    private constructor() {
    }

    createStudent(student: StudentDto): Promise<any> {
        return db.sequelize.models.students.create(student)
    }

    getStudentById(id: uuidv4): Promise<any> {
        return db.sequelize.models.students.findOne({
            where: {
                id,
                deletedAt: null
            }
        })
    }

    getStudents(): Promise<Array<any>> {
        return db.sequelize.models.students.findAll({
            where: {
                 deletedAt: null
            }
        })
    }

    public static get Instance() {
        return this.singleton || (this.singleton = new StudentRepository());
    }
}

export default StudentRepository.Instance;
