import OptionDto from "../../../option/model/dto/OptionDto";
import {v4 as uuidv4} from 'uuid';

export default class QuestionDto {
    private _id: uuidv4;
    private _title: string;
    private _quizId: uuidv4;
    private _answerIndex: number;

    get answerIndex(): number {
        return this._answerIndex;
    }

    set answerIndex(value: number) {
        this._answerIndex = value;
    }

    get quizId(): uuidv4 {
        return this._quizId;
    }

    set quizId(value: uuidv4) {
        this._quizId = value;
    }

    private _option: Array<OptionDto>;

    get option(): Array<OptionDto> {
        return this._option;
    }

    set option(value: Array<OptionDto>) {
        this._option = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get id(): uuidv4 {
        return this._id;
    }

    set id(value: uuidv4) {
        this._id = value;
    }
}
