import {v4 as uuidv4} from 'uuid';
import optionRepository from "../repository/OptionRepository";
import OptionDto from "../dto/OptionDto";

class OptionService {
    private static singleton: OptionService;

    private constructor() {
    }

    async createOption(question: any, answerIndex: number, optionDtos: Array<OptionDto>) {
        for (let i = 0; i < optionDtos.length; i++) {
            optionDtos[i].questionId = question.id;
            const option = await optionRepository.createOption(optionDtos[i]);
            if (i == answerIndex) await question.setAnswer(option);
        }
    }

    async getOption(id:uuidv4){
        return optionRepository.getOptionById(id);
    }

    public static get Instance() {
        return this.singleton || (this.singleton = new OptionService());
    }
}

export default OptionService.Instance;
