export default class QuizDto {
    private _name: string;
    private _description: string;
    private _numberOfQuestions: number;
    private _totalMarks: number;
    private _marksPerQuestion: number;
    private _teacherId: string;

    get teacherId(): string {
        return this._teacherId;
    }

    set teacherId(value: string) {
        this._teacherId = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get class(): string {
        return this._class;
    }

    set class(value: string) {
        this._class = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get numberOfQuestions(): number {
        return this._numberOfQuestions;
    }

    set numberOfQuestions(value: number) {
        this._numberOfQuestions = value;
    }

    get totalMarks(): number {
        return this._totalMarks;
    }

    set totalMarks(value: number) {
        this._totalMarks = value;
    }

    get marksPerQuestion(): number {
        return this._marksPerQuestion;
    }

    set marksPerQuestion(value: number) {
        this._marksPerQuestion = value;
    }
}