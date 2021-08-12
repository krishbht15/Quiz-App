import {v4 as uuidv4} from 'uuid';

export default class OptionDto {

    private _id: uuidv4;
    private _title: String;
    private _questionId: uuidv4;

    get id(): uuidv4 {
        return this._id;
    }

    set id(value: uuidv4) {
        this._id = value;
    }

    get title(): String {
        return this._title;
    }

    set title(value: String) {
        this._title = value;
    }

    get questionId(): uuidv4 {
        return this._questionId;
    }

    set questionId(value: uuidv4) {
        this._questionId = value;
    }
}