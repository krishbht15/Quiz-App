import TeacherDto from "../dto/TeacherDto";
import db from "../startup/Index";
import {v4 as uuidv4} from 'uuid';

class TeacherRepository {
    private static singleton: TeacherRepository;

    private constructor() {
    }


    createTeacher(teacher: TeacherDto): Promise<any> {
        return db.sequelize.models.teachers.create(teacher)
    }

    getTeacherById(id: uuidv4): Promise<any> {
        return db.sequelize.models.teachers.findOne({
            where: {
                id,
                deletedAt: null
            }
        })
    }

    getTeachers(): Promise<Array<any>> {
        return db.sequelize.models.teachers.findAll({
            where: {
                 deletedAt: null
            }
        })
    }

    public static get Instance() {
        return this.singleton || (this.singleton = new TeacherRepository());
    }
}

export default TeacherRepository.Instance;
