import db from "../startup/Index";
import OptionDto from "../dto/OptionDto";
import {v4 as uuidv4} from 'uuid';

class OptionRepository {

    private static singleton: OptionRepository;

    private constructor() {
    }

    createOption(data: OptionDto): Promise<any> {
        return db.sequelize.models.options.create(data);
    }

    getOptionById(id: uuidv4): Promise<any> {
        return db.sequelize.models.options.findOne({
            where: {
                id,
                deletedAt: null
            }
        })
    }

    getOptions(questionId: uuidv4): Promise<any> {
        return db.sequelize.models.options.findAll({
            where: {
                questionId,
                deletedAt: null
            }
        })
    }

    public static get Instance() {
        return this.singleton || (this.singleton = new OptionRepository());
    }
}

export default OptionRepository.Instance;
